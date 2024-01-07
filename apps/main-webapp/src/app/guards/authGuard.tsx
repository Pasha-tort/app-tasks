/* eslint-disable @nx/enforce-module-boundaries */
import {PropsWithChildren, useLayoutEffect} from "react";
import {checkTokenAction, selectCurrentUser} from "@main-webapp/entities";
import {useAppSelector, useAppDispatch} from "@main-webapp/common";
import {AuthLoadingWidget} from "../../widgets/auth/loading";
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
