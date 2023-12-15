import {Body, Controller, Post} from "@nestjs/common";
import {UserExtractor} from "@app-tasks/http";
import {IUserBaseData} from "@app-tasks/account";

@Controller("task")
export class TaskController {
	@Post("add")
	async addTask(@Body() body: unknown, @UserExtractor() user: IUserBaseData) {
		console.log(body);
		console.log(user);
		return "OK";
	}
}
