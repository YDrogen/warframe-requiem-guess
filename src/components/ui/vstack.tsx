import { cn } from '@/lib/utils';

import { Stack, type StackProps } from './stack';

type VStackProps = StackProps;

function VStack({ className, ...props }: VStackProps) {
  return (
    <Stack
      className={cn(className)}
      direction='vertical'
      name='vstack'
      {...props}
    />
  );
}

export { VStack };
