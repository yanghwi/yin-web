"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNav() {
  const pathname = usePathname();
  const isBlogActive = pathname === "/blog" || pathname?.startsWith("/blog/");

  return (
    <header>
      <nav>
        <Link href="/" className="brand">
          Yin
        </Link>
        <ul>
          <li>
            <Link href="/blog" aria-current={isBlogActive ? "page" : undefined}>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
