import { QueryClient, QueryClientProvider } from "react-query";
import SDKProvider from "../contexts/sdk";
import "../styles/globals.css";

const client = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <SDKProvider>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SDKProvider>
  );
}
