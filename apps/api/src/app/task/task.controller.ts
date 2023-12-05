import {Body, Controller, Post} from "@nestjs/common";
import {JwtAuthGuard} from "@users-lib";

@Controller("task")
export class TaskController {
	@Post("add")
	@JwtAuthGuard()
	async addTask(@Body() body: unknown) {
		console.log(body);
	}
}
