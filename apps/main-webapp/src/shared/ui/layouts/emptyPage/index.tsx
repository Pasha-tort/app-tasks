import {PropsWithChildren} from "react";
import style from "./style.module.scss";
import cn from "classnames";

type Props = {
	className?: string;
	bgLightGreen?: boolean;
} & PropsWithChildren;

export const LayoutEmptyPage = ({children, className, bgLightGreen}: Props) => (
	<div
		className={cn(
			style["empty-page"],
			// bgLightGreen && style["empty-page_bg-light-green"],
			className,
		)}>
		{children}
	</div>
);
