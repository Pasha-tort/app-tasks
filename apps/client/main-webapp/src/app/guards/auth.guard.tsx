import {PropsWithChildren, Suspense, lazy, useEffect} from "react";
import {
	checkTokenAction,
	useAppDispatch,
	selectCurrentUser,
	useAppSelector,
} from "src/shared";
import {AuthLoadingWidget} from "src/widgetes";

const AuthFailedPage = lazy(() => import("src/pages/auth/failed"));

export const AuthGuard = ({children}: PropsWithChildren) => {
	const dispatch = useAppDispatch();
	const {status} = useAppSelector(state => selectCurrentUser(state));

	useEffect(() => {
		dispatch(checkTokenAction());
	}, [dispatch]);

	if (status === "loading") return <AuthLoadingPage />;
	if (status === "failed")
		return (
			<Suspense fallback={<AuthLoadingPage />}>
				<AuthFailedPage />
			</Suspense>
		);

	return children;
};
