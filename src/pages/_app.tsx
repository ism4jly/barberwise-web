import type { AppProps } from "next/app";
import { Provider } from "../components/ui/provider";

import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
