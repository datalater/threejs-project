const eventCleanStore = (function () {
  const cleanups = [];

  const push = (cleanup) => {
    cleanups.push(cleanup);
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
