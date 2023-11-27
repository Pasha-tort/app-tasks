import {Prop, Schema, SchemaFactory, ModelDefinition} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Schema()
export class User {
	@Prop()
	name: string;

	@Prop()
	login: string;

	@Prop()
	password: string;
}

export const UserModel = Model<User>;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserFeature: ModelDefinition = {
	name: User.name,
	schema: UserSchema,
};
