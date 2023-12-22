import {Form, Input} from "antd";
import {ApiUserContracts} from "@app-tasks/http";
import {ButtonSubmit, FormWrapper} from "src/shared";
import {useCallback} from "react";

export const LoginFeature = () => {
	const submit = useCallback((data: ApiUserContracts.Auth.login.RequestDto) => {
		console.log(data);
	}, []);
	return (
		<FormWrapper<ApiUserContracts.Auth.login.RequestDto>
			submit={submit}
			name="login"
			style={{maxWidth: 400, width: "90vw"}}
			layout="vertical">
			<Form.Item<ApiUserContracts.Auth.login.RequestDto["email"]>
				label="Укажите вашу почту"
				name="email"
				rules={[{required: true, message: "Укажите вашу почту"}]}>
				<Input />
			</Form.Item>

			<Form.Item<ApiUserContracts.Auth.login.RequestDto["password"]>
				label="Укажите ваш пароль"
				name="password"
				rules={[{required: true, message: "Укажите ваш пароль"}]}>
				<Input.Password />
			</Form.Item>

			<ButtonSubmit />
		</FormWrapper>
	);
};
