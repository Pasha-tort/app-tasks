import {useAppSelector} from "@main-webapp/common";
import {selectCurrentUser} from "@main-webapp/entities";
import {AuthWidget, MainLayout} from "@main-webapp/widgets";
import {Link, Outlet} from "react-router-dom";

export const HomePage = () => {
	const user = useAppSelector(selectCurrentUser);

	if (user.status === "failed") return <AuthWidget />;

	return (
		<MainLayout>
			Home Page
			<Outlet />
		</MainLayout>
	);
};
