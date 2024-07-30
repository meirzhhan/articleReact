import { Flex, FlexProps } from '../Flex/Flex';

// Пропсы для компонента HStack, которые являются пропсами Flex, за исключением пропса 'direction'.
type VStackProps = Omit<FlexProps, 'direction'>; // Исключение из типа 'direction'

/**
 * Компонент HStack используется для создания горизонтального стека (флекс-контейнера с направлением 'column').
 *
 * @param {HStackProps} props - Пропсы компонента HStack.
 * @returns {JSX.Element} - Возвращает флекс-контейнер с горизонтальным направлением.
 */

export const VStack = (props: VStackProps): JSX.Element => {
  const { align = 'start' } = props;

  return <Flex {...props} direction={'column'} align={align} />;
};
