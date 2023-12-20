import {PropsWithChildren} from "react";
import style from "./style.module.scss";

type TextProps = {
	size?: "small" | "default" | "big" | "very-big";
} & PropsWithChildren;

export const Text = ({children, size}: TextProps) => {
	let cls: string;
	switch (size) {
		case "big":
			cls = style["text_big"];
			break;
		case "small":
			cls = style["text_small"];
			break;
		case "very-big":
			cls = style["very-big"];
			break;
		default:
			cls = style["default"];
			break;
	}
	return <div className={cls}>{children}</div>;
};
