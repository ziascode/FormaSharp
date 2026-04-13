import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FaustProvider } from "@faustwp/core";
import Layout from "@/components/Layout";
import {
  Boldonse,
  Bricolage_Grotesque,
  Gudea,
  Poppins,
  Public_Sans,
  Questrial,
  Zen_Dots,
} from "next/font/google";
import { useRouter } from "next/router";
import "../../faust.config";

const boldonse = Boldonse({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-boldonse",
});

const bricolageGrotesque = Bricolage_Grotesque({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  axes: ["opsz"],
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const publicSans = Public_Sans({
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-questrial",
});

const gudea = Gudea({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gudea",
});

const zenDots = Zen_Dots({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zen-dots",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <div
        className={`${boldonse.variable} ${bricolageGrotesque.variable} ${poppins.variable} ${publicSans.variable} ${questrial.variable} ${gudea.variable} ${zenDots.variable}`}
      >
        <Layout>
        <Component {...pageProps} key={router.asPath} />
        </Layout>
      </div>
    </FaustProvider>
  );
}
