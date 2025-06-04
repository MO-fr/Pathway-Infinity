import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "./globals.css";

import { NextAuthProvider } from "@/components/NextAuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3001}`,
  title: {
    template: '%s | Pathway Infinity',
    default: 'Pathway Infinity - Career Guidance Questionnaire',
  },
  description: "Find your ideal career path through our guided questionnaire and discover trade schools that match your interests.",
  keywords: ['career guidance', 'trade schools', 'vocational training', 'career paths', 'skills assessment'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-nunito" suppressHydrationWarning={true}>
        <NextAuthProvider>
          <Navbar />
          <main className="flex-grow relative pt-16 md:pt-20">{children}</main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
