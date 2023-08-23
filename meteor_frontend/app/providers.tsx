"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";

import { ThemeProvider } from "next-themes";
import Header from "./components/header";
import SubHeader from "./components/subheader";
import Loading from "./(general)/loading";
import Footer from "./components/footer";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // TODO: DRY

  if (!mounted)
    return (
      <>
        <Header />
        <SubHeader />
        <Suspense fallback={<Loading />}>
          <main className="flex flex-1 bg-gray-100">
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </main>
        </Suspense>
        <Footer />
      </>
    );

  return (
    <ThemeProvider attribute="class">
      <Header />
      <SubHeader />
      <Suspense fallback={<Loading />}>
        <main className="flex flex-1 bg-gray-100 dark:bg-dark">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </main>
      </Suspense>
      <Footer />
    </ThemeProvider>
  );
}
