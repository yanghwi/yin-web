import "./globals.css";
import { HeaderNav } from "@/components/header-nav";
import { Footer } from "@/components/footer";

export const metadata = {
  title: {
    default: "Yin",
    template: "%s | Yin"
  },
  description: "A minimal single-column blog inspired by UrlAhmed."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <HeaderNav />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
