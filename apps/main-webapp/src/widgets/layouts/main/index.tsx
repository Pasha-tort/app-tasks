// import {Logo} from "@main-webapp/shared";
import {ReactComponent as Logo} from "@main-webapp/assets/logo-transparent.svg";
import {Layout, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {PropsWithChildren, useCallback, useState} from "react";
import {LogoutOutlined, ProjectFilled, SettingFilled} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import {UserOutlined} from "@ant-design/icons";
import style from "./style.module.scss";
import cn from "classnames";
import {Item} from "./item";
import {Link} from "react-router-dom";
import {Avatar} from "./avatar";

export const MainLayout = ({children}: PropsWithChildren) => {
	const [hover, setHover] = useState(false);
	const [itemIsFocus, setItemIsFocus] = useState(false);
	const collapsed = hover === true || itemIsFocus === true ? false : true;
	return (
		<Layout className={style["layout"]}>
			<Sider
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				trigger={null}
				collapsible
				collapsed={collapsed}
				className={style["sidebar"]}>
				<Link
					to={"/"}
					className={cn(
						style["sidebar-header-wrapper"],
						style["sidebar-logo"],
					)}>
					<Logo width={32} />
				</Link>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["projects"]}
					className={style["list-items"]}
					// items={[
					// 	{
					// 		key: "projects",
					// 		icon: <ProjectFilled />,
					// 		label: "Мои проекты",
					// 		className: style["sidebar-item"],
					// 	},
					// 	{
					// 		key: "userSettings",
					// 		icon: <SettingFilled />,
					// 		label: "Настройки",
					// 		className: style["sidebar-item"],
					// 	},
					// 	{
					// 		key: "logout",
					// 		icon: <LogoutOutlined />,
					// 		label: "Выйти из системы",
					// 		className: style["sidebar-item"],
					// 	},
					// ]}
				>
					<Avatar collapsed={collapsed} />
					<Item
						key="projects"
						icon={<ProjectFilled />}
						label="Мои проекты"
						to={"projects"}
						collapsed={collapsed}
						setCollapsed={setItemIsFocus}
					/>
				</Menu>
			</Sider>
			<Layout>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						// background: colorBgContainer,
						// borderRadius: borderRadiusLG,
					}}>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};
