import { MainLayout } from '@/components/layout';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface AboutProps {}

export default function About(props: AboutProps) {
  const router = useRouter();
  const gotoHome = () => {
    router.push('/');
  };
  return (
    <div>
      About Page
      <button onClick={gotoHome}>Go to Home Page</button>
    </div>
  );
}

About.Layout = MainLayout;
