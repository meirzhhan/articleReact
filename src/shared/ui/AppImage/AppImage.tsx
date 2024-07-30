import {
  ImgHTMLAttributes,
  memo,
  ReactElement,
  useLayoutEffect,
  useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
  const {
    className,
    src,
    alt = 'image',
    errorFallback,
    fallback,
    ...otherProps
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const img = new Image(); // Создание нового элемента изображения
    img.src = src ?? ''; // Установка источника изображения
    img.onload = () => {
      setIsLoading(false); // Изображение успешно загружено
    };
    img.onerror = () => {
      setIsLoading(false); // Ошибка при загрузке изображения
      setHasError(true);
    };
  }, [src]);

  if (isLoading && fallback) {
    return fallback; // Отображение компонента fallback, пока изображение загружается
  }

  if (hasError && errorFallback) {
    return errorFallback; // Отображение компонента errorFallback в случае ошибки загрузки
  }

  return <img className={className} src={src} alt={alt} {...otherProps} />;
});
