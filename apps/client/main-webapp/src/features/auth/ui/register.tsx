import {Form, Input} from "antd";
import {ApiUserContracts} from "@app-tasks/http";
import {Text} from "src/shared/ui/text/text";
import {ButtonSubmit, FormWrapper, registerAction} from "src/shared";
import {useCallback} from "react";
import {useAppDispatch} from "src/shared/redux";

export const RegisterFeature = () => {
	const dispatch = useAppDispatch();
	const submit = useCallback(
		async (data: ApiUserContracts.Auth.register.RequestDto) => {
			console.log(data);
			const res = await dispatch(registerAction(data));
			console.log({res});
		},
		[dispatch],
	);
	return (
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
	);
};
