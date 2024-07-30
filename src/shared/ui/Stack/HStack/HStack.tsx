import { Flex, FlexProps } from '../Flex/Flex';

// Пропсы для компонента VStack, которые являются пропсами Flex, за исключением пропса 'direction'.
type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * Компонент VStack используется для создания вертикального стека (флекс-контейнера с направлением 'row').
 *
 * @param {VStackProps} props - Пропсы компонента VStack.
 * @returns {JSX.Element} - Возвращает флекс-контейнер с вертикальным направлением.
 */

export const HStack = (props: HStackProps) => {
  return <Flex direction={'row'} {...props} />;
};
