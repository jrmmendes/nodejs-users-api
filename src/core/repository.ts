import { inject, injectable, unmanaged } from "inversify";
import { Document, Model, Mongoose, Schema, SchemaDefinition } from "mongoose";
import { Types } from "./types";

@injectable()
export class Repository<EntityDocument extends Document> {
  protected Model: Model<EntityDocument>;

  constructor(
    @inject(Types.DatabaseClient) private dbClient: Mongoose,
    @unmanaged() private name: string,
    @unmanaged() schemaDefinition: SchemaDefinition,
  ) {
    const schema = new Schema(schemaDefinition, { collection: this.name })
    this.Model = this.dbClient.model<EntityDocument>(this.name, schema);
  }

  async findAll(): Promise<EntityDocument[]> {
    return this.Model.find();
  }

  async findByID(id: string): Promise<EntityDocument | null> {
    return this.Model.findById(id);
  }

  async save(doc: EntityDocument): Promise<EntityDocument> {
    const instance = new this.Model(doc);
    return instance.save();
  }

  async delete(id: string): Promise<void> {
    this.Model.findByIdAndRemove(id);
  }
}
