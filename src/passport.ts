const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const passport = require('passport')

const JWT_SECRET_KEY = 'your_jwt_secret'

passport.use(new JWTStrategy({jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
secretOrKey:JWT_SECRET_KEY}, (jwtPayload, done) => {
    const user = jwtPayload.user
    return done(null, user)
}))

passport.serializeUser((user, done) => {
    done(null,user)
})

passport.deserializeUser((user, done) => {
    done(null,user)
})


export { passport, JWT_SECRET_KEY }