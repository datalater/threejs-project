import draw from "./HountedHouse.canvas";

export default function HountedHouse({ $target }) {
  const $section = document.createElement("section");
  $section.classList.add("hountedhouse");

  const canvas = document.createElement("canvas");
  canvas.classList.add("hountedhouse__canvas");

  this.render = () => {
    this.renderCanvas();

    $target.appendChild($section);
  };

  this.renderCanvas = () => {
    $section.appendChild(draw(canvas));
  };
}
