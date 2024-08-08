import { cn } from '@/lib/utils';

import type { StackProps } from './stack';
import { Stack } from './stack';

type VStackProps = StackProps;

function VStack({ className, ...props }: VStackProps) {
  return <Stack className={cn(className)} direction='vertical' name='vstack' {...props} />;
}

export { VStack };
