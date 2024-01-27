import React from "react";
import type {CollapseProps} from "antd";
import {Collapse, Spin} from "antd";
import {EditNameFeature} from "@main-webapp/features";
import style from "./style.module.scss";
import {useAppSelector} from "@main-webapp/common";
import {selectCurrentUserEdited} from "@main-webapp/entities";

const LabelEditName = () => {
	const userEdited = useAppSelector(selectCurrentUserEdited);
	return (
		<>
			Изменить имя &nbsp;
			{userEdited && <Spin />}
		</>
	);
};

const items: CollapseProps["items"] = [
	{
		key: "edit-name",
		label: <LabelEditName />,
		children: <EditNameFeature />,
		className: style["collapse-item"],
	},
];

export const AccountCollapse: React.FC = () => {
	return <Collapse className={style["collapse-block"]} items={items} />;
};
