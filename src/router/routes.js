import { Fullscreen, Texture, HountedHouse, Earth, NotFound } from "@pages";
import ScrollBasedAnimation from "@pages/ScrollBasedAnimation/ScrollBasedAnimation";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Fullscreen,
  },
  {
    name: "Fullscreen",
    path: "/fullscreen",
    component: Fullscreen,
  },
  {
    name: "Texture",
    path: "/texture",
    component: Texture,
  },
  {
    name: "Hounted House",
    path: "/hountedhouse",
    component: HountedHouse,
  },
  {
    name: "Scroll Based Animation",
    path: "/scrollbasedanimation",
    component: ScrollBasedAnimation,
  },
  // {
  //   name: "Earth",
  //   path: "/earth",
  //   component: Earth,
  // },
];

export const NotFoundRoute = {
  name: "NotFound",
  component: NotFound,
};

export default routes;
