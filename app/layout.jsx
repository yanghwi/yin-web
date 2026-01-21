import "./globals.css";
import { HeaderNav } from "@/components/header-nav";
import { Footer } from "@/components/footer";

export const metadata = {
  title: {
    default: "Yin",
    template: "%s | Yin"
  },
  description: "A minimal blog."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
