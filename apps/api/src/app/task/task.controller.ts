import {Body, Controller, Post} from "@nestjs/common";
import {UserExtractor} from "@app-tasks/http";
import {IUserBaseData} from "@app-tasks/account";
import {ApiTaskContracts} from "@slice";

@Controller("task")
export class TaskController {
	@Post("add")
	async addTask(
		@Body() body: ApiTaskContracts.addTask.RequestDto,
		@UserExtractor() user: IUserBaseData,
	) {
		console.log(body);
		console.log(user);
		return "OK";
	}
}
