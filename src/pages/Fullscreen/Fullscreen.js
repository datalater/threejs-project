import "./Fullscreen.style.scss";
import draw from "./Fullscreen.canvas";
import contain from "./Fullscreen.article";

export default function Fullscreen({ $target }) {
  const $section = document.createElement("section");
  $section.classList.add("fullscreen");

  const $article = document.createElement("article");
  $article.classList.add("fullscreen__article");

  const canvas = document.createElement("canvas");
  canvas.classList.add("fullscreen__canvas");

  this.render = () => {
    this.renderContent();
    this.renderCanvas();

    $target.appendChild($section);
  };

  this.renderContent = () => {
    $section.appendChild(contain($article));
  };

  this.renderCanvas = () => {
    const { canvas: drawnCanvas, cleanups } = draw(canvas);

    this.setCleanups(cleanups);

    $section.appendChild(drawnCanvas);
  };

  this.cleanups = [];

  this.setCleanups = (cleanups) => {
    this.cleanups = cleanups;
  };
}
