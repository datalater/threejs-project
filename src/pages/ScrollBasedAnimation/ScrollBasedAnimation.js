import style from './ScrollBasedAnimation.style';
import draw from './ScrollBasedAnimation.canvas';
import dom from '@utils/dom';

export default function ScrollBasedAnimation({ $target }) {
  const className = 'ScrollBasedAnimation'.toLowerCase();

  this.render = () => {
    style();

    const $section = dom.section(className);

    $section.appendChild(draw(dom.canvas(className)));
    $section.appendChild(
      dom.content(/* html */ `
        <section class="section">
          <h1>ππ»ββοΈ μλνμΈμ, μ²΄μ€μλλ€.</h1>
        </section>
        <section class="section">
            <h2>π νλ‘μ νΈ</h2>
        </section>
        <section class="section">
            <h2>π μ°λ½μ²</h2>
        </section>
      `)
    );

    $target.appendChild($section);

    return $target;
  };
}
