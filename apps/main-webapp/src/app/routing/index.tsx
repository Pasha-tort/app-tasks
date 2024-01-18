import {Suspense, lazy} from "react";
import {
	Route,
	Routes,
	Navigate,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import {ProjectsPage, Root, UserSettingsPage} from "@main-webapp/pages";
import {LoadPage} from "@main-webapp/widgets";
import {HomePage} from "@main-webapp/pages";
import {AuthGuard} from "@main-webapp/app/guards";
import {rouesConfig} from "@main-webapp/shared";

const PublicPage = lazy(() => import("@main-webapp/pages/public"));
const Error404 = lazy(() => import("@main-webapp/pages/404"));

export const router = createBrowserRouter([
	{
		path: Object(rouesConfig.root.path),
		element: (
			<Root>
				<HomePage />
			</Root>
		),
		errorElement: <Error404 />,
		children: [
			{
				path: rouesConfig.root.child.userSettings.path,
				element: <UserSettingsPage />,
			},
			{
				path: rouesConfig.root.child.projects.path,
				element: <ProjectsPage />,
			},
		],
	},
	{
		path: "/public",
		element: <PublicPage />,
	},
]);

export const Routing = () => {
	return <RouterProvider router={router} />;
	// return (
	// 	<Suspense fallback={<LoadPage />}>
	// 		<AuthGuard>
	// 			<Routes>
	// 				<Route path="/" element={<HomePage />} />
	// 				<Route path="/projects" element={<ProjectsPage />} />
	// 			</Routes>
	// 		</AuthGuard>
	// 		<Routes>
	// 			<Route path="/public" element={<PublicPage />} />
	// 			<Route path="*" element={<Navigate to="/" />} />
	// 		</Routes>
	// 	</Suspense>
	// );
};
