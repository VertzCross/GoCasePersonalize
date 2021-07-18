import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import stickers from "./stickers-store";

Vue.use(Vuex);

const dataState = createPersistedState({
  storage: window.sessionStorage,
  paths: ["stickers"]
});

const createStore = () => {
  return new Vuex.Store({
    modules: {
      stickers
    },
    plugins: [dataState]
  });
};
export default createStore;
