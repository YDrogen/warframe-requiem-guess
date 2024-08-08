import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export type CenterProps = HTMLAttributes<HTMLDivElement> & {};

function Center({ className, ...props }: CenterProps) {
  return <div className={cn('flex', 'items-center', 'justify-center', className)} {...props} />;
}

export { Center };
