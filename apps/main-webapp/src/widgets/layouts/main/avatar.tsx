import {Link} from "react-router-dom";
import cn from "classnames";
import style from "./style.module.scss";
import {Avatar as AvatarLib} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useState} from "react";

type Props = {
	collapsed: boolean;
};

export const Avatar = ({collapsed}: Props) => {
	const [isHover, setIsHover] = useState(false);
	return (
		<li
			className={style["sidebar-header-wrapper"]}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}>
			<Link
				to={"user-settings"}
				className={cn(
					style["sidebar-link"],
					!collapsed && style["sidebar-item__label_active"],
				)}>
				<AvatarLib
					className={cn(style["avatar"], isHover && style["avatar_active"])}
					size={32}
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
		</li>
	);
};
