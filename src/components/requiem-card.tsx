import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { REQUIEM, REQUIEM_NAME } from '@/requiems';

type RequiemCardProps = {
  requiem: REQUIEM;
  isSelected?: boolean;
  onPress?: (requiem: REQUIEM_NAME) => () => void;
};

export function RequiemCard({
  requiem,
  isSelected,
  onPress,
}: RequiemCardProps) {
  return (
    <div
      className='flex flex-row space-x-3 space-y-0 rounded-md border p-4 shadow items-center w-52 hover:cursor-pointer'
      style={{
        opacity: isSelected || !onPress ? 1 : 0.5,
      }}
      key={requiem.name}
      {...(onPress
        ? { onClick: onPress(requiem.name), onKeyDown: onPress(requiem.name) }
        : {})}
    >
      <Avatar className='hidden h-9 w-9 sm:flex bg-white'>
        <AvatarImage src={requiem.img} alt='Avatar' />
        <AvatarFallback>{requiem.name}</AvatarFallback>
      </Avatar>
      <div className='grid gap-1'>
        <p className='text-sm font-medium leading-none'>{requiem.name}</p>
        <p className='text-sm text-muted-foreground'>{requiem.description}</p>
      </div>
    </div>
  );
}
