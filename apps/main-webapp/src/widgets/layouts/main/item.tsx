import {Link, To} from "react-router-dom";
import style from "./style.module.scss";
import cn from "classnames";

type Props = {
	icon: JSX.Element;
	label: string;
	to: To;
	collapsed?: boolean;
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Item = ({icon, label, to, collapsed, setCollapsed}: Props) => {
	return (
		<li className={cn(style["sidebar-item"])}>
			<Link
				onFocus={() => setCollapsed(true)}
				onBlur={() => setCollapsed(false)}
				to={to}
				className={style["sidebar-link"]}>
				{icon}
				<span
					className={cn(
						style["sidebar-item__label"],
						!collapsed && style["sidebar-item__label_active"],
					)}>
					{label}
				</span>
			</Link>
		</li>
	);
};
