import {Layout} from "antd";
import {LoginWidget} from "src/widgetes/auth";
import style from "./style.module.scss";
import cn from "classnames";

const AuthPage = () => {
	return (
		<Layout className={cn(style.emptyPage, style)}>
			<LoginWidget />
		</Layout>
	);
};

export default AuthPage;
