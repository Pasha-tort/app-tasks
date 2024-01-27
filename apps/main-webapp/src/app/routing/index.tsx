import {lazy} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AuthPage, Root} from "@main-webapp/pages";
import {HomePage} from "@main-webapp/pages";
import {routesConfig} from "@main-webapp/shared";

const AccountPage = lazy(() => import("@main-webapp/pages/account"));
const ProjectsPage = lazy(() => import("@main-webapp/pages/project"));
const ChatPage = lazy(() => import("@main-webapp/pages/chat"));
const PublicPage = lazy(() => import("@main-webapp/pages/public"));
const Error404 = lazy(() => import("@main-webapp/pages/404"));

/**
 * !! Хочешь добавить страницу, то сначала идем в routesConfig, и редачим его, добавляем страницу туда,
 * !! и потом на основе этого конфига создаем страницу тут
 */
export const router = createBrowserRouter([
	{
		path: routesConfig.root.path,
		element: (
			<Root>
				<HomePage />
			</Root>
		),
		errorElement: <Error404 />,
		children: [
			{
				path: routesConfig.root.child.account.path,
				element: <AccountPage />,
			},
			{
				path: routesConfig.root.child.projects.path,
				element: <ProjectsPage />,
			},
			{
				path: routesConfig.root.child.chat.path,
				element: <ChatPage />,
			},
		],
	},
	// {
	// 	path: routesConfig.root.child.auth.path,
	// 	element: <AuthPage />,
	// },
	{
		path: routesConfig.root.child.public.path,
		element: <PublicPage />,
	},
]);

export const Routing = () => {
	return <RouterProvider router={router} />;
};
