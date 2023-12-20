import { Schema } from "@nestjs/mongoose";

@Schema({versionKey: false})
export class Task implements ITask {
  title: string;
  reviewer: string; // id проверяющего
  status: ;
}