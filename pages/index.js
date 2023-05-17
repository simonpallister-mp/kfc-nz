import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Inter } from "next/font/google"
import {
  Container,
  Card,
  Button,
  CardBody,
  CardFooter,
  SimpleGrid,
  Text,
  Flex,
  Box,
  FormControl,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Collapse,
  Spacer,
  CardHeader,
  Heading,
} from "@chakra-ui/react"
import products from "../data/products.json"
import { useEffect, useState } from "react"
import { formcontrolStyle, inputStyle, ctaButtonStyle } from "../styles/brand"
import Consent from "@/components/consent"
import SDK from "@/components/SDK"
import Login from "@/components/Login"
import Register from "@/components/Register"
import mParticle from "@mparticle/web-sdk"
import axios from "axios"
import Profile from "@/components/Profile"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [mpid, setMpid] = useState()
  const [memberNumber, setMemberNumber] = useState("n/a")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [profile, setProfile] = useState({ user_identities: [] })
  const [das, setDas] = useState("")
  const [customerid, setCustomerid] = useState("")
  const [audiences, setAudiences] = useState([])
  const [show, setShow] = useState(false)
  const [catalog, setCatalog] = useState(products)

  const handleToggle = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  const mParticleConfig = {
    isDevelopmentMode: true,
    logLevel: "verbose",
    identifyRequest: {},
    identityCallback: async function (result) {
      console.log("Identity Callback", result)
      console.log("Previous User", result.getPreviousUser())
      const user = result.getUser()
      if (user) {
        setMpid(user.getMPID())
      }
    },
  }

  useEffect(() => {
    mParticle.init("au1-824dc7faa3d95143873dc47f2d320eff", mParticleConfig)
    mParticle.logPageView("Home Page")
    setCatalog(
      products
        .sort(() => Math.random() - 0.5)
        .map((product) => {
          return mParticle.eCommerce.createProduct(
            product.name,
            product.sku,
            product.price,
            1,
            null,
            product.category,
            "KFC"
          )
        })
    )
  }, [])

  useEffect(() => {
    setCatalog(catalog.sort(() => Math.random() - 0.5))
    console.log(catalog)
    getProfile()
    setDas(mParticle.getDeviceId())
  }, [mpid])

  const getProfile = async () => {
    if (mpid) {
      const profile = await axios.get(`/api/profile?mpid=${mpid}`)
      setProfile(profile.data)
      if (profile.data?.audience_memberships) {
        setAudiences(
          profile.data.audience_memberships.map((aud) => {
            return aud.audience_name
          })
        )
      }
    }
  }

  const addToCart = (product) => {
    mParticle.eCommerce.logProductAction(
      mParticle.ProductActionType.AddToCart,
      mParticle.eCommerce.createProduct(
        product.name,
        product.sku,
        product.price,
        1,
        null,
        product.category,
        "KFC",
        product.position
      )
    )
  }

  const showCatalog = () => {
    let show_products = catalog

    if (profile.user_attributes) {
      if (profile.user_attributes["recent Category"]) {
        const category_products = products
          .filter((product) => product.category === profile.user_attributes["recent Category"])
          .slice(0, 5)
        show_products = [...category_products, ...show_products.slice(0, 5)].map((product, index) => ({
          ...product,
          position: index + 1,
        }))
      }
    } else {
      show_products = show_products.slice(0, 10).map((product, index) => ({ ...product, position: index + 1 }))
    }

    // const impressions_products = show_products.map((product) => {
    //   return mParticle.eCommerce.createProduct(
    //     product.name,
    //     product.sku,
    //     product.price,
    //     1,
    //     "",
    //     product.category,
    //     "KFC",
    //     product.position
    //   )
    // })

    // console.log(impressions_products)

    const impressions = mParticle.eCommerce.createImpression("Home Page", show_products)
    mParticle.eCommerce.logImpression(impressions)

    const display = show_products.map((product, index) => (
      <Card key={index}>
        <CardHeader textAlign="center" fontWeight="bold">
          {product.category}
        </CardHeader>
        <CardBody textAlign="center">
          <Image
            src={`https://static.kfc.co.nz/images/items/lg/${product.sku}.jpg`}
            width={250}
            height={250}
            alt={product.name}
          />
          {product.name} <Text fontWeight="bold">from ${(Math.round(product.price * 100) / 100).toFixed(2)}</Text>
        </CardBody>
        <CardFooter alignContent="center" fontWeight="bold">
          <Button sx={ctaButtonStyle} onClick={() => addToCart(product)}>
            Add
          </Button>
        </CardFooter>
      </Card>
    ))

    return display
  }

  const logout = () => {
    mParticle.Identity.logout({}, (response) => {
      setLoggedIn(false)
      setEmail("")
      const user = response.getUser()
      if (user) {
        setMpid(user.getMPID())
      }
    })
  }

  const softLogout = () => {
    setLoggedIn(false)
  }

  const register = () => {}

  return (
    <>
      <Head>
        <title>KFC NZ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="full" pt="5" as="div">
        <Container maxW="full" mb="10">
          <Flex>
            <Box>
              <Link href="/" onClick={handleToggle}>
                <Image src="/KFC_logo.svg.png" width="78" height="78" alt="KFC" />
              </Link>
            </Box>
            <Box padding="7" fontWeight="bold" fontSize="22">
              MENU
            </Box>
            <Box padding="7" fontWeight="bold" fontSize="22">
              DELIVERY DEALS
            </Box>
            <Box padding="7" fontWeight="bold" fontSize="22">
              FIND A KFC
            </Box>
            <Box padding="7" fontWeight="bold" fontSize="22">
              DEALS
            </Box>
            <Box padding="7" fontWeight="bold" fontSize="22">
              KFC FOR GOOD
            </Box>
            <Spacer />
            {loggedIn && (
              <Box>
                <Button onClick={logout} sx={ctaButtonStyle}>
                  Sign Out
                </Button>
              </Box>
            )}
            {loggedIn && (
              <Box>
                <Button onClick={softLogout} sx={ctaButtonStyle}>
                  Soft Sign Out
                </Button>
              </Box>
            )}
            {!loggedIn && (
              <Box>
                <Login setMpid={setMpid} setLoggedIn={setLoggedIn} setEmail={setEmail} />
                <Register setMpid={setMpid} setLoggedIn={setLoggedIn} setEmail={setEmail} />
              </Box>
            )}
          </Flex>
        </Container>
        {loggedIn && <Heading>Welcome, {profile.user_attributes.$firstname}</Heading>}
        <Collapse in={show}>
          <Flex direction="row" mt="5" mb="5" gap="3">
            <SDK mpid={mpid} email={email} loggedIn={loggedIn} deviceApplicationStamp={das} />
            <Profile profile={profile} email={email} />
          </Flex>
        </Collapse>

        <SimpleGrid columns={5} spacing={5}>
          {showCatalog()}
        </SimpleGrid>
        {/* <Consent /> */}
      </Container>
    </>
  )
}
