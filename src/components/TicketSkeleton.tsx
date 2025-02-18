import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function TicketGridSkeleton() {
  return (
    <Card className="h-full">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-20" />
      </CardFooter>
    </Card>
  );
}

export function TicketListSkeleton() {
  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <Skeleton className="h-24 w-24 flex-shrink-0 rounded-lg" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}