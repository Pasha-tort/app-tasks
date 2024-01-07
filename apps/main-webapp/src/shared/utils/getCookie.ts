export const getCookie = (cookieName: string) =>
	document.cookie
		.split(";")
		.find(cookie => cookie.split("=")[0] === cookieName);
