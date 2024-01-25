import {Link} from "react-router-dom";
import cn from "classnames";
import style from "./style.module.scss";
import {Avatar as AvatarLib} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {routesConfig} from "@main-webapp/shared";

type Props = {
	collapsed: boolean;
	selectedKey?: string;
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Avatar = ({collapsed, selectedKey, setCollapsed}: Props) => {
	const isSelected = selectedKey === routesConfig.root.child.account.path;

	return (
		<Link
			onFocus={() => setCollapsed(true)}
			onBlur={() => setCollapsed(false)}
			to={routesConfig.root.child.account.path}
			className={cn(style["sidebar-link"], style["sidebar-item"])}
			style={{
				width: "100%",
				paddingLeft: "1.5rem",
			}}>
			<AvatarLib
				key="avatar"
				size={32}
				className={cn(
					style["avatar"],
					style["avatar-border"],
					isSelected && style["avatar-border_active"],
				)}
				icon={<UserOutlined />}
			/>
			<span
				className={cn(
					style["sidebar-item__label"],
					!collapsed && style["sidebar-item__label_active"],
				)}>
				Аккаунт
			</span>
		</Link>
	);
};
