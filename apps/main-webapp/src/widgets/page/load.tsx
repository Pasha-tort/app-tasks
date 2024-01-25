import {Text} from "@main-webapp/shared";
import {LayoutCenterPageContent, LayoutEmptyPage} from "@main-webapp/shared";

export const LoadPage = () => {
	return (
		<LayoutEmptyPage>
			<LayoutCenterPageContent>
				<Text size="big">Загрузка страницы...</Text>
			</LayoutCenterPageContent>
		</LayoutEmptyPage>
	);
};
