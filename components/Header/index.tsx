'use client'

import { MenuItem } from "@/types/ui/Menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import './index.css'

export const Header = ({ menu }: { menu: MenuItem[] }) => {
  const pathname = usePathname()

  return (
    <header className="header bg-background text-foreground">
      <nav>
        <ul className="flex gap-4 p-4">
          {menu.map((item) => (
            <li key={item.id} className={`list-none p-2 text-2xl hover:underline ${pathname === item.href ? 'active' : ''}`}>
              <Link href={item.href} >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}