import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';

import { Icon } from '@/shared/ui/Icon';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import ThemeIcon from '@/shared/assets/icons/themeNew.svg';

/**
 * Компонент переключателя темы. Позволяет изменять текущую тему и сохранять её в настройках пользователя.
 *
 * @param {Object} props - Свойства компонента. *
 * @returns {JSX.Element} Компонент иконки для переключения темы.
 */

export const ThemeSwitch = memo(({ className }: { className?: string }) => {
  const { toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  // Обработчик для переключения темы. Обновляет тему и сохраняет её в настройках пользователя.
  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    <Icon
      className={className}
      Svg={ThemeIcon}
      onClick={onToggleHandler}
      clickable
    />
  );
});
