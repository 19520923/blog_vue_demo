import { defineStore } from "pinia";
import axios from "axios";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: {
      count: 0,
      currentPage: 1,
      rows: [],
    },
    comments: [
      {
        count: 0,
        currentPage: 1,
        post: "",
        rows: [],
      },
    ],
    userPosts: {
      count: 0,
      currentPage: 1,
      rows: [],
    },
  }),
  getters: {
    getPostById(id) {
      return this.posts[id];
    },

    getCommentsIndex(post_id) {
      return this.comments.findIndex((c) => c.post_id === post_id);
    },
  },
  actions: {
    async setPosts() {
      try {
        const response = await axios.get(
          `https://foodtalk-server.herokuapp.com/posts?page=1&limit=20`
        );
        if (response.data) {
          this.posts.currentPage = 2;
          this.posts.count = response.data.count;
          this.posts.rows = response.data.rows;
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },
    async setUserPosts(user_id) {
      try {
        const response = await axios.get(
          `https://foodtalk-server.herokuapp.com/posts/${user_id}?page=1&limit=20`
        );
        if (response.data) {
          this.userPosts.currentPage = 2;
          this.userPosts.count = response.data.count;
          this.userPosts.rows = response.data.rows;
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    async fetchPosts() {
      try {
        const response = await axios.get(
          `https://foodtalk-server.herokuapp.com/posts?page=${this.posts.currentPage}&limit=20`
        );
        if (response.data) {
          this.posts.currentPage++;
          this.posts.count = response.data.count;
          this.posts.rows.push(...response.data.rows);
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    async fetchUserPosts(user_id) {
      try {
        const response = await axios.get(
          `https://foodtalk-server.herokuapp.com/posts/${user_id}?page=${this.posts.currentPage}&limit=20`
        );
        if (response.data) {
          this.userPosts.currentPage++;
          this.userPosts.count = response.data.count;
          this.userPosts.rows.push(...response.data.rows);
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    async createComment(payload) {
      try {
        const response = await axios.post(
          `https://foodtalk-server.herokuapp.com/post-comments`,
          payload
        );
        const index = this.comments.findIndex((c) => c.post === payload.post);
        const postIndex = this.posts.rows.findIndex(
          (p) => p._id == payload.post
        );
        if (response.data) {
          this.posts.rows[postIndex].num_comment++;
          if (index != -1) {
            this.comments[index].count++;
            this.comments[index].currentPage = 2;
            this.comments[index].rows.push(response.data);
          } else {
            this.comments[0].count++;
            this.comments[0].rows = response.data;
            this.comments[0].post = payload.post;
          }
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    async setComments(post_id) {
      try {
        const index = this.comments.findIndex((c) => c.post === post_id);
        const response = await axios.get(
          `https://foodtalk-server.herokuapp.com/post-comments/${post_id}?page=1&limit=20`
        );
        if (response.data) {
          if (index != -1) {
            this.comments[index].count = response.data.count;
            this.comments[index].currentPage = 2;
            this.comments[index].rows = response.data.rows;
          } else {
            this.comments[0].count = response.data.count;
            this.comments[0].currentPage = 2;
            this.comments[0].rows = response.data.rows;
            this.comments[0].post = post_id;
          }
        }
      } catch (err) {
        console.log(err);
        if (err.response) console.log(err.response.data);
      }
    },

    async fetchComments(post_id) {
      try {
        const index = this.comments.findIndex((c) => c.post === post_id);
        if (index != -1) {
          const response = await axios.get(
            `https://foodtalk-server.herokuapp.com/post-comments/${post_id}?page=${this.comments[index].currentPage}&limit=20`
          );
          if (response.data) {
            this.comments[index].count = response.data.count;
            this.comments[index].currentPage++;
            this.comments[index].rows.push(...response.data.rows);
          }
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

    delete() {
      this.posts = {
        count: 0,
        currentPage: 1,
        rows: [],
      };
      this.comments = [
        {
          count: 0,
          currentPage: 1,
          post: "",
          rows: [],
        },
      ];
      this.userPosts = {
        count: 0,
        currentPage: 1,
        rows: [],
      };
    },
  },
  persist: true,
});
