import {useAppDispatch} from "@main-webapp/common";
import {useCallback} from "react";
import {editNameAction} from "@main-webapp/entities";
import {ApiUserContracts} from "@app-tasks/http/src/lib/contracts";

export const useGetSubmitEditName = () => {
	const dispatch = useAppDispatch();
	return useCallback(
		(data: ApiUserContracts.Auth.editName.RequestDto) => {
			dispatch(editNameAction(data));
		},
		[dispatch],
	);
};
