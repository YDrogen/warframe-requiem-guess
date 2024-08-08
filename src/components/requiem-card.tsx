import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Requiem } from '@/requiem';
import { REQUIEM_KNOWN_STATUS } from '@/requiem';

type RequiemCardProps = {
  requiem: Requiem;
  onPress?: (requiem: Requiem) => () => void;
};

export function RequiemCard({ requiem, onPress }: RequiemCardProps) {
  return (
    <div
      className='flex flex-row space-x-3 space-y-0 rounded-md border p-4 shadow items-center w-52 hover:cursor-pointer'
      style={{
        opacity: requiem.status === REQUIEM_KNOWN_STATUS.KNOWN ? 1 : 0.5,
      }}
      key={requiem.name}
      {...(onPress ? { onClick: onPress(requiem), onKeyDown: onPress(requiem) } : {})}
    >
      <Avatar className='hidden h-9 w-9 sm:flex bg-white'>
        <AvatarImage src={requiem.image} alt='Avatar' />
        <AvatarFallback>{requiem.name}</AvatarFallback>
      </Avatar>

      <div className='grid gap-1'>
        <p className='text-sm font-medium leading-none'>{requiem.name}</p>
        <p className='text-sm text-muted-foreground'>{requiem.description}</p>
      </div>
    </div>
  );
}
