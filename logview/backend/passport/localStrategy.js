const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  userRepository = require("../domains/postgres/repositories/userRepository");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userRepository
    //need to implement method in User Repo
    .findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      session: true
    },
    (username, password, done) => {
      userRepository.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Wrong username" });
        //need to implement method in userService - validPassword
        if (!user.validPassword(password))
          return done(null, false, { message: "Wrong password" });
        return done(null, user);
      });
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    (req, username, password, done) => {}
  )
);
