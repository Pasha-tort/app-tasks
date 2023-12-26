import {PropsWithChildren, useLayoutEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch, checkTokenAction} from "src/shared";

export const AuthGuard = ({children}: PropsWithChildren) => {
	const dispatch = useDispatch<AppDispatch>();
	useLayoutEffect(() => {
		dispatch(checkTokenAction);
	});
	return children;
};
