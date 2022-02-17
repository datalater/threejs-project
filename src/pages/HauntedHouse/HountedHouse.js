import style from './HountedHouse.style.js';
import draw from './HountedHouse.canvas';
import dom from '@utils/dom';

export default function HountedHouse({ $target }) {
  const classname = 'hountedhouse';

  this.render = () => {
    style();

    const $section = dom.section(classname);

    $section.appendChild(draw(dom.canvas(classname)));

    $target.appendChild($section);

    return $target;
  };
}
