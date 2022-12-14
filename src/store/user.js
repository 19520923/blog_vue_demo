import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    token: "",
    user: {},
    notifications: [],
    search: [],
    currentUser: {}
  }),
  getters: {
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    async login(data, router) {
      try {
        const response = await axios.post(
          "https://foodtalk-server.herokuapp.com/auth",
          { access_token: "http://0.0.0.0:9000" },
          {
            auth: {
              username: data.email,
              password: data.password,
            },
          }
        );
        if (response.data) {
          this.token = response.data.token
          this.isLoggedIn = true;
          this.user = response.data.user;
          router.push({ path: "/home", replace: true });
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    logout() {
      this.isLoggedIn = false;
      this.token = "";
      this.user = {};
      this.notifications = [];
    },

    async fetchNoti(page, limit) {
      try {
        const response = await axios.get(
          `https://foodtalk-server.herokuapp.com/notifications?page=${page}&limit=${limit}`
        );
        if (response.data) {
          console.log(response.data);
          this.notifications = response.data.rows;
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    async searchFriend(key){
      try {
        const response = await axios
        .get(`https://foodtalk-server.herokuapp.com/users?q=${key}&page=1&limit=20`)
        if (response.data) {
          this.search = response.data.rows;
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    setCurrentUser(user){
      this.currentUser = user
    },

    addNoti(noti){
      this.notifications.unshift(noti)
    }
  },

  persist: true,
});
