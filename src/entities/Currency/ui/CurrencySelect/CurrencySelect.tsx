import { memo, useCallback } from 'react';
import { Currency } from '../../model/types/currency';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popups';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.KZT, content: Currency.KZT },
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation('profile');

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );

  const listBoxProps = {
    className: className,
    value: value,
    items: options,
    defaultValue: t('Укажите валют'),
    label: t('Укажите валют'),
    onChange: onChangeHandler,
    readonly: readonly,
    direction: 'top right' as const,
  };

  return <ListBox {...listBoxProps} />;
});
