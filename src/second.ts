function createAnalytics(): object {
  let counter = 0;
  let isDestroyed1: boolean = false;

  const listener = (): number => counter++;

  document.addEventListener('click', listener);

  return {
    destroy() {
      document.removeEventListener('click', listener);
      isDestroyed1 = true;
    },
    getClicks() {
      if (isDestroyed1) {
        return 'Analytics is destroy';
      }
      return counter;
    },
  };
}

window['analytics'] = createAnalytics();
