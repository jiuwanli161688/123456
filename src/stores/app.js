import { defineStore } from 'pinia'
import { getMenuList } from '@/api/app';

const state = () => {
  return {
    isFoot: true,
    name: '测试',
    menuList: [],
  }
};

const getters = {};

const actions = {
  async getMenuList(par) {
    try {
      const { data } = await getMenuList(par);
      this.menuList = data || [];
    } catch (error) {
      console.error(error);
    }
  }
};

const useApp = defineStore('app', { state, getters, actions });

export default useApp;