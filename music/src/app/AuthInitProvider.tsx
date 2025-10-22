'use client';

import { useAuthInit } from '@/hooks/useAuthInit';

export default function AuthInitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthInit();
  return <>{children}</>;
}
