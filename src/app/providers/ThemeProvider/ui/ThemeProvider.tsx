import { ReactNode, useEffect, useMemo, useState } from 'react';

import { useJsonSettings } from '@/entities/User';

import { Theme } from '@/shared/consts/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localStorage';
import {
  ThemeContext,
  ThemeContextProps,
} from '@/shared/lib/context/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

/**
 * Компонент провайдера темы приложения.
 * Этот компонент отвечает за управление темой на уровне приложения.
 * Тема берется из пользовательских настроек или из локального хранилища.
 *
 * @param {ThemeProviderProps} props - Свойства компонента.
 * @param {ReactNode} props.children - Дочерние элементы, которые будут обернуты провайдером.
 *
 * @returns {JSX.Element} Компонент провайдера темы.
 */

const ThemeProvider = (props: ThemeProviderProps): JSX.Element => {
  const { children } = props;

  // тема по умолчанию из пользовательских настроек
  const { theme: defaultTheme } = useJsonSettings();

  const [isThemeInit, SetIsThemeInit] = useState(false);
  const [theme, setTheme] = useState<Theme>(
    defaultTheme || fallbackTheme || Theme.LIGHT,
  );

  useEffect(() => {
    if (!isThemeInit && defaultTheme) {
      setTheme(defaultTheme);
      SetIsThemeInit(true);
    }
  }, [defaultTheme, isThemeInit]);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  // Мемоизация объекта контекста для предотвращения лишних перерисовок
  const defaultProps: ThemeContextProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
