import { Button } from '@/components/ui/button';
import { useTicketStore } from '@/lib/store';
import { MapPin, Users } from 'lucide-react';

export function UserTypeSwitch() {
  const { userType, setUserType } = useTicketStore();

  return (
    <div className='flex gap-2'>
      <Button
        variant={userType === 'local' ? 'default' : 'outline'}
        onClick={() => setUserType('local')}
        className='gap-2'
      >
        <Users className='h-4 w-4' />
        Local
      </Button>
      <Button
        variant={userType === 'tourist' ? 'default' : 'outline'}
        onClick={() => setUserType('tourist')}
        className='gap-2'
      >
        <MapPin className='h-4 w-4' />
        Tourist
      </Button>
    </div>
  );
}
