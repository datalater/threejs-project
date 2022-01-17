import "./NotFound.style.scss";

export default function NotFound({ $target }) {
  const $section = document.createElement("section");
  $section.classList.add("notfound");

  this.render = () => {
    $section.innerHTML = `
      <h1>404</h1>
      <p>Page not found</p>
    `;

    $target.appendChild($section);
  };

  this.render();
}
