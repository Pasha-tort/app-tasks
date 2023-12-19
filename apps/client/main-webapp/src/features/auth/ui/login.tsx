import {Button, Form, Input} from "antd";
import {ApiAccountContracts} from "@app-tasks/api/src";
import style from "./style.module.scss";

export const LoginBlock = () => {
	return (
		<Form
			name="basic"
			labelCol={{span: 8}}
			wrapperCol={{span: 16}}
			style={{maxWidth: 600}}
			autoComplete="off"
			className={style["auth-feature"]}>
			<Form.Item<ApiAccountContracts.Auth.login.RequestDto>
				label="Укажите вашу почту"
				name="email"
				rules={[{required: true, message: "Укажите вашу почту"}]}>
				<Input />
			</Form.Item>

			<Form.Item<ApiAccountContracts.Auth.login.RequestDto>
				label="Укажите ваш пароль"
				name="password"
				rules={[{required: true, message: "Укажите ваш пароль"}]}>
				<Input.Password />
			</Form.Item>

			<Form.Item wrapperCol={{offset: 8, span: 16}}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};
