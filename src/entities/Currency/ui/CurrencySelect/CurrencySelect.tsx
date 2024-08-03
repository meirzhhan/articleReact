import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ListBox } from '@/shared/ui/Popups';

import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency; // Выбранное значение валюты.
  onChange?: (value: Currency) => void; // Функция, вызываемая при изменении выбранного значения.
  readonly?: boolean; //Флаг, указывающий на то, что элемент только для чтения. (не кликабельна)
}

const options = [
  { value: Currency.KZT, content: Currency.KZT },
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },
];

/**
 * Компонент для выбора валюты из списка.
 *
 * @param {CountrySelectProps} props - Свойства компонента.
 * @returns {JSX.Element} JSX-элемент, представляющий выбор валюты.
 */

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation('profile');

  // Обработчик изменения значения
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );

  // Пропсы для ListBox
  const listBoxProps = {
    className: className,
    value: value,
    items: options,
    defaultValue: t('Укажите валюту'),
    label: t('Валюта'),
    onChange: onChangeHandler,
    readonly: readonly,
    direction: 'top left' as const,
  };

  return <ListBox {...listBoxProps} />;
});
