import React, { use } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Ticket } from '@/lib/types';
import { TicketListSkeleton } from './TicketSkeleton';

interface TicketListProps {
  tickets: Ticket[];
  isLoading?: boolean;
}

export function TicketList({ tickets, isLoading }: TicketListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <TicketListSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Card key={ticket.id} className="hover:shadow-md transition-shadow">
          <CardContent className="flex gap-4 p-4">
            {ticket.imageUrl && (
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                <img
                  src={ticket.imageUrl}
                  alt={ticket.title}
                  className="object-cover w-full h-full transition-opacity duration-300"
                  loading="lazy"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.opacity = '1';
                  }}
                  style={{ opacity: 0 }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-lg font-semibold line-clamp-1">{ticket.title}</h3>
                <span className="font-medium whitespace-nowrap">
                  ${ticket.price}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                {ticket.description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(ticket.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="line-clamp-1">{ticket.location}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}