import {AuthGuard} from "src/shared";

const HomePage = () => {
	return <AuthGuard>"Home Page"</AuthGuard>;
};

export default HomePage;
