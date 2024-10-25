import type {  SchemaOptions } from 'mongoose';
import type { ICustomOptions } from '@typegoose/typegoose/lib/types.js';
import { Severity } from '@typegoose/typegoose';
export const MONGO_URI = import.meta.env.VITE_MONGO_CONNECTION_STRING;
export const MONGO_CONFIG: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
};
export const defaultSchemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    versionKey: false,
    transform: (doc, { _id: id, createdAt, updatedAt, ...rest }) => ({
      id,
      createdAt,
      updatedAt,
      ...rest,
    }),
  },
};
export const defaultModelOptions: { options: ICustomOptions } = {
  options: {
    allowMixed: Severity.ALLOW,
  },
};
