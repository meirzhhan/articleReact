import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme } from '@/shared/const/theme';
import {
  ThemeContext,
  ThemeContextProps,
} from '@/shared/lib/context/ThemeContext';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
  // initialTheme?: Theme;
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  // const { initialTheme, children } = props;
  const { children } = props;
  const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();

  const [isThemeInit, SetIsThemeInit] = useState(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (!isThemeInit) {
      setTheme(defaultTheme);
      SetIsThemeInit(true);
    }
  }, [defaultTheme, isThemeInit]);

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
