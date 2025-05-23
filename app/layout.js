import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pathway Infinity - Career Guidance Questionnaire",
  description: "Find your ideal career path through our guided questionnaire",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-nunito" suppressHydrationWarning={true}>
        <Navbar />
        <main className="flex-grow relative pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
