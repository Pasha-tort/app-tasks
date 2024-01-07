import {CenterPageContent, LayoutEmptyPage, Text} from "@main-webapp/shared";
import style from "./style.module.scss";

export const AuthLoadingWidget = () => (
	<LayoutEmptyPage>
		<CenterPageContent>
			<Text size="big" className={style["auth-loading-text"]}>
				Проверка аутентификации пользователя, пожалуйста подождите...
			</Text>
		</CenterPageContent>
	</LayoutEmptyPage>
);
