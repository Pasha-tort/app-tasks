import {Text} from "src/shared";
import {CenterPageContent, LayoutEmptyPage} from "src/shared";
import {useEffect, useState, startTransition} from "react";
import {useNavigate} from "react-router-dom";
import style from "./style.module.scss";

const countdown = 8;

const AuthFailedWidget = () => {
	const navigate = useNavigate();
	const [time, setTime] = useState(countdown);

	useEffect(() => {
		if (time <= 0) startTransition(() => navigate("/auth"));

		const timeout = setTimeout(() => {
			setTime(time - 1);
		}, 1000);

		return () => clearInterval(timeout);
	}, [time, navigate]);

	return (
		<LayoutEmptyPage>
			<CenterPageContent>
				<div className={style["auth-failed-wrapper"]}>
					<Text inline size="big">
						Произошла ошибка авторизации, вы будите перенаправлены на страницу
						аутентификации через
					</Text>
					&nbsp;
					<Text inline size="big" weight="semiBold">
						{time} секунд.
					</Text>
					&nbsp;
					<Text inline size="big">
						Если есть вопросы, обращаейтесь к администрации
					</Text>
				</div>
			</CenterPageContent>
		</LayoutEmptyPage>
	);
};

export default AuthFailedWidget;
