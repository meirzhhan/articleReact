import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, memo } from 'react';
import cl from './Drawer.module.scss';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const { className, children, isOpen, onClose } = props;

  const { theme } = useTheme();

  const mods: Mods = {
    [cl.opened]: isOpen,
  };

  return (
    // Portal teleports element top of the body
    <Portal>
      <div
        className={classNames(cl.Drawer, mods, [
          className,
          theme,
          'app_drawer',
        ])}
      >
        <Overlay onClick={onClose} />
        <div className={cl.content}>{children}</div>
      </div>
    </Portal>
  );
});
