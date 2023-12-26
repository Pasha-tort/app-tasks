import {Form, Input} from "antd";
import {ApiUserContracts} from "@app-tasks/http";
import {
	ButtonSubmit,
	FormWrapper,
	registerAction,
	logoutAction,
	tokenRefreshAction,
	useAppDispatch,
	Text,
} from "src/shared";
import {useCallback} from "react";

export const RegisterFeature = () => {
	const dispatch = useAppDispatch();
	const submit = useCallback(
		(data: ApiUserContracts.Auth.register.RequestDto) => {
			dispatch(registerAction(data));
		},
		[dispatch],
	);

	const submitRefresh = useCallback(() => {
		dispatch(tokenRefreshAction());
	}, [dispatch]);

	const submitLogout = useCallback(async () => {
		const res = await dispatch(logoutAction());
		// if (res.meta.requestStatus === "rejected")
		//TODO рисуем ошибку
		console.log(res);
	}, [dispatch]);

	return (
		<>
			<FormWrapper<ApiUserContracts.Auth.register.RequestDto>
				submit={submit}
				name="register"
				layout="vertical"
				style={{maxWidth: 400, width: "90vw"}}>
				<Form.Item<ApiUserContracts.Auth.register.RequestDto["email"]>
					label="Укажите вашу почту"
					name="email"
					rules={[{required: true, message: "Укажите вашу почту"}]}>
					<Input />
				</Form.Item>

				<Form.Item<ApiUserContracts.Auth.register.RequestDto["password"]>
					label="Укажите ваш пароль"
					name="password"
					rules={[{required: true, message: "Укажите ваш пароль"}]}>
					<Input.Password />
				</Form.Item>

				<Form.Item<ApiUserContracts.Auth.register.RequestDto["name"]>
					label="Укажите ваше имя"
					name="name"
					rules={[{required: true, message: "Укажите ваш пароль"}]}
					extra={
						<Text>
							Имя по которому остальные пользователи смогут к вам обращаться
						</Text>
					}>
					<Input />
				</Form.Item>
				<ButtonSubmit />
			</FormWrapper>
			<FormWrapper submit={submitRefresh} name="refresh">
				<ButtonSubmit text="refresh" />
			</FormWrapper>
			<FormWrapper submit={submitLogout} name="logout">
				<ButtonSubmit text="logout" />
			</FormWrapper>
		</>
	);
};
