import {Space} from "antd";
// import {useLayoutEffect} from "react";
// import {useNavigate} from "react-router-dom";
import {
	LayoutEmptyPage,
	Logo,
	// selectCurrentUser,
	// useAppSelector,
} from "src/shared";
import {AuthWidget} from "src/widgets";

const AuthPage = () => {
	// const navigate = useNavigate();
	// const user = useAppSelector(state => selectCurrentUser(state));

	// useLayoutEffect(() => {
	// 	if (user.id) navigate("/");
	// }, [user.id, navigate]);
	return (
		// <AuthGuard successfulToHomePage>
		<LayoutEmptyPage>
			<Space style={{display: "flex", flexDirection: "column"}}>
				<Logo />
				<AuthWidget />
			</Space>
		</LayoutEmptyPage>
		// </AuthGuard>
	);
};

export default AuthPage;
