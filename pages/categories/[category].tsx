import { useRouter } from 'next/router';
import * as React from 'react';

export interface CategoryProps {}

export default function Category(props: CategoryProps) {
  const router = useRouter();
  return <div>Category {JSON.stringify(router.query)}</div>;
}
