import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
import { connectedRouter } from 'connected-react-router';
import * as History from 'history';
import App from './App';
import * as ServiceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

const history = History.createBrowserHistory() //reactアプリ内でブラウザが前回どのパスにいたのかという情報を取得
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <connectedRouter history={history}> {/*Appコンポーネントの中で起きたURLの遷移を管理できるようにラッピング*/}
      <App />
    </connectedRouter>
  </Provider>,
  document.getElementById('root')
)
ServiceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
