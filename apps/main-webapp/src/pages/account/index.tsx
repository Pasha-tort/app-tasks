import {useAppSelector} from "@main-webapp/common";
import {AccountCollapse} from "@main-webapp/widgets";
import {selectCurrentUserName} from "@main-webapp/entities";
import {Text} from "@main-webapp/shared";
import {Flex} from "antd";
import {LogoutFeature} from "@main-webapp/features";

const AccountPage = () => {
	const userName = useAppSelector(selectCurrentUserName);

	return (
		<>
			<Flex style={{marginBottom: "24px"}}>
				<Text size="big">Аккаунт пользователя:</Text>
				&nbsp;
				<Text size="big" weight="semiBold">
					{userName}
				</Text>
			</Flex>
			<AccountCollapse />
			<LogoutFeature />
		</>
	);
};

export default AccountPage;
