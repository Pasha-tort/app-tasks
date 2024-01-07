import {Button, Form} from "antd";

type Props = {
	text?: string;
};

export const ButtonSubmit = ({text = "Отправить"}: Props) => (
	<Form.Item>
		<Button type="primary" htmlType="submit">
			{text}
		</Button>
	</Form.Item>
);
