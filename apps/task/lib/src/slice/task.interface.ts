enum TaskStatus {
	processing,
	success,
	pause,
	idle,
}

export interface ITask {
	status: TaskStatus;
	crete: Date;
	title: string;
	reviewer: string; // id пользователя
	//TODO исполнители
	data: string; // TODO пока string, но хотелось бы поработать с md, что бы тз поставленной задачи хранить в md
	start?: Date;
	finish?: Date;
}
