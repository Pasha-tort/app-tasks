import {IUser} from "@app-tasks/account.slice";
import {Prop, Schema, SchemaFactory, ModelDefinition} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Document} from "mongoose";

@Schema({versionKey: false})
export class User extends Document implements IUser {
	@Prop({required: true})
	name: string;

	@Prop({required: true})
	email: string;

	@Prop({required: true})
	passwordHash: string;

	@Prop()
	tokenRefreshHash?: string;
}

export type UserModel = Model<User>;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserFeature: ModelDefinition = {
	name: User.name,
	schema: UserSchema,
};
