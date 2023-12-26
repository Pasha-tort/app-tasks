export class BaseException extends Error {
	text: string;
	messageError: string;
	constructor(text: string, messageError: string) {
		super();
		this.text = text;
		this.messageError = messageError;
	}
}
