import type { ReactNode } from "react";

// Passthrough root layout — html/body provided by [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return children;
}
