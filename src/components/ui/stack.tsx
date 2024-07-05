import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  readonly gap?: number;
  readonly direction?: 'horizontal' | 'vertical';
  readonly name?: string;
};

function Stack({
  className,
  gap = 0,
  direction = 'vertical',
  name = 'stack',
  ...props
}: StackProps) {
  return (
    <div
      data-name={name}
      className={cn(
        'flex',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        'items-center',
        'justify-center',
        className,
      )}
      style={{
        gap: `${gap * 4}px`,
      }}
      {...props}
    />
  );
}

export { Stack };
