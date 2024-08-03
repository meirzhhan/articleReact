import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox } from '@/shared/ui/Popups';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country; // Выбранное значение страны.
  onChange?: (value: Country) => void; // Функция, вызываемая при изменении выбранного значения.
  readonly?: boolean; //Флаг, указывающий на то, что элемент только для чтения. (не кликабельна)
}

// Опции для выбора стран
const options = [
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Kyrgyzstan, content: Country.Kyrgyzstan },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Russia, content: Country.Russia },
];

/**
 * Компонент для выбора страны из списка.
 *
 * @param {CountrySelectProps} props - Свойства компонента.
 * @returns {JSX.Element} JSX-элемент, представляющий выбор страны.
 */

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { value, onChange, readonly } = props;
  const { t } = useTranslation('profile');

  // Обработчик изменения значения
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );

  // Пропсы для ListBox
  const listBoxProps = {
    onChange: onChangeHandler,
    value: value,
    defaultValue: t('Укажите страну'),
    label: t('Страна'),
    items: options,
    readonly: readonly,
    direction: 'top left' as const,
  };

  return <ListBox {...listBoxProps} />;
});
