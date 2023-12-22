import {Tabs} from "antd";
import style from "./style.module.scss";
import {LoginFeature, RegisterFeature} from "src/features/auth";

const labelTabs = [
	{label: "Войти", children: LoginFeature},
	{label: "Регистрация", children: RegisterFeature},
] as const;

export const AuthWidget = () => {
	return (
		<Tabs
			className={style["auth-widget"]}
			defaultActiveKey="1"
			centered
			items={new Array(2).fill(null).map((_, i) => ({
				label: labelTabs[i].label,
				key: String(i + 1),
				children: labelTabs[i].children(),
				className: style["tab-content"],
			}))}
		/>
	);
};
