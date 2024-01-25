import {PropsWithChildren} from "react";
import style from "./style.module.scss";
import cn from "classnames";

type Props = {
	className?: string;
} & PropsWithChildren;

export const LayoutCenterPageContent = ({children, className}: Props) => {
	return (
		<div className={cn(style["center-page-content"], className)}>
			{children}
		</div>
	);
};
