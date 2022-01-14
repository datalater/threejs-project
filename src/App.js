import "./assets/globalStyle.scss";
import Nav from "./components/Nav";
import Fullscreen from "./pages/Fullscreen";
import { initRouter, routes } from "./router";

export default function App({ $target }) {
  const $main = document.createElement("main");
  $main.classList.add("main");

  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
  };

  new Nav({
    $target,
    initailState: {
      routes,
    },
  });

  const fullscreen = new Fullscreen({ $target: $main });

  const renderFuctions = {
    "/": () => fullscreen.render(),
    "/fullscreen": () => fullscreen.render(),
  };

  this.route = () => {
    $main.innerHTML = "";

    const { pathname } = window.location;

    console.log({ pathname });

    (renderFuctions[pathname] || renderFunctions["/"])();
  };

  initRouter(() => this.route());

  $target.appendChild($main);
}
