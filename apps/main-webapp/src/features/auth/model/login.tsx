import {useAppDispatch} from "@main-webapp/common";
import {useCallback} from "react";
import {loginAction} from "@main-webapp/entities";
import {ApiUserContracts} from "@app-tasks/http/src/lib/contracts";

export const useGetSubmitFnToLogin = () => {
	const dispatch = useAppDispatch();
	const submit = useCallback(
		(data: ApiUserContracts.Auth.login.RequestDto) => {
			dispatch(loginAction(data));
		},
		[dispatch],
	);
	return submit;
};
