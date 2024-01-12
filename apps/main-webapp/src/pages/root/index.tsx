import {AuthGuard} from "@main-webapp/widgets";
import {PropsWithChildren, Suspense} from "react";

export const Root = ({children}: PropsWithChildren) => {
	return (
		<AuthGuard>
			<Suspense>{children}</Suspense>
		</AuthGuard>
	);
};
