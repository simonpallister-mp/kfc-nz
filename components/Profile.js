import { Container, Box, Text, Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react"
import { formcontrolStyle, inputStyle, ctaButtonStyle } from "../styles/brand"
import mParticle from "@mparticle/web-sdk"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Profile({ profile, email }) {
  console.log(profile)
  return (
    <Box borderWidth="1px" p="5" mt="5" w="full">
      <Container>
        <Text as="h2" fontSize="24px" color="#e0004d" fontWeight="bold">
          <a target="_blank" href={`/api/profile?mpid=${profile.mpid}`}>
            mParticle Profile API
          </a>
        </Text>
        <StatGroup>
          <Stat>
            <StatLabel>First Name</StatLabel>
            <StatNumber>{profile.user_attributes ? profile.user_attributes.$firstname : ""}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Last Name</StatLabel>
            <StatNumber>{profile.user_attributes ? profile.user_attributes.$lastname : ""}</StatNumber>
          </Stat>
        </StatGroup>
        <StatGroup>
          <Stat>
            <StatLabel>Mobile</StatLabel>
            <StatNumber>{profile.user_attributes ? profile.user_attributes.$mobile : ""}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Recent Category</StatLabel>
            <StatNumber>{profile.user_attributes ? profile.user_attributes["recent Category"] : ""}</StatNumber>
          </Stat>
        </StatGroup>
      </Container>
    </Box>
  )
}
