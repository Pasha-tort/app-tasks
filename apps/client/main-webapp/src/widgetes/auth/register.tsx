import {Space} from "antd";
import {RegisterFeature} from "src/features/auth/ui/register";
import Title from "src/shared/ui/title";
import style from "./style.module.scss";

export const RegisterWidget = () => {
	return (
		<Space className={style["auth-widget"]}>
			<Title.H2>Зарегистрироваться в системе</Title.H2>
			<RegisterFeature />
		</Space>
	);
};
