import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/Button';

interface LangSwitchProps {
  className?: string;
  short?: boolean; //  Если true, отображается короткая версия текста для переключения языка.
}

/**
 * Переключатель для изменения языка приложения. (RU | MAIN)
 *
 * @param {LangSwitchProps} props - Свойства компонента.
 * @returns {JSX.Element} Компонент кнопки для смены языка.
 */

export const LangSwitch = memo(({ className, short }: LangSwitchProps) => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  const label = short ? t('Короткий язык') : t('Язык');

  return (
    <Button className={className} variant="clear" onClick={toggle}>
      {label}
    </Button>
  );
});
