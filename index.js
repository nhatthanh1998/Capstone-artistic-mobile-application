import { registerRootComponent } from 'expo';
import React from 'react'
import App from './src/routers/App';
import { Provider } from 'react-redux';
import { store } from "./src/redux/store"
const RNRedux = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

registerRootComponent(RNRedux)

