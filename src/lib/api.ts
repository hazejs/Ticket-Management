import { Ticket, TicketResponse, FilterOptions } from './types';
import { mockTickets } from './mockData';

function filterTickets(
  tickets: Ticket[],
  search: string,
  filters: FilterOptions
) {
  return tickets.filter((ticket) => {
    const matchesSearch = search
      ? ticket.title.toLowerCase().includes(search.toLowerCase()) ||
        ticket.description.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesPrice =
      (!filters.minPrice || ticket.price >= filters.minPrice) &&
      (!filters.maxPrice || ticket.price <= filters.maxPrice);

    const matchesCategory =
      !filters.category || ticket.category === filters.category;

    const matchesDate =
      (!filters.startDate ||
        new Date(ticket.date) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(ticket.date) <= new Date(filters.endDate));

    const matchesLocation =
      !filters.location || ticket.location === filters.location;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesCategory &&
      matchesDate &&
      matchesLocation
    );
  });
}

export async function getTickets(params: {
  userType?: string;
  page?: number;
  limit?: number;
  search?: string;
  filters?: FilterOptions;
}): Promise<TicketResponse> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { page = 1, limit = 10, search = '', filters = {} } = params;

  let filteredTickets = filterTickets(mockTickets, search, filters);

  if (params.userType) {
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.userType === params.userType
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedTickets = filteredTickets.slice(start, end);

  return {
    tickets: paginatedTickets,
    pagination: {
      page,
      limit,
      total: filteredTickets.length,
    },
  };
}
