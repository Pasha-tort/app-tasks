import {Form, Input} from "antd";
import {ApiUserContracts} from "@app-tasks/http/src/lib/contracts";
import {ButtonSubmit, FormWrapper} from "@main-webapp/shared";
import {useGetSubmitFnToRegister} from "../model";

export const RegisterFeature = () => {
	const submit = useGetSubmitFnToRegister();

	return (
		<FormWrapper<ApiUserContracts.Auth.register.RequestDto>
			submit={submit}
			name="register"
			layout="vertical"
			style={{maxWidth: 400, width: "90vw"}}>
			<Form.Item<ApiUserContracts.Auth.register.RequestDto["email"]>
				label="Укажите вашу почту"
				name="email"
				hasFeedback
				rules={[{required: true, message: "Укажите вашу почту"}]}>
				<Input autoComplete="username" />
			</Form.Item>

			<Form.Item<ApiUserContracts.Auth.register.RequestDto["password"]>
				label="Укажите ваш пароль"
				name="password"
				hasFeedback
				rules={[{required: true, message: "Укажите ваш пароль"}]}>
				<Input.Password autoComplete="new-password" />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="Подтвердите ваш пароль"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "Подтвердите ваш пароль",
					},
					({getFieldValue}) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("Пароли должны совпадать!"));
						},
					}),
				]}>
				<Input.Password />
			</Form.Item>

			<Form.Item<ApiUserContracts.Auth.register.RequestDto["name"]>
				label="Укажите ваше имя"
				name="name"
				rules={[{required: true, message: "Укажите ваш пароль"}]}
				extra={
					"Имя по которому остальные пользователи смогут к вам обращаться"
				}>
				<Input />
			</Form.Item>
			<ButtonSubmit />
		</FormWrapper>
	);
};
