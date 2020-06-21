const JWT = require("jsonwebtoken");
const User = require("../models/user");
const Meeting = require("../models/meeting");
const { JWT_SECRET } = require("../configuration");

signToken = user => {
  return JWT.sign(
    {
      iss: "Dev_uh",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, username, post } = req.value.body;

    let foundUser = await User.findOne({ email: email });
    if (foundUser) {
      let checkforlocal = await foundUser.methods.includes("local");
      if (!checkforlocal) {
        foundUser.methods.push("local");
        foundUser.username = username;
        if (!foundUser.post) {
          foundUser.post = post;
        }
        foundUser.local = {
          password: password
        };
        await foundUser.save();

        res.status(200).json({ success: true });
      } else {
        res.status(403).json({ message: "account already exist" });
      }
    } else {
      const newUser = new User({
        methods: ["local"],
        username: username,
        post: post,
        email: email,
        local: {
          password: password
        }
      });

      await newUser.save();

      res.status(200).json({ success: true });
    }
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.cookie("access_token", token, {
      httpOnly: true
    });
    res.status(200).json({ success: true, token: token, userdetail: req.user });
  },

  signOut: async (req, res, next) => {
    res.clearCookie("access_token");

    res.json({ success: true });
  },

  googleOAuthsignin: async (req, res, next) => {
    if (req.body.googleId) {
      let existingUser = await User.findOne({ "google.id": req.body.googleId });

      if (existingUser) {
        const token = signToken(existingUser);
        res.cookie("access_token", token, {
          httpOnly: true
        });

        return res.status(200).json({ success: true, user: existingUser });
      }
    }

    return res.status(404).json({ error: "Account Not Found" });
  },

  googleOAuthsignup: async (req, res, next) => {
    if (req.body.googleId) {
      let existingUser = await User.findOne({ "google.id": req.body.googleId });
      if (!existingUser) {
        existingUser = await User.findOne({
          email: req.body.email
        });

        if (existingUser) {
          // We want to merge google's data with local auth
          let checkforgoogle = existingUser.methods.includes("google");
          if (!checkforgoogle) {
            if (!existingUser.pic) {
              existingUser.pic = req.body.imageUrl;
            }
            existingUser.methods.push("google");

            existingUser.google = {
              id: req.body.googleId
            };
            await existingUser.save();

            return res.status(200).json({ success: true, user: existingUser });
          } else {
            return res.status(403).json({ message: "account already exist" });
          }
        } else {
          const existingUser = new User({
            methods: ["google"],
            post: req.body.post,
            pic: req.body.imageUrl,
            username: req.body.name,
            email: req.body.email,
            google: {
              id: req.body.googleId
            }
          });
          await existingUser.save();
          return res.status(200).json({ success: true, user: existingUser });
        }
      }
    }
    if (!req.body.googleId) {
      return res.status(404).json({ error: "Something Went Wrong" });
    }
    return res.status(403).json({ error: "Account Already Register" });
  },

  updateuser: async (req, res, next) => {
    const data = await User.findById(req.user._id);
    data.username = req.body.username;
    data.local.password = req.body.password;

    const result = await data.save();
    console.log(result);
    res.status(200).json({
      success: true
    });
  },

  checkAuth: async (req, res, next) => {
    res.json({ success: true, data: req.user.pic });
  },
  getmeeting: async (req, res, next) => {
    if (req.user.post === "mentor") {
      const meeting = await Meeting.find({ mentor: req.user._id }).select(
        "_id title with from to"
      );
      let datatobesend = meeting.map(async v => {
        let user = await User.findById(v.with).select("-_id username");
        return {
          _id: v._id,
          title: v.title,
          with: user.username,
          from: v.from,
          to: v.to
        };
      });
      datatobesend = await Promise.all(datatobesend);
      res.status(200).json(datatobesend);
    } else {
      const meeting = await Meeting.find({ with: req.user._id }).select(
        "-_id title mentor from to"
      );
      console.log("meeting :", meeting);
      let datatobesend = meeting.map(async v => {
        let user = await User.findById(v.mentor).select("-_id username");
        return { title: v.title, with: user.username, from: v.from, to: v.to };
      });

      datatobesend = await Promise.all(datatobesend);
      console.log("datatobesend :", datatobesend);
      res.status(200).json(datatobesend);
    }
  },
  postmeeting: async (req, res, next) => {
    const data = new Meeting({
      date: req.body.date,
      title: req.body.title,
      mentor: req.body.mentor,
      with: req.body.with,
      from: req.body.from,
      to: req.body.to
    });
    await data.save();

    res.status(200).json({ success: true });
  },
  profile: async (req, res, next) => {
    res.json({ data: req.user });
  },
  getallemployes: async (req, res, next) => {
    const data = await User.find();
    res.status(200).json({ data });
  },
  deletemeeting: async (req, res, next) => {
    const deldata = await Meeting.deleteOne({ _id: req.body.delid });

    console.log(deldata);
    res.status(200).json({ success: true });
  },
  addlinkedinprofile: async (req, res, next) => {
    let profile = req.user;

    if (profile.id) {
      let existingUser = await User.findOne({ "linkedin.id": profile.id });
      if (!existingUser) {
        existingUser = await User.findOne({
          email: profile.emails[0].value
        });

        if (existingUser) {
          // We want to merge google's data with local auth
          let checkforlinkedin = existingUser.methods.includes("linkedin");
          if (!checkforlinkedin) {
            if (!existingUser.pic) {
              existingUser.pic = profile.photos[0].value;
            }
            existingUser.methods.push("linkedin");

            existingUser.linkedin = {
              id: profile.id
            };
            await existingUser.save();
            return res.redirect(
              200,
              "http://localhost:3000/signup?valu=sucessfull"
            );
            //! return res.status(200).json({ success: true, user: existingUser });
          } else {
            return res.status(403).json({ message: "account already exist" });
          }
        } else {
          const existingUser = new User({
            methods: ["linkedin"],

            pic: profile.photos[0].value,
            username: profile.displayName,
            email: profile.emails[0].value,
            post: "mentee",
            linkedin: {
              id: profile.id
            }
          });
          await existingUser.save();
          return res.redirect(
            200,
            "http://localhost:3000/signup?valu=sucessfull"
          );
          //!return res.status(200).json({ success: true, user: existingUser });
        }
      }
    }
    if (!profile.id) {
      return res.redirect(403, "http://localhost:3000/signup?valu=unsccessful");
    }
    return res.redirect(403, "http://localhost:3000/signup?valu=unsccessful");
  },
  checklinkedinprofile: async (req, res, next) => {
    let profile = req.user;
    if (profile.id) {
      let existingUser = await User.findOne({
        "linkedin.id": profile.id
      });

      if (existingUser) {
        const token = signToken(existingUser);
        res.cookie("access_token", token, {
          httpOnly: true
        });

        return res.redirect(
          200,
          "http://localhost:3000/signin?valu=sucessfull"
        );
      }
    }

    return res.redirect(403, "http://localhost:3000/signin?valu=unsccessful");
  }
};
