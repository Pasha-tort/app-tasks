import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import "./styles/index.scss";
import { withProviders } from "./providers";
import { Routing } from "src/pages";
import { Provider } from 'react-redux';
import { store } from "src/shared";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Providers = () => (
  <Routing/>
);

root.render(
  <StrictMode>
    <Provider store={store}>
      {withProviders(Providers)()}
    </Provider>
  </StrictMode>
);
