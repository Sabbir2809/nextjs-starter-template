"use client";
import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Function to create a new QueryClient instance with default options
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Set queries to be fresh for 2 minute
        staleTime: 60 * 1000 * 2,
      },
    },
  });
}

// Function to get the appropriate QueryClient based on environment (server or client)
function getQueryClient() {
  // Initialize a variable to store a single QueryClient instance for the browser
  let browserQueryClient: QueryClient | undefined = undefined;

  if (isServer) {
    // If on the server, create a new QueryClient each time
    return makeQueryClient();
  } else {
    // If on the client, reuse the existing QueryClient instance or create a new one if none exists
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// Main provider component for TanStack React Query
export default function TanStackQueryProvider({ children }: React.PropsWithChildren) {
  // Retrieve the appropriate QueryClient instance
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Wrap children with QueryClientProvider */}
      {children}
    </QueryClientProvider>
  );
}
