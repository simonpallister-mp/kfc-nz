import { Container, Box, Text, Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react"
import { useState } from "react"

export default function SDK({ mpid, email, loggedIn, deviceApplicationStamp }) {
  return (
    <Box borderWidth="1px" p="5" mt="5" w="full">
      <Container>
        <Text as="h2" fontSize="24px" color="#e0004d" fontWeight="bold">
          mParticle Web SDK
        </Text>
        <Stat>
          <StatLabel>mPID</StatLabel>
          <StatNumber fontSize="3xl">{mpid}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Device Application Stamp</StatLabel>
          <StatNumber fontSize="xl">{deviceApplicationStamp}</StatNumber>
        </Stat>
        <StatGroup>
          <Stat>
            <StatLabel>Logged In</StatLabel>
            <StatNumber>{loggedIn ? "Yes" : "No"}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Email Address</StatLabel>
            <StatNumber>{email}</StatNumber>
          </Stat>
        </StatGroup>
      </Container>
    </Box>
  )
}
