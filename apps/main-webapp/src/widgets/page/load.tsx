import {CenterPageContent, LayoutEmptyPage, Text} from "@main-webapp/shared";

export const LoadPage = () => {
	return (
		<LayoutEmptyPage>
			<CenterPageContent>
				<Text size="big">Загрузка страницы...</Text>
			</CenterPageContent>
		</LayoutEmptyPage>
	);
};
