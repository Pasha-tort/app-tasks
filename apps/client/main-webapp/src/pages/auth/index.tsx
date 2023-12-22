import {Space} from "antd";
import style from "./style.module.scss";
import {AuthWidget} from "src/widgetes/auth/auth";
import {Logo} from "src/shared";

const AuthPage = () => {
	return (
		<div className={style["auth-page"]}>
			<Space style={{display: "flex", flexDirection: "column"}}>
				<Logo />
				<AuthWidget />
			</Space>
		</div>
	);
};

export default AuthPage;
