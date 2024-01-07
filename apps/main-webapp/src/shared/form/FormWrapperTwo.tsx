import {PropsWithChildren} from "react";
import {
	useForm,
	FormProvider,
	FieldValues,
	UseFormProps,
} from "react-hook-form";

type FormWrapperProps<T extends FieldValues, Res = void> = {
	onSubmit: () => Res;
	options?: UseFormProps<T>;
} & PropsWithChildren;

/* не используемый компонент, но не удаленный*/
export const FormWrapper = <T extends FieldValues, Res extends object>({
	children,
	onSubmit,
	options,
}: FormWrapperProps<T, Res>) => {
	const methods = useForm({
		mode: "onBlur",
		reValidateMode: "onChange",
		criteriaMode: "all",
		delayError: 100,
		defaultValues: options?.defaultValues,
		shouldFocusError: true,
		shouldUnregister: true,
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	);
};
