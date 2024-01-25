import {Layout, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {PropsWithChildren, useState} from "react";
import {
	LogoutOutlined,
	ProjectFilled,
	UserOutlined,
	MessageFilled,
} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import style from "./style.module.scss";
import cn from "classnames";
import {Item} from "./item";
import {Avatar} from "./avatar";
import {routesConfig} from "@main-webapp/shared";
import {useGetCurrentItem} from "./utils/useGetCurrentItem.hook";
import {Logo} from "./logo";

export const MainLayout = ({children}: PropsWithChildren) => {
	const [hover, setHover] = useState(false);
	const [itemIsFocus, setItemIsFocus] = useState(false);
	const collapsed = hover === true || itemIsFocus === true ? false : true;

	const currentPath = useGetCurrentItem();
	return (
		<Layout className={style["layout"]}>
			<Sider
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => {
					setHover(false);
					setItemIsFocus(false);
				}}
				className={style["sidebar"]}
				trigger={null}
				collapsible
				collapsed={collapsed}>
				<Logo setCollapsed={setItemIsFocus} />
				<Avatar
					setCollapsed={setItemIsFocus}
					selectedKey={currentPath}
					collapsed={collapsed}
				/>
				<Menu
					theme="dark"
					mode="vertical"
					selectedKeys={currentPath ? [currentPath] : undefined}
					className={style["list-items"]}
					onFocus={() => setItemIsFocus(true)}
					onBlur={() => setItemIsFocus(false)}
					items={[
						{
							key: routesConfig.root.child.projects.path,
							icon: <ProjectFilled />,
							className: cn(
								currentPath === routesConfig.root.child.projects.path &&
									style["menu-item_active"],
							),
							label: (
								<Item
									label="Мои проекты"
									to={routesConfig.root.child.projects.path}
									setCollapsed={setItemIsFocus}
								/>
							),
						},
						{
							key: routesConfig.root.child.chat.path,
							icon: <MessageFilled />,
							className: cn(
								currentPath === routesConfig.root.child.chat.path &&
									style["menu-item_active"],
							),
							label: (
								<Item
									label="Мессенджер"
									to={routesConfig.root.child.chat.path}
									setCollapsed={setItemIsFocus}
								/>
							),
						},
					]}
				/>
			</Sider>
			<Layout className={style["content"]}>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
					}}>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};
