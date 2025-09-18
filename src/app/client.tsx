"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
const trpc = useTRPC();
// prefetch and client must have smae query components 
const {data} = useSuspenseQuery(trpc.createAI.queryOptions({text: 'Hello'}))
return(
    <div>
        {JSON.stringify(data)}
    </div>
)
};