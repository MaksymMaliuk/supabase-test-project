import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Header } from "@/components/Header";
import { MenuItem } from "@/types/ui/Menu";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu: MenuItem[] = [
    { id: '1', title: 'Home', href: '/' },
    { id: '2', title: 'News', href: '/news' },
    { id: '3', title: 'Add News', href: '/add-news' },
  ]

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <Header menu={menu} />
        <main className="flex flex-col flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
