import {
	LayoutCenterPageContent,
	LayoutEmptyPage,
	Text,
} from "@main-webapp/shared";
import style from "./style.module.scss";

export const AuthLoadingWidget = () => (
	<LayoutEmptyPage>
		<LayoutCenterPageContent>
			<Text size="big" className={style["auth-loading-text"]}>
				Проверка аутентификации пользователя, пожалуйста подождите...
			</Text>
		</LayoutCenterPageContent>
	</LayoutEmptyPage>
);
