import axios from "axios"
import cacheData from "memory-cache"

const handler = async (req, res) => {
  const AUTH_TOKEN = "AUTH_TOKEN"
  let token = cacheData.get(AUTH_TOKEN)

  if (!token) {
    const body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      audience: "https://api.mparticle.com",
      grant_type: "client_credentials",
    }

    const response = await axios.post("https://sso.auth.mparticle.com/oauth/token", JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    cacheData.put(AUTH_TOKEN, response.data.access_token, response.data.expires_in * 1000)
    token = response.data.access_token
  }

  const { mpid } = req.query

  if (!mpid) {
    res.status(200).json({})
    return
  }

  const profile = await axios
    .get(
      `https://api.mparticle.com/userprofile/v1/${process.env.ORG_ID}/${process.env.ACCOUNT_ID}/${process.env.WORKSPACE_ID}/${mpid}?fields=device_identities,user_identities,user_attributes,audience_memberships,attribution`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .catch((err) => {
      console.log(err)
      res.status(200).json({})
      return
    })

  res.status(200).json(profile.data)
}

export default handler
