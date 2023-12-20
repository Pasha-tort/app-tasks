import {Button, Form as FormUI, Input} from "antd";
import {ApiAccountContracts} from "@app-tasks/api/src";
import {Form} from "react-hook-form";
import style from "./style.module.scss";
import {loginAction} from "src/shared/redux";

export const LoginFeature = () => {
	return (
		<Form onSubmit={loginAction}>
			<FormUI
				name="basic"
				labelCol={{span: 8}}
				wrapperCol={{span: 16}}
				style={{maxWidth: 600}}
				autoComplete="off"
				className={style["auth-feature"]}>
				<FormUI.Item<ApiAccountContracts.Auth.login.RequestDto>
					label="Укажите вашу почту"
					name="email"
					rules={[{required: true, message: "Укажите вашу почту"}]}>
					<Input />
				</FormUI.Item>

				<FormUI.Item<ApiAccountContracts.Auth.login.RequestDto>
					label="Укажите ваш пароль"
					name="password"
					rules={[{required: true, message: "Укажите ваш пароль"}]}>
					<Input.Password />
				</FormUI.Item>

				<FormUI.Item wrapperCol={{offset: 8, span: 16}}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</FormUI.Item>
			</FormUI>
		</Form>
	);
};
