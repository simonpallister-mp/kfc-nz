import { Container, Button, Flex } from "@chakra-ui/react"
import { formcontrolStyle, inputStyle, ctaButtonStyle } from "../styles/brand"
import mParticle from "@mparticle/web-sdk"

export default function Consent() {
  const allowMarketing = () => {
    const user = mParticle.Identity.getCurrentUser()
    const consentObject = mParticle.Consent.createGDPRConsent(
      true,
      Date.now(),
      "marketing_v1",
      "Head Office Location",
      mParticle.getDeviceId().toString()
    )
    const consentState = mParticle.Consent.createConsentState()
    consentState.addGDPRConsentState("marketing", consentObject)
    user.setConsentState(consentState)
  }

  const allowAnalytics = () => {
    // const user = mParticle.Identity.getCurrentUser()
    // const consentObject = mParticle.Consent.createGDPRConsent(
    //   true,
    //   Date.now(),
    //   "analytics_v1",
    //   "Head Office Location",
    //   mParticle.getDeviceId()
    // )
    // const consentState = mParticle.Consent.createConsentState()
    // consentState.addGDPRConsentState("analytics", consentObject)
    // user.setConsentState(consentState)
  }

  return (
    <Container mt="5" mb="5">
      <Flex direction="row" p="0" mb="5" mt="5" gap="3">
        <Button sx={ctaButtonStyle} onClick={allowMarketing}>
          Allow Marketing Consent
        </Button>
        <Button sx={ctaButtonStyle} onClick={allowAnalytics}>
          Allow Analytics Consent
        </Button>
      </Flex>
    </Container>
  )
}
