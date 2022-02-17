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
          <h1>🙋🏻‍♂️ 안녕하세요, 체오입니다.</h1>
        </section>
        <section class="section">
            <h2>📂 프로젝트</h2>
        </section>
        <section class="section">
            <h2>📞 연락처</h2>
        </section>
      `)
    );

    $target.appendChild($section);

    return $target;
  };
}
