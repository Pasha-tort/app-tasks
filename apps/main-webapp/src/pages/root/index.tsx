import {useAppSelector} from "@main-webapp/common";
import {AuthGuard, AuthWidget, MainLayout} from "@main-webapp/widgets";
import {selectCurrentUser} from "@main-webapp/entities";
import {PropsWithChildren, Suspense} from "react";

export const Root = ({children}: PropsWithChildren) => {
	const user = useAppSelector(selectCurrentUser);

	if (user.status === "failed") return <AuthWidget />;

	return (
		<AuthGuard>
			<Suspense>
				<MainLayout>{children}</MainLayout>
			</Suspense>
		</AuthGuard>
	);
};
