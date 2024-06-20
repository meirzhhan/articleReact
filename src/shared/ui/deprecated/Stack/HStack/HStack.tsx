import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>; // Исключение из типа 'direction'

/**
 * new UI kit added
 * @deprecated
 */

export const HStack = (props: HStackProps) => {
  return <Flex direction={'row'} {...props} />;
};
