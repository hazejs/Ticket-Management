import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useTicketStore } from '@/lib/store';
import debounce from 'lodash/debounce';

export function SearchBar() {
  const setSearchQuery = useTicketStore((state) => state.setSearchQuery);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  return (
    <div className='relative'>
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
      <Input
        className='pl-10 h-[50px] text-[1.2rem]'
        placeholder='Search tickets...'
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
}
