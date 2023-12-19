import {PropsWithChildren} from "react";
import style from "./style.module.scss";

const Title = {
	H1: function ({children, ...props}: PropsWithChildren) {
		return (
			<h1 className={style.title} {...props}>
				{children}
			</h1>
		);
	},
	H2: function ({children, ...props}: PropsWithChildren) {
		return (
			<h2 className={style.title} {...props}>
				{children}
			</h2>
		);
	},
	H3: function ({children, ...props}: PropsWithChildren) {
		return (
			<h3 className={style.title} {...props}>
				{children}
			</h3>
		);
	},
	H4: function ({children, ...props}: PropsWithChildren) {
		return (
			<h4 className={style.title} {...props}>
				{children}
			</h4>
		);
	},
	H5: function ({children, ...props}: PropsWithChildren) {
		return (
			<h5 className={style.title} {...props}>
				{children}
			</h5>
		);
	},
	H6: function ({children, ...props}: PropsWithChildren) {
		return (
			<h6 className={style.title} {...props}>
				{children}
			</h6>
		);
	},
};
export default Title;
