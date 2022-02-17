import style from './Fullscreen.style';
import draw from './Fullscreen.canvas';
import dom from '@utils/dom';

export default function Fullscreen({ $target }) {
  const classname = 'fullscreen';

  this.render = () => {
    style();

    const $section = dom.section(classname);

    $section.appendChild(draw(dom.canvas(classname)));
    $section.appendChild(
      dom.content(/* html */ `
        <p class="${classname}__text">"Double click to toggle fullscreen"</p>
        <p class="${classname}__text">"And you can orbit around the object by your mouse"</p>
      `)
    );

    $target.appendChild($section);

    return $target;
  };
}
