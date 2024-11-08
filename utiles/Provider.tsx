"use client"
import React, { useState } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function Provider({ children }: { children: React.ReactNode }) {
    const [client] = useState(new QueryClient())

    return (
        <>
            <QueryClientProvider client={client}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    )
}

export { Provider }