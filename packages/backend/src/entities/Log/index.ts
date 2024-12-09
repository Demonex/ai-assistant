import { index, modelOptions, prop } from "@typegoose/typegoose";
import { _BaseEntity } from "@repo/backend/entities/_BaseEntity.js";
import { defaultModelOptions, defaultSchemaOptions } from "@repo/backend/mongoose.config.js";


@modelOptions({
  ...defaultModelOptions,
  schemaOptions: {
    ...defaultSchemaOptions,
    toJSON: {
      ...defaultSchemaOptions.toJSON,
      virtuals: true,
      transform: (doc, { _id, createdAt, updatedAt, ...rest }) => ({
        id: _id,
        createdAt,
        updatedAt,
        ...rest,
      }),
    },
    collection: "log",

  },
  options: {
    customName: "log",
  },
})
@index(
  { ip: 1, request: 1 },
  {
    unique: true,
    background: true,
  },
)
export class LogEntity extends _BaseEntity {
  @prop()
  ip?: string;
  @prop()
  request?: string;
  @prop()
  count?: number;
}


export const LogEntityDefaultSelect = [
  "id",
  "ip",
  "request",
  "count",
];

export default LogEntity;
