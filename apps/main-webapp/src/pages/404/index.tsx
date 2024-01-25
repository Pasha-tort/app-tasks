import {
	LayoutCenterPageContent,
	LayoutEmptyPage,
	Text,
} from "@main-webapp/shared";
import style from "./style.module.scss";

const Page404 = () => (
	<LayoutEmptyPage>
		<LayoutCenterPageContent>
			<Text size="big" className={style["error404-text"]}>
				Такой страницы не существует...
			</Text>
		</LayoutCenterPageContent>
	</LayoutEmptyPage>
);

export default Page404;
