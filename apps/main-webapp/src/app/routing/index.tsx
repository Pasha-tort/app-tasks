import {Suspense, lazy} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {ProjectsPage} from "@main-webapp/pages";
import {LoadPage} from "@main-webapp/widgets";
import {HomePage} from "@main-webapp/pages";
import {AuthGuard} from "@main-webapp/app/guards";

const PublicPage = lazy(() => import("@main-webapp/pages/public"));

export const Routing = () => {
	return (
		<AuthGuard>
			<Suspense fallback={<LoadPage />}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/public" element={<PublicPage />} />
					<Route path="/projects" element={<ProjectsPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Suspense>
		</AuthGuard>
	);
};
