export interface Ticket {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  userType: UserType;
  imageUrl?: string;
  price: number;
  category: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
}

export interface TicketResponse {
  tickets: Ticket[];
  pagination: PaginationInfo;
}

export type UserType = 'local' | 'tourist';

export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
}