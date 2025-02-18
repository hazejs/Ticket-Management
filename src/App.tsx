import { useEffect, useRef } from 'react';
import { useTicketStore } from '@/lib/store';
import { getTickets } from '@/lib/api';
import { TicketGrid } from '@/components/TicketGrid';
import { TicketList } from '@/components/TicketList';
import { SearchBar } from '@/components/SearchBar';
import { Filters } from '@/components/Filters';
import { UserTypeSwitch } from '@/components/UserTypeSwitch';
import { useInView } from 'react-intersection-observer';

function App() {
  const {
    tickets,
    userType,
    searchQuery,
    pagination,
    filterOptions,
    setTickets,
    setPagination,
    setIsLoading,
    isLoading,
  } = useTicketStore();

  const { ref: loadMoreRef, inView } = useInView();
  const loadingRef = useRef(false);

  async function loadMore() {
    if (loadingRef.current || isLoading) return;
    loadingRef.current = true;

    try {
      const response = await getTickets({
        userType,
        page: pagination.page + 1,
        limit: pagination.limit,
        search: searchQuery,
        filters: filterOptions,
      });

      setTickets([...tickets, ...response.tickets]);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to load more tickets:', error);
    } finally {
      loadingRef.current = false;
    }
  }

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  useEffect(() => {
    async function fetchTickets() {
      setIsLoading(true);
      try {
        const response = await getTickets({
          userType,
          page: 1,
          limit: pagination.limit,
          search: searchQuery,
          filters: filterOptions,
        });
        setTickets(response.tickets);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTickets();
  }, [userType, searchQuery, filterOptions]);

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto py-8 px-4'>
        <div className='mb-8 space-y-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <h1 className='text-4xl font-bold'>Event Tickets</h1>
            <UserTypeSwitch />
          </div>

          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <SearchBar />
            </div>
            <Filters />
          </div>
        </div>

        {userType === 'local' ? (
          <TicketGrid tickets={tickets} isLoading={isLoading} />
        ) : (
          <TicketList tickets={tickets} isLoading={isLoading} />
        )}

        <div ref={loadMoreRef} className='h-20'>
          {isLoading && tickets.length > 0 && (
            <div className='flex justify-center items-center h-full'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
