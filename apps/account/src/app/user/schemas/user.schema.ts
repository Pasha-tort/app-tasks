import {IUser} from "@account-lib";
import {Prop, Schema, SchemaFactory, ModelDefinition} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Document} from "mongoose";

@Schema({versionKey: false})
export class User extends Document implements IUser {
	@Prop({required: true})
	name: string;

	@Prop()
	lastName?: string;

	@Prop({required: true})
	email: string;

	@Prop({required: true})
	passwordHash: string;

	@Prop()
	tokenRefresh?: string;
}

export type UserModel = Model<User>;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserFeature: ModelDefinition = {
	name: User.name,
	schema: UserSchema,
};