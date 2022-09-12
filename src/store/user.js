import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    token: "",
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
    async login(data) {
      try {
        console.log(data);
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
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        this.isLoggedIn = true;
      } catch (err) {
        console.log(err)
        if (err.response) console.log(err.response.data);
      }
    },
  },
});
