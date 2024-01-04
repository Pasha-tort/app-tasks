import {Suspense, lazy} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {ProjectsPage} from "src/pages";
import {AuthGuard, LoadPage} from "src/widgets";

const HomePage = lazy(() => import("src/pages/home"));
const PublicPage = lazy(() => import("src/pages/public"));
// const AuthPage = lazy(() => import("src/pages/auth"));

export const Routing = () => {
	return (
		<AuthGuard>
			<Suspense fallback={<LoadPage />}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					{/* <Route path="/auth" element={<AuthPage />} /> */}
					<Route path="/public" element={<PublicPage />} />
					<Route path="/projects" element={<ProjectsPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Suspense>
		</AuthGuard>
	);
};
