import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import "./styles/index.scss";
import { withProviders } from "./providers";
import { Routing } from "./routing";
import { Provider } from 'react-redux';
import { store } from "src/shared";
import {StyleProvider} from "@ant-design/cssinjs";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Providers = () => (
  <Routing/>
);

root.render(
  <StrictMode>
    <StyleProvider>
      <Provider store={store}>
        {withProviders(Providers)()}
      </Provider>
    </StyleProvider>
  </StrictMode>
);
