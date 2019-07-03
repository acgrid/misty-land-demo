import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const TUTORIAL = 't';
const QUIZ = 'q';
const ANSWERS = 'a';
const CHARACTER = 'c';
import {RESET, READ_TUTORIAL, PASS_QUIZ, ANSWER_QUESTIONS, CHOOSE_CHARACTER} from "./mutations";

function get(key){
  try{
    return JSON.parse(localStorage.getItem(key));
  }catch (e) {
    localStorage.removeItem(key);
    return undefined;
  }
}

function has(key) {
  return get(key) || false;
}

function set(key, value){
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function init() {
  return {
    tutorialRead: has(TUTORIAL),
    quizPassed: has(QUIZ),
    answers: get(ANSWERS) || [],
    characterChosen: get(CHARACTER)
  };
}

export default new Vuex.Store({
  state: init(),
  mutations: {
    [READ_TUTORIAL](state){
      state.tutorialRead = set(TUTORIAL, true);
    },
    [PASS_QUIZ](state){
      state.quizPassed = set(QUIZ, true);
    },
    [ANSWER_QUESTIONS](state, answers){
      state.answers = set(ANSWERS, answers);
    },
    [CHOOSE_CHARACTER](state, character){
      state.characterChosen = set(CHARACTER, character);
    },
    [RESET](state){
      localStorage.clear();
      this.replaceState(init());
    }
  },
  actions: {
    // Not used for there are no async actions here
  }
})
