import { configureStore } from '@reduxjs/toolkit';
import reducer from './bugs';
// import { devToolsEnhancer } from 'redux-devtools-extension';
// import { createStore } from 'redux';




export default function configureAppStore () {
  return configureStore({ reducer })
};


