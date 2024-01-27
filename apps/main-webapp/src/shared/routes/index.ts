type Page = {
	path: string;
	child?: {[key in string]: Page};
};

/**
 * !! Необходимо соблюдать тип Page, сам конфиг не связывается жестко с этим типом, что бы в коде всегда ts мог подсказать поля объекта child
 */
export const routesConfig = {
	root: {
		path: "/",
		child: {
			account: {
				path: "/user-settings",
			},
			projects: {
				path: "/projects",
			},
			chat: {
				path: "/chat",
			},
			auth: {
				path: "/auth",
			},
			public: {
				path: "/public",
			},
		} as const,
	},
};

export const allPaths: string[] = [];

function getAllPaths(page: Page) {
	allPaths.push(page.path);
	if (!page.child) return;

	const childs = Object.entries(page.child);
	if (!childs.length) return;

	childs.forEach(child => {
		return getAllPaths(child[1]);
	});
}

getAllPaths(routesConfig.root);
