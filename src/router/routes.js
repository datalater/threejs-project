import { Fullscreen, Texture, Earth, NotFound } from "@pages";

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
    name: "Earth",
    path: "/earth",
    component: Earth,
  },
];

export const NotFoundRoute = {
  name: "NotFound",
  component: NotFound,
};

export default routes;
