import {useAppSelector} from "@main-webapp/common";
import {
	AuthGuard,
	AuthWidget,
	LoadPage,
	MainLayout,
} from "@main-webapp/widgets";
import {selectCurrentUser} from "@main-webapp/entities";
import {PropsWithChildren, Suspense} from "react";

export const Root = ({children}: PropsWithChildren) => {
	const user = useAppSelector(selectCurrentUser);

	if (user.status === "failed") return <AuthWidget />;

	return (
		<AuthGuard>
			<MainLayout>
				<Suspense fallback={<LoadPage />}>{children}</Suspense>
			</MainLayout>
		</AuthGuard>
	);
};
