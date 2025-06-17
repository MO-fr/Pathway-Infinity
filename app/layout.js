import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "./globals.css";

import Footer from "@/components/Footer";
import NavigationHandler from "@/components/NavigationHandler";
import { NextAuthProvider } from "@/components/NextAuthProvider";

/**
 * Root layout component for Pathway Infinity
 * Provides app-wide structure and providers
 */

// eslint-disable-next-line no-undef
export const metadata = {
  metadataBase: new URL(process.env.VERCEL_URL
    // eslint-disable-next-line no-undef
    ? `https://${process.env.VERCEL_URL}`
    // eslint-disable-next-line no-undef
    : `http://localhost:${process.env.PORT || 3001}`),
  title: {
    template: '%s | Pathway Infinity',
    default: 'Pathway Infinity - Career Guidance Questionnaire',
  },
  description: "Find your ideal career path through our guided questionnaire and discover trade schools that match your interests.",
  keywords: ['career guidance', 'trade schools', 'vocational training', 'career paths', 'skills assessment'],
  openGraph: {
    title: 'Pathway Infinity - Career Guidance Questionnaire',
    description: 'Find your ideal career path through our guided questionnaire',
    url: 'https://pathway-infinity.vercel.app/',
    siteName: 'Pathway Infinity',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pathway Infinity',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col font-nunito" suppressHydrationWarning={true}>
        <NextAuthProvider>
          <NavigationHandler>
            {children}
          </NavigationHandler>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
