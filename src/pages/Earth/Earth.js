import "./Earth.style.scss";

export default function Earth({ $target }) {
  const $section = document.createElement("section");
  $section.classList.add("earth");

  this.render = () => {
    const $message = document.createElement("div");

    $message.innerHTML = "...is building";

    $section.appendChild($message);

    $target.appendChild($section);
  };
}
