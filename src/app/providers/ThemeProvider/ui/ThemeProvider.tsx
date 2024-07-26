import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme } from '@/shared/const/theme';
import {
  ThemeContext,
  ThemeContextProps,
} from '@/shared/lib/context/ThemeContext';
import { useJsonSettings } from '@/entities/User';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

interface ThemeProviderProps {
  // initialTheme?: Theme;
  children: ReactNode;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
  // const { initialTheme, children } = props;
  const { children } = props;
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
