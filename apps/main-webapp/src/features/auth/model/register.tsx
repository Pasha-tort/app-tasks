import {useAppDispatch} from "@main-webapp/common";
import {useCallback} from "react";
import {ApiUserContracts} from "@app-tasks/http/src/lib/contracts";
import {registerAction} from "@main-webapp/entities";

export const useGetSubmitFnToRegister = () => {
	const dispatch = useAppDispatch();
	const submit = useCallback(
		(data: ApiUserContracts.Auth.register.RequestDto) =>
			dispatch(registerAction(data)),
		[dispatch],
	);
	return submit;
};
