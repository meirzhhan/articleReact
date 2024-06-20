import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>; // Исключение из типа 'direction'

/**
 * new UI kit added
 * @deprecated
 */

export const VStack = (props: VStackProps) => {
  const { align = 'start' } = props;

  return <Flex {...props} direction={'column'} align={align} />;
};
