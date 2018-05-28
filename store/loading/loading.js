import {
  START_LOADING,
  STOP_LOADING,
  START_SUBMITTING,
  STOP_SUBMITTING,
  GET_RANDOM_LOADING_TEXT,
  SET_LOADING_TEXT,
  SET_LOADING_TEXT_INTERVAL_KEY,
  SET_LOADING_TEXT_OPTIONS,
  TAKE_DELAYED_SCREENSHOT
} from '../types'

const loading = {
  state: {
    textInterval: null,
    textOptions: [
      'Hang tight!',
      'Thanks for your patience!',
      'Thanks for waiting!',
      'We\'re on it! Give us just a moment.'
    ],
    isLoading: false,
    text: ''
  },
  actions: {
    /**
     * Sets loading text options, gets a random value from those options then
     * displays a loading screen if it exists
     * @param options optional loading text options to replace existing text options
     */
    [START_LOADING]: ({ commit, dispatch }, options) => {
      if (options) {
        commit(SET_LOADING_TEXT_OPTIONS, options);
      }

      commit(START_LOADING);

      dispatch(GET_RANDOM_LOADING_TEXT);
      const loadingTextInterval = setInterval(() => {
        dispatch(GET_RANDOM_LOADING_TEXT);
      }, 5000);

      commit(SET_LOADING_TEXT_INTERVAL_KEY, loadingTextInterval);
    },
    /**
     * hides loading screen if it exists
     */
    [STOP_LOADING]: ({ commit, dispatch, state }) => {
      commit(STOP_LOADING);
      clearInterval(state.textInterval);
      commit(SET_LOADING_TEXT_INTERVAL_KEY, null);
      dispatch(TAKE_DELAYED_SCREENSHOT);
    },
    /**
     * start submitting
     */
    [START_SUBMITTING]: ({ commit }) => {
      commit(START_SUBMITTING);
    },
    /**
     * stop submitting
     */
    [STOP_SUBMITTING]: ({ commit }) => {
      commit(STOP_SUBMITTING);
    },
    /**
     * Gets a random string from loading text options and set it as the loading text
     */
    [GET_RANDOM_LOADING_TEXT]: ({ commit, state }) => {
      const idx = Math.floor(Math.random() * state.textOptions.length);
      commit(SET_LOADING_TEXT, state.textOptions[idx]);
    }
  },
  mutations: {
    /**
     * Starts loading
     */
    [START_LOADING](state) {
      Vue.set(state, 'isLoading', true);
    },
    /**
     * Stops loading
     */
    [STOP_LOADING](state) {
      Vue.set(state, 'isLoading', false);
    },
    /**
     * Starts submitting
     */
    [START_SUBMITTING](state) {
      Vue.set(state, 'isSubmitting', true);
    },
    /**
     * Stops submitting
     */
    [STOP_SUBMITTING](state) {
      Vue.set(state, 'isSubmitting', false);
    },
    /**
     * Sets loading text to passed in value
     * @param text new vault of loading text
     */
    [SET_LOADING_TEXT](state, text) {
      Vue.set(state, 'text', text);
    },
    /**
     * Sets array of loading text options
     * @param options {Array} list of text options for loading text to choose from
     */
    [SET_LOADING_TEXT_OPTIONS](state, options) {
      Vue.set(state, 'textOptions', options);
    },
    /**
     * Sets textInterval to the setInterval key to allow clearing when loading stops
     * @param interval
     */
    [SET_LOADING_TEXT_INTERVAL_KEY](state, interval) {
      Vue.set(state, 'textInterval', interval);
    }
  }
}

export default loading;
