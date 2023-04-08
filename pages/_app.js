import { ModalContext } from "@/context/modal.context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ModalContext>
      <Component {...pageProps} />
    </ModalContext>
  );
}
