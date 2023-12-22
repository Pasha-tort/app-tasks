import {Text} from "../text";
import style from "./style.module.scss";

export const Logo = () => {
	return (
		<Text size="very-big" className={style.logo}>
			APP-TASKS
		</Text>
	);
};
