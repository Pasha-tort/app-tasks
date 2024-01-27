export const getCookie = (cookieName: string) => {
	return document.cookie
		.split(";")
		.find(cookie => cookie.trim().split("=")[0] === cookieName);
};
