import { Document } from "mongoose";

export interface Example {
  id?: string;
  name: string;
  created?: string;
  updated?: string;
}

export interface ExampleDocument extends Document {
  name: string;
}
