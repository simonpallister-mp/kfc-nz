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

export default function Register({ setMpid, setLoggedIn, setEmail }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [emailAddress, setEmailAddress] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [mobile, setMobile] = useState("")

  const register = () => {
    mParticle.logEvent("Register", mParticle.EventType.Other)

    const currentUser = mParticle.Identity.getCurrentUser()
    currentUser.setUserAttribute("$firstname", firstName)
    currentUser.setUserAttribute("$lastname", lastName)

    const identityRequest = {
      userIdentities: {
        email: emailAddress,
        mobile_number: mobile,
        customerid: Math.floor(10000 + Math.random() * 90000).toString(),
      },
    }

    mParticle.Identity.modify(identityRequest, (response) => {
      console.log(response)
    })

    onClose()
  }

  return (
    <>
      <Button sx={ctaButtonStyle} onClick={onOpen}>
        Register
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl sx={formcontrolStyle}>
              <Input
                id="firstname"
                type="text"
                sx={inputStyle}
                placeholder="first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}></Input>
            </FormControl>
            <FormControl sx={formcontrolStyle}>
              <Input
                id="lastname"
                type="text"
                sx={inputStyle}
                placeholder="last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}></Input>
            </FormControl>
            <FormControl sx={formcontrolStyle}>
              <Input
                id="email"
                type="text"
                sx={inputStyle}
                placeholder="email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}></Input>
            </FormControl>
            <FormControl sx={formcontrolStyle}>
              <Input
                id="mobile"
                type="text"
                sx={inputStyle}
                placeholder="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}></Input>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button sx={ctaButtonStyle} mr={3} onClick={register}>
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
