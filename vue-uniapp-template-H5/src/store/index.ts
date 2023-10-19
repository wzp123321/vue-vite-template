import { createStore } from 'vuex';
interface IStore {
	systemTime:string;
}

const store = createStore<IStore>({
	state: {
		systemTime:'',
	},
	  mutations: {
	    ['SET_SYSTEM_TIME'](state, payload) {
	      state.systemTime = payload;
	    },
	  },
	  actions: {
	    setSystemTime({ commit }, data) {
	      commit('SET_SYSTEM_TIME', data);
	    },
	  },
	  getters: {
	    systemTime: (state) => {
	      return state.systemTime;
	    },
	  },
});

export default store;
