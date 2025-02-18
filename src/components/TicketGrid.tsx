import React, { use } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Ticket } from '@/lib/types';
import { TicketGridSkeleton } from './TicketSkeleton';

interface TicketGridProps {
  tickets: Ticket[];
  isLoading?: boolean;
}

export function TicketGrid({ tickets, isLoading }: TicketGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <TicketGridSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map((ticket) => (
        <Card key={ticket.id} className="h-full">
          {ticket.imageUrl && (
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
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
          <CardHeader>
            <h3 className="text-xl font-semibold line-clamp-1">{ticket.title}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-2">{ticket.description}</p>
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
          </CardContent>
          <CardFooter>
            <div className="flex justify-between items-center w-full">
              <span className="text-sm text-muted-foreground">
                For {ticket.userType}s
              </span>
              <span className="font-medium">
                ${ticket.price}
              </span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}