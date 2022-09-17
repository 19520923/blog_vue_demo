import { defineStore } from "pinia";
import axios from "axios";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPostById(id) {
      return this.posts[id];
    },
  },
  actions: {
    async fetchPosts(page, limit) {
      try {
        const response = await axios.get(
          `https://foodtalk-server.herokuapp.com/posts?page=${page}&limit=${limit}`
        );
        if (response.data) {
          this.posts = response.data.rows;
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    async like(id, user_id) {
      try {
        const index = this.posts.findIndex((p) => p._id === id);
        this.posts[index].num_heart++;
        this.posts[index].reactions.push(user_id);
        const response = await axios.post(
          `https://foodtalk-server.herokuapp.com/posts/${id}/likeDislike`
        );
        if (response.data) {
          console.log(response.data);
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    async unLike(id, user_id) {
      try {
        const index = this.posts.findIndex((p) => p._id === id);
        this.posts[index].num_heart--;
        this.posts[index].reactions = this.posts[index].reactions.filter(
          (reaction) => reaction !== user_id
        );
        const response = await axios.post(
          `https://foodtalk-server.herokuapp.com/posts/${id}/likeDislike`
        );
        if (response.data) {
          console.log(response.data);
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    async create(payload) {
      try {
        const response = await axios.post(
          `https://foodtalk-server.herokuapp.com/posts`,
          payload
        );
        if (response.data) {
          this.posts.push(response.data);
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },
  },
  persist: true
});
