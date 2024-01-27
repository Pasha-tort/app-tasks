import {Button as ButtonLib, Form} from "antd";
import {ButtonProps} from "antd/es/button/button";

type Props = {
	text?: string;
} & ButtonProps;

export const Button = ({
	text = "Выполнить",
	disabled,
	type,
	onClick,
	danger,
}: Props) => (
	<Form.Item>
		<ButtonLib
			danger={danger}
			disabled={disabled}
			type={type}
			onClick={onClick}>
			{text}
		</ButtonLib>
	</Form.Item>
);
