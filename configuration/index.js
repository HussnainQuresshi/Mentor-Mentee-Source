if (process.env.NODE_ENV === "test") {
  module.exports = {
    JWT_SECRET: "hellowjavaid",
    oauth: {
      google: {
        clientID:
          "",
        clientSecret: ""
      },
      facebook: {
        clientID: "number",
        clientSecret: "string"
      }
    }
  };
} else {
  module.exports = {
    JWT_SECRET: "hellojavaid",
    oauth: {
      google: {
        clientID:
          "",
        clientSecret: ""
      },
      facebook: {
        clientID: "number",
        clientSecret: "string"
      }
    }
  };
}
