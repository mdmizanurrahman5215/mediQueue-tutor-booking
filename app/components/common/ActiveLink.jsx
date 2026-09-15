
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ActiveLink({ href, children, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-600 text-white font-semibold'
          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {children}
    </Link>
  );
}