import { BanIcon, CheckIcon } from 'lucide-react';

import { RequiemCard } from '@/components/requiem-card';
import { Center } from '@/components/ui/center';
import { HStack } from '@/components/ui/hstack';
import type { Requiem } from '@/requiem';
import { REQUIEM_USAGE_STATUS } from '@/requiem';

type SplitCardProps = {
  requiem: Requiem;
  index: number;
  onLeftPress: (requiem: Requiem, index: number) => () => void;
  onRightPress: (requiem: Requiem, index: number) => () => void;
};

export function SplitCard({ requiem, index, onLeftPress, onRightPress }: SplitCardProps) {
  const isConfirmed = requiem.usage[index] === REQUIEM_USAGE_STATUS.SUCCESS;

  return (
    <div className='relative'>
      {!isConfirmed ? (
        <HStack className='size-full absolute z-50 rounded-md justify-start'>
          <Center
            className='h-full w-1/2 bg-black opacity-10 rounded-l-md rounded-r-none hover:opacity-50 transition-all'
            onClick={onLeftPress(requiem, index)}
            onKeyDown={onLeftPress(requiem, index)}
          >
            <CheckIcon className='size-10' color={'white'} />
          </Center>

          <Center
            className='h-full w-1/2 bg-black opacity-10 rounded-l-none rounded-r-md hover:opacity-50 transition-all'
            onClick={onRightPress(requiem, index)}
            onKeyDown={onRightPress(requiem, index)}
          >
            <BanIcon className='size-10' color={'white'} />
          </Center>
        </HStack>
      ) : null}

      <RequiemCard requiem={requiem} />
    </div>
  );
}
