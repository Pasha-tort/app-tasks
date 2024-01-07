import {Space, Tabs} from "antd";
import style from "./style.module.scss";
import {LoginFeature, RegisterFeature} from "@main-webapp/features";
import {LayoutEmptyPage, Logo} from "@main-webapp/shared";

const labelTabs = [
	{label: "Войти", children: LoginFeature},
	{label: "Регистрация", children: RegisterFeature},
] as const;

export const AuthWidget = () => {
	return (
		<LayoutEmptyPage>
			<Space style={{display: "flex", flexDirection: "column"}}>
				<Logo />
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
			</Space>
		</LayoutEmptyPage>
	);
};
