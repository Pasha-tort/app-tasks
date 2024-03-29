import {Form, Input} from "antd";
import {ApiUserContracts} from "@app-tasks/http/src/lib/contracts";
import {ButtonSubmit, FormWrapper} from "@main-webapp/shared";
import {useGetSubmitFnToLogin} from "../model/login";

export const LoginFeature = () => {
	const submit = useGetSubmitFnToLogin();
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
				<Input autoComplete="username" />
			</Form.Item>

			<Form.Item<ApiUserContracts.Auth.login.RequestDto["password"]>
				label="Укажите ваш пароль"
				name="password"
				rules={[{required: true, message: "Укажите ваш пароль"}]}>
				<Input.Password autoComplete="current-password" />
			</Form.Item>
			<ButtonSubmit />
		</FormWrapper>
	);
};
