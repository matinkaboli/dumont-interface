import { useEffect } from 'react';

const text =
  'There was an error preparing your transaction. Your transaction request will likely fail.';

export const useHidePrivyError = (isLoading: any) => {
  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const i = setInterval(() => {
      const elems = document.querySelectorAll('span');

      // @ts-ignore
      for (const elem of elems) {
        if (elem.textContent.trim() === text) {
          elem.style.display = 'none';

          clearInterval(i);
        }
      }
    }, 100);

    return () => {
      clearInterval(i);
    };
  }, [isLoading]);
};
