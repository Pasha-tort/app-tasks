import {Body, Controller, Post} from "@nestjs/common";
import {UserExtractor} from "@http-lib";

@Controller("task")
export class TaskController {
	@Post("add")
	async addTask(@Body() body: unknown, @UserExtractor() user: unknown) {
		console.log(body);
		console.log(user);
		return "OK";
	}
}
