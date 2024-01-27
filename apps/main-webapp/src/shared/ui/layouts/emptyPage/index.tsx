import {PropsWithChildren} from "react";
import style from "./style.module.scss";
import cn from "classnames";

type Props = {
	className?: string;
	bgLightGreen?: boolean;
} & PropsWithChildren;

export const LayoutEmptyPage = ({children, className}: Props) => (
	<div className={cn(style["empty-page"], className)}>{children}</div>
);
