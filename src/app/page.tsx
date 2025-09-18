import { trpc, getQueryClient } from '@/trpc/server';
import { dehydrate,HydrationBoundary } from '@tanstack/react-query';
import { Client } from './client';
import { Suspense } from 'react';
const Page = async () => {
  // we will implement prefetch operations here
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.createAI.queryOptions({text: 'Hello'}));


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <Client />
      </Suspense>
      </HydrationBoundary>
    
  );
}
export default Page;