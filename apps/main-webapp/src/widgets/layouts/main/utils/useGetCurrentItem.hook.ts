import {useLocation} from "react-router-dom";
import {allPaths} from "@main-webapp/shared";

export const useGetCurrentItem = () => {
	const {pathname} = useLocation();
	const currentPath = allPaths.find(
		path => pathname.match(path)?.input === path,
	);
	return currentPath;
};
