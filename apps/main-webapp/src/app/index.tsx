import "reflect-metadata";
// import { StrictMode } from 'react';
import * as ReactDOM from "react-dom/client";
import "./styles/index.scss";
import {Routing} from "./routing";
import {Provider} from "react-redux";
import {store} from "@main-webapp/common";
import {StyleProvider} from "@ant-design/cssinjs";
import {Root} from "@main-webapp/pages";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	// <StrictMode>
	<StyleProvider>
		<Provider store={store}>
			{/* <Root> */}
			<Routing />
			{/* </Root> */}
		</Provider>
	</StyleProvider>,
	// </StrictMode>
);
