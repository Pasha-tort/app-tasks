import {Controller} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {RMQTransform, RMQValidate} from "nestjs-rmq";
import {AccountRmqService} from "@app-tasks/account.transport";
import {AccountContracts} from "@app-tasks/account.slice";

@Controller()
export class UserController {
	constructor(private readonly userRepository: UserRepository) {}

	@RMQValidate()
	@RMQTransform()
	@AccountRmqService.editNameRpc()
	async register({
		userId,
		newName,
	}: AccountContracts.Auth.editName.RequestDto): Promise<AccountContracts.Auth.editName.ResponseDto> {
		return this.userRepository.updateUserById(userId, {name: newName});
	}
}
