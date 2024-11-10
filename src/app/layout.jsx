import Navbar from "@/components/Navigation Bar/Navbar";
import "./globals.css";
import Promo from "@/components/Banner/Promo";
import Footer from "@/components/Navigation Bar/Footer";

export const metadata = {
  title: "The Buncitman",
  description: "Coffe Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Promo />
        <Navbar />
        {children}
        <Footer />  
      </body>
    </html>
  );
}
