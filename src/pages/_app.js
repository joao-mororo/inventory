import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import { SidebarProvider } from "../contexts/SidebarContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <SidebarProvider>
        {/* <Header /> */}
        <Component {...pageProps} />
      </SidebarProvider>
    </ChakraProvider>
  );
}

export default MyApp;
