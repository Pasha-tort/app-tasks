import {AuthWidget, LoadPage, MainLayout} from "@main-webapp/widgets";
import {AuthGuard} from "@main-webapp/app/guards";
import {PropsWithChildren, Suspense} from "react";
import {useAppSelector} from "@main-webapp/common";
import {selectCurrentUserStatus} from "@main-webapp/entities";

export const Root = ({children}: PropsWithChildren) => {
	// const status = useAppSelector(selectCurrentUserStatus);

	// if (status === "failed") return <AuthWidget />;

	return (
		<AuthGuard>
			<MainLayout>
				<Suspense fallback={<LoadPage />}>{children}</Suspense>
			</MainLayout>
		</AuthGuard>
	);
};
