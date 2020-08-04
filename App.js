import * as React from "react";
import { View, Text } from "react-native";
import Index from './components/Index'
import TestObj from './components/TestObj'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)

export default function App() {
  return (
  	<Provider store={store}>
    	<Index/>
    </Provider>
  );
}
