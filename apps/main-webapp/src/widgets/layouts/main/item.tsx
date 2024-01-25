import {Link, To} from "react-router-dom";
import style from "./style.module.scss";
import "./style.module.scss";
import cn from "classnames";

type Props = {
	icon?: JSX.Element;
	label: string;
	to: To;
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Item = ({icon, label, to, setCollapsed}: Props) => {
	return (
		<Link
			onFocus={() => setCollapsed(true)}
			onBlur={() => setCollapsed(false)}
			to={to}
			className={cn(style["sidebar-link"])}>
			{icon}
			<span>{label}</span>
		</Link>
	);
};
