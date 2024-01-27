import {PropsWithChildren, useEffect, useLayoutEffect} from "react";
import {checkTokenAction, selectCurrentUserStatus} from "@main-webapp/entities";
import {useAppSelector, useAppDispatch} from "@main-webapp/common";
import {useNavigate} from "react-router-dom";
import {routesConfig} from "@main-webapp/shared";
import {AuthLoadingWidget, AuthWidget} from "@main-webapp/widgets";
import {AuthPage} from "@main-webapp/pages";

export const AuthGuard = ({children}: PropsWithChildren) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectCurrentUserStatus);
	// const navigate = useNavigate();

	useLayoutEffect(() => {
		dispatch(checkTokenAction());
	}, [dispatch]);

	// useEffect(() => {
	// if (status === "failed" || status === "exited")
	// navigate(routesConfig.root.path);
	// 	// if (status === "succeeded") {
	// 	// 	navigate(routesConfig.root.path, {replace: true});
	// 	// }
	// });

	if (status === "loading") return <AuthLoadingWidget />;
	if (status === "idle") return null;
	if (status === "failed" || status === "exited") return <AuthWidget />;
	return children;
};
