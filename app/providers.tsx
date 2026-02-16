'use client';

import { HeroUIProvider, Toast } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toast.Provider placement="bottom end" />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
