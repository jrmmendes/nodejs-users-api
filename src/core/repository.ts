import { inject, injectable, unmanaged } from "inversify";
import { Document, FilterQuery, Model, Mongoose, Schema, SchemaDefinition } from "mongoose";
import { Types } from "./types";

@injectable()
export class Repository<Entity, EntityDocument extends Document> {
  protected Model: Model<EntityDocument>;

  constructor(
    @inject(Types.DatabaseClient) private dbClient: Mongoose,
    @unmanaged() private name: string,
    @unmanaged() schemaDefinition: SchemaDefinition,
  ) {
    const schema = new Schema(schemaDefinition, {
      collection: this.name,
      versionKey: false,
      timestamps: true,
    });

    this.Model = this.dbClient.model<EntityDocument>(this.name, schema);
  }

  async findAll(): Promise<EntityDocument[]> {
    return this.Model.find();
  }

  async findById(id: string): Promise<EntityDocument | null> {
    return this.Model.findById(id);
  }
  async findOne(filter: FilterQuery<EntityDocument>): Promise<EntityDocument | null> {
    return this.Model.findOne(filter);
  }
  async exists(filter: FilterQuery<EntityDocument>): Promise<boolean> {
    return this.Model.exists(filter);
  }

  async create(properties: Entity): Promise<EntityDocument> {
    const instance = new this.Model(properties);
    return instance.save();
  }

  async save(instance: EntityDocument): Promise<EntityDocument> {
    return instance.save();
  }

  async delete(id: string): Promise<void> {
    this.Model.findByIdAndRemove(id);
  }
}
