const section = (className) => {
  const $section = document.createElement("section");

  $section.classList.add(className);

  return $section;
};

const canvas = (className) => {
  const $canvas = document.createElement("canvas");

  $canvas.classList.add(`${className}__canvas`);

  return $canvas;
};

const content = (innerHTML) => {
  const $template = document.createElement("template");

  $template.innerHTML = innerHTML;

  return $template.content;
};

const dom = {
  section,
  canvas,
  content,
};

export default dom;
