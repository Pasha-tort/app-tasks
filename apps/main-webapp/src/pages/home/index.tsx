import {useAppSelector} from "@main-webapp/common";
import {selectCurrentUser} from "@main-webapp/entities";
import {AuthWidget} from "@main-webapp/widgets";

export const HomePage = () => {
	const user = useAppSelector(selectCurrentUser);

	if (user.status === "failed") return <AuthWidget />;

	return "Home Page";
};
