import {Space} from "antd";
import {AuthWidget} from "src/widgetes/auth/auth";
import {Logo} from "src/shared";
import {LayoutEmptyPage} from "src/shared";
import style from "./style.module.scss";

const AuthPage = () => {
	return (
		<LayoutEmptyPage className={style["auth-page"]}>
			<Space style={{display: "flex", flexDirection: "column"}}>
				<Logo />
				<AuthWidget />
			</Space>
		</LayoutEmptyPage>
	);
};

export default AuthPage;
