import {Logo} from "@main-webapp/shared";
import {Layout, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {PropsWithChildren, useState} from "react";
import {LogoutOutlined, ProjectFilled, SettingFilled} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";

export const MainLayout = ({children}: PropsWithChildren) => {
	const [collapsed, setCollapsed] = useState(true);
	return (
		<Layout>
			<Sider
				onMouseEnter={() => setCollapsed(false)}
				onMouseLeave={() => setCollapsed(true)}
				trigger={null}
				collapsible
				collapsed={collapsed}>
				<Logo />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["1"]}
					items={[
						{
							key: "projects",
							icon: <ProjectFilled />,
							label: "Мои проекты",
						},
						{
							key: "userSettings",
							icon: <SettingFilled />,
							label: "Настройки",
						},
						{
							key: "logout",
							icon: <LogoutOutlined />,
							label: "Выйти из системы",
						},
					]}
				/>
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
