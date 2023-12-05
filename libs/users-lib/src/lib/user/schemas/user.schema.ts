import {Prop, Schema, SchemaFactory, ModelDefinition} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IUser} from "../user.interface";
import {Document} from "mongoose";

@Schema({versionKey: false})
export class User extends Document implements IUser {
	@Prop()
	name: string;

	@Prop({required: true})
	email: string;

	@Prop({required: true})
	passwordHash: string;
}

export type UserModel = Model<User>;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserFeature: ModelDefinition = {
	name: User.name,
	schema: UserSchema,
};
