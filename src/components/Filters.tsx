import { useCallback } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SlidersHorizontal } from 'lucide-react';
import { useTicketStore } from '@/lib/store';
import debounce from 'lodash/debounce';

const locations = [
  'New York City, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Miami, FL',
  'Austin, TX',
];

const categories = [
  'Concert',
  'Theater Show',
  'Sports Event',
  'Comedy Night',
  'Art Exhibition',
];

export function Filters() {
  const { filterOptions, setFilterOptions, resetFilters } = useTicketStore();

  const debouncedSetFilter = useCallback(
    debounce((key: string, value: string | number | undefined) => {
      setFilterOptions({ ...filterOptions, [key]: value });
    }, 300),
    [filterOptions]
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className='gap-2'>
          <SlidersHorizontal className='h-4 w-4' />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Tickets</SheetTitle>
          <SheetDescription>
            Customize your search with these filters
          </SheetDescription>
        </SheetHeader>

        <div className='mt-6 space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Price Range</label>
            <div className='flex gap-2'>
              <Input
                type='number'
                placeholder='Min'
                onChange={(e) =>
                  debouncedSetFilter('minPrice', Number(e.target.value))
                }
              />
              <Input
                type='number'
                placeholder='Max'
                onChange={(e) =>
                  debouncedSetFilter('maxPrice', Number(e.target.value))
                }
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Category</label>
            <Select
              onValueChange={(value) => debouncedSetFilter('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Location</label>
            <Select
              onValueChange={(value) => debouncedSetFilter('location', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select location' />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Date Range</label>
            <div className='flex gap-2'>
              <Input
                type='date'
                onChange={(e) =>
                  debouncedSetFilter('startDate', e.target.value)
                }
              />
              <Input
                type='date'
                onChange={(e) => debouncedSetFilter('endDate', e.target.value)}
              />
            </div>
          </div>

          <Button
            variant='outline'
            className='w-full'
            onClick={() => resetFilters()}
          >
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
