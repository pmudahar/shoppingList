var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
  console.log('hello');
  passport.use(new GoogleStrategy({
      clientID: '407725327216-7bduma9qqbkpd70hm5fm42c488ag0vn5.apps.googleusercontent.com',
      clientSecret: '9FwmZ-02EWMmFIbtjVQnz_bd',
      callbackURL: 'http://localhost:9000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'google.id': profile.id
      }, function(err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'google',
            google: profile._json
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          console.log('user ', user);
          return done(err, user);
        }
      });
    }
  ));
};
