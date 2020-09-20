import { Document, SchemaDefinition } from "mongoose";

export interface Example extends Document {
  name: string;
}

export const schemaDefinition: SchemaDefinition = {
  name: {
    type: String,
  }
};
