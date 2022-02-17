const element = (tagName, className) => {
  const $element = document.createElement(tagName)

  $element.classList.add(className)

  return $element
}

const section = (className) => {
  const $section = document.createElement('section')

  $section.classList.add(className)

  return $section
}

const canvas = (className) => {
  const $canvas = document.createElement('canvas')

  $canvas.classList.add(`${className}__canvas`)

  return $canvas
}

const content = (innerHTML) => {
  const $template = document.createElement('template')

  $template.innerHTML = innerHTML

  return $template.content
}

const dom = {
  element,
  section,
  canvas,
  content,
}

export default dom
