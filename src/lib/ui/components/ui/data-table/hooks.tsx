'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useSortQuery = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [column, value] = searchParams.get('sort')?.split(':') ?? [];

  const createSortQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      const prevSort = params.get('sort');

      if (`${name}:ASC` === prevSort) {
        params.set('sort', `${name}:DESC`);
      } else if (`${name}:DESC` === prevSort) {
        params.delete('sort');
      } else {
        params.set('sort', `${name}:ASC`);
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  return {
    column,
    value,
    createSortQuery,
  };
};
