require("dotenv").config();

module.exports = {
  auth: {
    clientId: process.env.B2C_CLIENT_ID,
    authority: `https://${process.env.B2C_TENANT_NAME}.b2clogin.com/${process.env.B2C_TENANT_NAME}.onmicrosoft.com/${process.env.B2C_POLICY_NAME}`,
    clientSecret: process.env.B2C_CLIENT_SECRET,
  },
  tokenRequest: {
    scopes: ["https://graph.microsoft.com/.default"],
  },
};
