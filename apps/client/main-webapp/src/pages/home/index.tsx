// import {AuthGuard} from "src/widgets";

import {selectCurrentUser, useAppSelector} from "src/shared";
import AuthPage from "../auth";

const HomePage = () => {
	const user = useAppSelector(selectCurrentUser);

	if (user.status === "failed") return <AuthPage />;

	return "Home Page";
	// <AuthGuard failedToAuthPage>
	// </AuthGuard>;
};

export default HomePage;
