import cl from './Navbar.module.scss';

import { classNames } from 'shared/lib/classNames/classNames';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(cl.Navbar, {}, [className])}>
      <div className={cl.links}>/</div>
    </div>
  );
};
