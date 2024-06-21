import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>; // Исключение из типа 'direction'

export const HStack = (props: HStackProps) => {
  return <Flex direction={'row'} {...props} />;
};
