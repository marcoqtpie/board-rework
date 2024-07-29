import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { FC, useState } from 'react';

interface IProps extends ImageProps {
  onLoadCall?: () => void;
  onErrorCall?: () => void;
  fallback: StaticImageData;
  loadingIcon: StaticImageData;
}

const ImgWithFallback: FC<IProps> = ({
  onLoadCall,
  onErrorCall,
  fallback,
  loadingIcon,
  src,
  sizes,
  objectFit,
  objectPosition,
  quality,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<StaticImport | string>(loadingIcon);

  const onError = () => {
    onErrorCall?.();
    setImgSrc(fallback);
  };

  const onLoad = () => {
    onLoadCall?.();
    setImgSrc(src);
  };

  return (
    <Image
      sizes={sizes || '(max-width: 600px) 100vw, 50vw'}
      fill
      quality={quality || 100}
      src={imgSrc || fallback}
      onLoad={onLoad}
      onError={onError}
      draggable='false'
      objectFit={objectFit || 'cover'}
      objectPosition={objectPosition || 'center'}
      {...rest}
    />
  );
};

export default ImgWithFallback;
