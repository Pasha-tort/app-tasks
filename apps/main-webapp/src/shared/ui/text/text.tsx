import {HTMLAttributes, PropsWithChildren} from "react";
import style from "./style.module.scss";
import cn from "classnames";

type TextProps = {
	size?: "small" | "default" | "big" | "very-big";
	weight?: "regular" | "semiBold";
	inline?: boolean;
	color?: "black" | "dark" | "white" | "gray";
} & PropsWithChildren &
	HTMLAttributes<HTMLDivElement>;

export const Text = ({
	children,
	size,
	weight,
	className,
	inline,
	...props
}: TextProps) => {
	const cls = cn(
		style["text"],
		size ? style[`text_${size}`] : style["text_default"],
		weight ? style[`text_${weight}`] : style["text_regular"],
		className,
	);
	return (
		<div
			className={cls}
			{...props}
			style={{display: inline ? "inline" : "block"}}>
			{children}
		</div>
	);
};
