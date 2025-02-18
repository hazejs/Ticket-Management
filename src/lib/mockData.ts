import { Ticket } from './types';

const locations = [
  'New York City, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Miami, FL',
  'Austin, TX',
];

const eventTypes = [
  'Concert',
  'Theater Show',
  'Sports Event',
  'Comedy Night',
  'Art Exhibition',
];

const images = [
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
];

function generateTicket(id: number): Ticket {
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const imageUrl = images[Math.floor(Math.random() * images.length)];
  const userType = Math.random() > 0.5 ? 'local' : 'tourist';
  
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 30));

  return {
    id: id.toString(),
    title: `${eventType} in ${location}`,
    description: `Experience an amazing ${eventType.toLowerCase()} in the heart of ${location}. Don't miss this incredible event!`,
    date: date.toISOString(),
    location,
    userType,
    imageUrl,
    price: Math.floor(Math.random() * 150) + 50,
    category: eventType,
  };
}

export const mockTickets = Array.from({ length: 100 }, (_, i) => generateTicket(i + 1));