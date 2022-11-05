import { createRouter, createWebHistory } from "vue-router";
import Auth from "@/screen/Auth.vue";
import Home from "@/screen/Home.vue";
import Profile from "@/screen/Profile.vue";
import Post from "@/components/post/Post.vue";
import { useUserStore } from "./store/user";
import { computed } from "vue";

const routers = [
  {
    path: "/login",
    component: Auth,
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/friends",
    name: "friends",
    component: Home,
  },
  {
    path: "/watch",
    name: "watch",
    component: Home,
  },
  {
    path: "/market",
    name: "market",
    component: Home,
  },
  {
    path: "/profile/:user_id",
    name: "profile",
    component: Profile,
  },
  {
    path: "/:catchAll(.*)",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const store = useUserStore();

  if (authRequired && !store.isLoggedIn) {
    return "/login";
  }
});

export default router;
