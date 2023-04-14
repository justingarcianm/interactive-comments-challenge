import { StateProvider } from "@/context/global.context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}
