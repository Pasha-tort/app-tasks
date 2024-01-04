import {Text} from "src/shared";
import {CenterPageContent, LayoutEmptyPage} from "src/shared";
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
