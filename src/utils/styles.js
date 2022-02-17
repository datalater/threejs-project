export const removeScroll = ($element, option = { restore: false }) => {
  option.restore
    ? ($element.style.overflow = null)
    : ($element.style.overflow = 'hidden');
};
