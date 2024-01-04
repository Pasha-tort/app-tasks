import {PropsWithChildren, useLayoutEffect} from "react";
import {
	checkTokenAction,
	useAppDispatch,
	selectCurrentUser,
	useAppSelector,
} from "src/shared";
import {AuthLoadingWidget} from "./loading";
import {useNavigate} from "react-router-dom";

export const AuthGuard = ({children}: PropsWithChildren) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectCurrentUser);

	useLayoutEffect(() => {
		dispatch(checkTokenAction());
	}, [dispatch]);

	useLayoutEffect(() => {
		if (user.status === "failed") navigate("/");
	}, [user.status, navigate]);

	if (user.status === "loading") return <AuthLoadingWidget />;
	if (user.status === "idle") return null;
	return children;
};
