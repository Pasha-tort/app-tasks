import {PropsWithChildren} from "react";
import {Form, FormProps} from "antd";

type FormWrapperProps<FieldsValue extends object> = {
	submit: (data: FieldsValue) => void;
} & PropsWithChildren &
	Omit<FormProps, "form" | "autoComplete" | "preserve">;

export const FormWrapper = <FieldsValue extends object>({
	children,
	submit,
	...options
}: FormWrapperProps<FieldsValue>) => {
	const [form] = Form.useForm<FieldsValue>();
	return (
		<Form
			onFinish={() => {
				submit(form.getFieldsValue());
			}}
			form={form}
			autoComplete="off"
			preserve={false}
			{...options}>
			{children}
		</Form>
	);
};
