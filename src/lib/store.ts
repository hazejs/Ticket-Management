import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Ticket, PaginationInfo, UserType, FilterOptions } from './types';

interface TicketStore {
  tickets: Ticket[];
  pagination: PaginationInfo;
  userType: UserType;
  isLoading: boolean;
  searchQuery: string;
  filterOptions: FilterOptions;
  setTickets: (tickets: Ticket[]) => void;
  setPagination: (pagination: PaginationInfo) => void;
  setUserType: (userType: UserType) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilterOptions: (options: FilterOptions) => void;
  resetFilters: () => void;
}

export const useTicketStore = create<TicketStore>()(
  persist(
    (set) => ({
      tickets: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
      },
      userType: 'local',
      isLoading: false,
      searchQuery: '',
      filterOptions: {},
      setTickets: (tickets) => set({ tickets }),
      setPagination: (pagination) => set({ pagination }),
      setUserType: (userType) => set({ userType }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilterOptions: (filterOptions) => set({ filterOptions }),
      resetFilters: () => set({ filterOptions: {}, searchQuery: '' }),
    }),
    {
      name: 'ticket-store',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !key.startsWith('set') && key !== 'resetFilters'
          )
        ),
    }
  )
);
