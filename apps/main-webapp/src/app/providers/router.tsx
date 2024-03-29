import {BrowserRouter} from "react-router-dom";

export const withRouter = (Component: () => React.ReactNode) => () => {
	return (
		<BrowserRouter>
			<Component />
		</BrowserRouter>
	);
};
