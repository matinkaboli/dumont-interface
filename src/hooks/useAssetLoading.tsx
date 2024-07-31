import { useEffect, useState } from 'react';

type Asset = {
  src: string;
  type: 'image' | 'video';
};

type UseAssetsLoaderReturnType = {
  assets: Asset[];
  allAssetsLoaded: boolean;
};

const useAssetsLoader = (assetsList: Asset[]): UseAssetsLoaderReturnType => {
  const [assets, setAssets] = useState<Asset[]>(assetsList);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true; // To prevent state updates if the component is unmounted
    const assetLoadPromises = assets.map(asset => {
      return new Promise<void>((resolve, reject) => {
        let element: HTMLImageElement | HTMLVideoElement;

        if (asset.type === 'image') {
          element = new Image();
          element.src = asset.src;
        } else {
          element = document.createElement('video');
          element.src = asset.src;
        }

        element.onload = () => resolve();
        element.onerror = () => reject();
      });
    });

    Promise.all(assetLoadPromises)
      .then(() => {
        if (isMounted) {
          setAllAssetsLoaded(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAllAssetsLoaded(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [assets]);

  return { assets, allAssetsLoaded };
};

export default useAssetsLoader;
