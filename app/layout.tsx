import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}