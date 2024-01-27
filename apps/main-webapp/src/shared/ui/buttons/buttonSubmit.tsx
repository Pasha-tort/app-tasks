import {Button, Form} from "antd";
import {ButtonProps} from "antd/es/button/button";

type Props = {
	text?: string;
} & ButtonProps;

export const ButtonSubmit = ({
	text = "Отправить",
	disabled,
	type = "primary",
}: Props) => (
	<Form.Item>
		<Button disabled={disabled} type={type} htmlType="submit">
			{text}
		</Button>
	</Form.Item>
);
