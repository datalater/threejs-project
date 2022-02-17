import './Texture.style.scss';
import { removeScroll } from '@utils/styles';
import eventCleanStore from '@store/eventCleanStore';

export default function style() {
  removeScroll(document.querySelector('body'));

  eventCleanStore.push(() => {
    removeScroll(document.querySelector('body'), { restore: true });
  });
}
