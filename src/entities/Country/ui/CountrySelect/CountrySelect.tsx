import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Country } from '../../model/types/country';
import { Select } from 'shared/ui/Select/Select';
import { classNames } from 'shared/lib/classNames/classNames';
import { ListBox } from 'shared/ui/ListBox/ListBox';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Kyrgyzstan, content: Country.Kyrgyzstan },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Russia, content: Country.Russia },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation('profile');

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );

  return (
    <ListBox
      onChange={onChangeHandler}
      value={value}
      defaultValue={t('Укажите страну')}
      label={t('Укажите страну')}
      items={options}
      readonly={readonly}
      direction="top"
    />
  );
});
