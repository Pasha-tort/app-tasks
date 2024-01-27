import {LayoutEmptyPage} from "@main-webapp/shared";
import {AuthWidget} from "@main-webapp/widgets";
import style from "./style.module.scss";

export const AuthPage = () => {
	return (
		<>
			<LayoutEmptyPage className={style["auth-page"]}>
				<AuthWidget />
			</LayoutEmptyPage>
		</>
	);
};
