import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Header from './components/Header/Header';
import GeneratorMainBlock from './components/GeneratorMainBlock/GeneratorMainBlock';
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Provider store={store}>
      <Header />
      {/*<Login/>*/}
      <Signup/>
      {/*<GeneratorMainBlock />*/}
    </Provider>
  );
}

export default App;
