import {Form, Input} from "antd";
import {ApiUserContracts} from "@app-tasks/http/src/lib/contracts";
import {ButtonSubmit, FormWrapper} from "@main-webapp/shared";
import {useGetSubmitEditName} from "../model";
import {useAppSelector} from "@main-webapp/common";
import {selectCurrentUserEdited} from "@main-webapp/entities";

export const EditNameFeature = () => {
	const submit = useGetSubmitEditName();
	const editedUser = useAppSelector(selectCurrentUserEdited);
	return (
		<FormWrapper<ApiUserContracts.Auth.editName.RequestDto>
			submit={submit}
			name="edit-name"
			style={{maxWidth: 400, width: "90vw"}}
			layout="vertical">
			<Form.Item<ApiUserContracts.Auth.editName.RequestDto["newName"]>
				label="Укажите новое имя"
				name="newName"
				rules={[{required: true, message: "Укажите новое имя"}]}>
				<Input disabled={editedUser} autoComplete="username" />
			</Form.Item>
			<ButtonSubmit disabled={editedUser} />
		</FormWrapper>
	);
};
