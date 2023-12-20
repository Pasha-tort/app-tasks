import {Layout} from "antd";
import {LoginWidget} from "src/widgetes/auth";
import style from "./style.module.scss";

const AuthPage = () => {
	return (
		<Layout className={style.emptyPage}>
			<LoginWidget />
		</Layout>
	);
};

export default AuthPage;
