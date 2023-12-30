import {lazy} from "react";
import {Route, Routes, Navigate} from "react-router-dom";

const HomePage = lazy(() => import("src/pages/home"));
const PublicPage = lazy(() => import("src/pages/public"));
const AuthPage = lazy(() => import("src/pages/auth/auth"));

export const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/auth" element={<AuthPage />} />
			<Route path="/public" element={<PublicPage />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};
