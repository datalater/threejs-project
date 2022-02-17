import './ScrollBasedAnimation.style.scss';
import eventCleanStore from '@store/eventCleanStore';

export default function style() {
  const $body = document.querySelector('body');
  $body.style.overflow = 'visible';
  $body.style.backgroundColor = '#1e1a20';

  eventCleanStore.push(() => {
    $body.style.overflow = null;
    $body.style.backgroundColor = null;
  });
}
