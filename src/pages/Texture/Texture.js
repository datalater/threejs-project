import style from './Texture.style';
import draw from './Texture.canvas';
import dom from '@utils/dom';

export default function Texture({ $target }) {
  const classname = 'texture';

  this.render = () => {
    style();

    const $section = dom.section(classname);

    $section.appendChild(draw(dom.canvas(classname)));

    $target.appendChild($section);

    return $target;
  };
}
