import {useAppDispatch} from "@main-webapp/common";
import {logoutAction} from "@main-webapp/entities";
import {Button} from "@main-webapp/shared";
import {Modal} from "antd";

export const LogoutFeature = () => {
	const dispatch = useAppDispatch();
	return (
		<Button
			text="Выйти из аккаунта"
			type="primary"
			danger
			onClick={() => {
				Modal.confirm({
					title: "Выход из аккаунта",
					content: "Вы действительно хотите выйти из аккаута?",
					okText: "Выйти",
					cancelText: "Отмена",
					onOk() {
						return dispatch(logoutAction());
					},
					onCancel() {},
					maskClosable: true,
				});
			}}
		/>
	);
};
