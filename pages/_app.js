import "@/styles/globals.css"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Exo_2 } from "next/font/google"

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#e4002b",
      secondary: "#202124",
    },
  },
  fonts: {
    body: exo2.style.fontFamily,
    heading: exo2.style.fontFamily,
  },
  components: {
    Button: {
      bg: "brand.primary",
    },
  },
})

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
