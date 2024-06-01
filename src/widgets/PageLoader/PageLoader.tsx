import { classNames } from 'shared/lib/classNames/classNames';
import cl from './PageLoader.module.scss';
import Loader from 'shared/ui/Loader/Loader';

interface PageLoaderProps {
  className?: string;
}

const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={classNames(cl.PageLoader, {}, [className])}>
      <Loader />
    </div>
  );
};

export default PageLoader;
