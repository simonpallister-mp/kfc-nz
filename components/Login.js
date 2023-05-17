import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react"
import { formcontrolStyle, inputStyle, ctaButtonStyle } from "../styles/brand"
import { useState } from "react"
import mParticle from "@mparticle/web-sdk"

export default function Login({ setMpid, setLoggedIn, setEmail }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [emailAddress, setEmailAddress] = useState("")

  const login = () => {
    const identityRequest = { userIdentities: { email: emailAddress } }

    console.log("identityRequest", identityRequest)
    mParticle.Identity.login(identityRequest, (result) => {
      const user = result.getUser()
      if (user) {
        console.log(user)
        console.log(user.getConsentState())
        console.log(user.getAllUserAttributes())
        setMpid(user.getMPID())
        setLoggedIn(true)
        setEmail(emailAddress)
      }
    })
    onClose()
  }

  return (
    <>
      <Button sx={ctaButtonStyle} onClick={onOpen}>
        Sign In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl sx={formcontrolStyle}>
              <Input
                id="customer_id"
                type="text"
                sx={inputStyle}
                placeholder="email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}></Input>
            </FormControl>
            <FormControl sx={formcontrolStyle}>
              <Input type="password" sx={inputStyle} placeholder="Enter password" defaultValue="password123"></Input>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button sx={ctaButtonStyle} mr={3} onClick={login}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
