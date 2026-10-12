import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import Document from '@/components/Document';

export const viewport: Viewport = { themeColor: '#FCFAF3' };

export default function MalayalamLayout({ children }: { children: ReactNode }) {
  return <Document lang="ml">{children}</Document>;
}
