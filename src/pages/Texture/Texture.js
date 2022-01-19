import draw from "./Texture.canvas";

export default function Texture({ $target }) {
  const $section = document.createElement("section");
  $section.classList.add("texture");

  const canvas = document.createElement("canvas");
  canvas.classList.add("texture__canvas");

  this.render = () => {
    this.renderCanvas();

    $target.appendChild($section);
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
