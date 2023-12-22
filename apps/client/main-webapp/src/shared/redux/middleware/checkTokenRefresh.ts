export const checkTokenRefreshMiddleware =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(store: any) => (next: any) => (action: any) => {
		console.log("middleware");
		console.log(store);
		return next(action);
	};
