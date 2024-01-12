import {CenterPageContent, LayoutEmptyPage, Text} from "@main-webapp/shared";
import style from "./style.module.scss";

const Page404 = () => (
	<LayoutEmptyPage>
		<CenterPageContent>
			<Text size="big" className={style["error404-text"]}>
				Такой страницы не существует...
			</Text>
		</CenterPageContent>
	</LayoutEmptyPage>
);

export default Page404;
