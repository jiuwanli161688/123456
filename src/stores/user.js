import { defineStore } from 'pinia'

const state = () => {
  return {
    name: '测试'
  }
};

const getters = {};

const actions = {};


const user = defineStore('user', { state, getters, actions });

export default user;