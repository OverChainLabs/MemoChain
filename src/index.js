import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { shuffleCards } from './actions/gameActions';
import { initWeb3 } from './actions/web3Actions';
import App from './pages/App';

// Crear store 
const store = createStore(reducers, applyMiddleware(thunk));

// Mezclar fichas por primera vez
store.dispatch(shuffleCards());

// Inicializar web3 y obtener el contrato
store.dispatch(initWeb3());

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );

render(App);
if (module.hot) module.hot.accept('./pages/App', () => render(App));