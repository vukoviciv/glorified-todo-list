import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import { createStore } from 'vuex';

export default createStore({
  state: {
    isFetching: false,
    tasks: [],
    user: null,
    activeAccount: null
  },
  getters,
  actions,
  mutations
});
