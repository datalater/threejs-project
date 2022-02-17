const eventCleanStore = (function () {
  const cleanups = [];

  const push = (...items) => {
    cleanups.push(...items);
  };

  const clean = () => {
    while (cleanups.length > 0) {
      cleanups.pop()();
    }
  };

  return {
    push,
    clean,
  };
})();

export default eventCleanStore;
