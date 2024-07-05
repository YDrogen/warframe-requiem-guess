import { cn } from '@/lib/utils';

import { Stack, type StackProps } from './stack';

type HStackProps = StackProps & {
  readonly wrap?: boolean;
};

function HStack({ className, wrap = true, ...props }: HStackProps) {
  return (
    <Stack
      className={cn(wrap ? 'flex-col md:flex-row' : 'flex-row', className)}
      direction='horizontal'
      name='hstack'
      {...props}
    />
  );
}

export { HStack };
