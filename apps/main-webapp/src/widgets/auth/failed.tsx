import {
	LayoutCenterPageContent,
	LayoutEmptyPage,
	Text,
} from "@main-webapp/shared";
import {useEffect, useState, startTransition} from "react";
import {Link, useNavigate} from "react-router-dom";
import style from "./style.module.scss";
import {Button, Space} from "antd";

const COUNT_DOWN = 8;

const AuthFailedWidget = () => {
	const navigate = useNavigate();
	const [time, setTime] = useState(COUNT_DOWN);

	useEffect(() => {
		if (time <= 0) startTransition(() => navigate("/"));

		const timeout = setTimeout(() => {
			setTime(time - 1);
		}, 1000);

		return () => clearInterval(timeout);
	}, [time, navigate]);

	return (
		<LayoutEmptyPage>
			<LayoutCenterPageContent>
				<Space style={{display: "flex", flexDirection: "column"}}>
					<div className={style["auth-failed-text"]}>
						<Text inline size="big">
							Аутентификация пользователя не выполнена, вы будите перенаправлены
							на страницу аутентификации через
						</Text>
						&nbsp;
						<Text inline size="big" weight="semiBold">
							{time}&nbsp;секунд.
						</Text>
						<Text inline size="big">
							Если есть вопросы, обращаейтесь к администрации сервиса
						</Text>
					</div>
					<Button>
						<Link to="/auth">Перейти</Link>
					</Button>
				</Space>
			</LayoutCenterPageContent>
		</LayoutEmptyPage>
	);
};

export default AuthFailedWidget;
