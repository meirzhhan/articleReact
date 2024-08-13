import { memo, ReactNode, useCallback, useEffect } from 'react';

import { customCl } from '@/shared/lib/hooks/useClassName';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import {
  AnimationProvider,
  useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider';

import { Overlay } from '../Overlay';
import { Portal } from '../Portal';
import cl from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const height = window.innerHeight - 100;

/**
 * Основной компонент для отображения модального окна для мобильных устройств.
 *
 * @param {DrawerProps} props - Пропсы компонента `DrawerContent`.
 * @returns {JSX.Element | null} - Возвращает JSX элемент, если `isOpen` равен `true`, иначе возвращает `null`.
 */

export const DrawerContent = memo((props: DrawerProps) => {
  const { Spring, Gesture } = useAnimationLibs();
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
  const { theme } = useTheme();
  const { className, children, onClose, isOpen } = props;

  // Открывает выдвижное окно с анимацией.
  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    }
  }, [api, isOpen, openDrawer]);

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose,
    });
  };

  /**
   * Обрабатывает события перетаскивания для открытия и закрытия выдвижного окна.
   * @param {object} params - Параметры события перетаскивания.
   * @param {boolean} params.last - Определяет, является ли это последним событием перетаскивания.
   * @param {number} params.velocity - Скорость перетаскивания.
   * @param {number} params.direction - Направление перетаскивания.
   * @param {number} params.movement - Движение перетаскивания.
   * @param {function} params.cancel - Функция для отмены перетаскивания.
   */

  const bind = Gesture.useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
    }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  );

  if (!isOpen) {
    return null;
  }

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={customCl(cl.Drawer, {}, [
          className,
          theme,
          'app_drawer',
          cl.drawerNew,
        ])}
      >
        <Overlay onClick={close} />
        <Spring.a.div
          className={cl.sheet}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
});

/**
 * Асинхронный компонент для отображения выдвижного окна с задержкой загрузки.
 *
 * @param {DrawerProps} props - Пропсы компонента `DrawerAsync`.
 * @returns {JSX.Element | null} - Возвращает `DrawerContent`, если анимационные библиотеки загружены.
 */

const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />
    </AnimationProvider>
  );
};
