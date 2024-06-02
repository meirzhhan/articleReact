import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>; // Исключение из типа 'direction'

export const VStack = (props: VStackProps) => {
  const { align = 'start' } = props;

  return <Flex {...props} direction={'column'} align={align} />;
};
