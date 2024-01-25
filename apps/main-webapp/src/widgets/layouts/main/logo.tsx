import {Link} from "react-router-dom";
import cn from "classnames";
import style from "./style.module.scss";
import {ReactComponent as LogoIcon} from "@main-webapp/assets/logo-carrot-2.svg";
import {routesConfig} from "@main-webapp/shared";

type Props = {
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Logo = ({setCollapsed}: Props) => {
	return (
		<Link
			onFocus={() => setCollapsed(true)}
			onBlur={() => setCollapsed(false)}
			to={routesConfig.root.path}
			className={cn(style["sidebar-logo"])}
			style={{
				width: "100%",
				paddingLeft: "1.15rem",
			}}>
			<div>
				<LogoIcon width={28} height={28} />
			</div>
		</Link>
	);
};
