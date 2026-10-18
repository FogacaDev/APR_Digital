import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "@/app/theme-provider";

function ThemedToaster() {
  const { resolved } = useTheme();
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      theme={resolved}
      toastOptions={{
        classNames: {
          toast: "font-sans",
        },
      }}
    />
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <ThemedToaster />
    </ThemeProvider>
  );
}
