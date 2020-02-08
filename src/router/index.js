import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Projects from "../views/Projects.vue";
import DualListbox from "../views/Projects/DualListbox.vue";
import Quotes from "../views/Projects/Quotes.vue";
import CardMatching from "../views/Projects/CardMatching.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects
  },
  {
    path: "/projects/dual-listbox",
    name: "dual-listbox",
    component: DualListbox
  },
  {
    path: "/projects/quotes-maker",
    name: "quotes-maker",
    component: Quotes
  },
  {
    path: "/projects/card-matching",
    name: "card-matching",
    component: CardMatching
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
