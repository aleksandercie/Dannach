import { Montserrat } from "@next/font/google";
import { AnimatePresence } from "framer-motion";
import "../styles/globals.css";

const montserrat = Montserrat({
  weight: ["300", "400", "600", "900"],
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={`max-w-screen-2xl mx-auto ${montserrat.className}`}>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
    </div>
  );
}

export default MyApp;
