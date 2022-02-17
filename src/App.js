import './assets/globalStyle.scss';
import './App.style.scss';
import { Nav } from '@components';
import { initRouter, routes, render } from '@router';
import { dom } from './utils';

export default function App({ $target }) {
  const $main = dom.element('main', 'main');

  new Nav({
    $target,
    initailState: {
      routes,
    },
  });

  this.route = () => {
    $main.innerHTML = '';

    const { pathname } = window.location;

    $target.appendChild(render({ path: pathname, $target: $main }));
  };

  initRouter(() => this.route());

  this.route();
}
