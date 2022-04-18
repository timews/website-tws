import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./redux/store/store";

import Home from './pages/Home';
import GlobalStyle from './utils/style/GlobalStyle';
import './index.css';



ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Home />
  </Provider>,
  document.getElementById('root')
);
