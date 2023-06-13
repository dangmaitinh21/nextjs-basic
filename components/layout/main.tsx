import * as React from 'react';
import Link from 'next/link';
import { LayoutProps } from '@/models';

export function MainLayout({ children }: LayoutProps) {
  React.useEffect(() => {
    console.log('mouting Main Layout');
    return () => console.log('unmouting Main Layout');
  }, []);
  return (
    <div>
      <h1>Main Layout</h1>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <div>{children}</div>
    </div>
  );
}
