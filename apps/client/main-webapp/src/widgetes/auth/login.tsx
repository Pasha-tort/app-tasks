import {Space} from "antd";
import {LoginBlock} from "src/features/auth";
import Title from "src/shared/ui/title";
import style from "./style.module.scss";
console.log(style);
export const LoginWidget = () => {
	return (
		<Space className={style["auth-widget"]}>
			<Title.H2>Войти в систему</Title.H2>
			<LoginBlock />
		</Space>
	);
};
