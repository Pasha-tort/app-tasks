import {HTMLAttributes, PropsWithChildren} from "react";
import style from "./style.module.scss";
import cn from "classnames";

type TextProps = {
	size?: "small" | "default" | "big" | "very-big";
} & PropsWithChildren &
	HTMLAttributes<HTMLDivElement>;

export const Text = ({children, size, className, ...props}: TextProps) => {
	let cls: string;
	switch (size) {
		case "big":
			cls = style["text_big"];
			break;
		case "small":
			cls = style["text_small"];
			break;
		case "very-big":
			cls = style["text_very-big"];
			break;
		default:
			cls = style["text_default"];
			break;
	}
	return (
		<div className={cn(cls, className)} {...props}>
			{children}
		</div>
	);
};
