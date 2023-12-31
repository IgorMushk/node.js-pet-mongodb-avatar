const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const usersService = require('../../users/services/users');
const HttpError = require('../../common/models/HttpError');
const { JWT_SECRET } = require('../../common/constants/env');

class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
      }
    
    async register(payload){
        console.log('services-auth register :');
        console.log( payload);
        const { password, ...rest } = payload;
        console.log(rest);
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        const user = await usersService.createUser({
            ...rest,
            password: passwordHash,
        });
        console.log(user);
        //return payload;
        return user;
    };

    async login(payload) {
        const { email, password } = payload;
        const user = await usersService.findByEmail(email);
        console.log('user :', user);
    
        if (!user) {
          throw new HttpError(404, 'User not found!');
        }
    
        const arePasswordsEqual = await bcrypt.compare(password, user.password);
        if (!arePasswordsEqual) {
          throw new HttpError(401, 'Email and password does not match!');
        }
        
        const accessToken = jwt.sign(
          {
            sub: user._id,
            email: user.email,
          },
          JWT_SECRET,
          { expiresIn: 1200 },
        );

        const refreshToken = crypto.randomBytes(8).toString('base64');      
        console.log('services-auth :', accessToken, refreshToken);
        await this.usersService.updateUserById(user._id, { refreshToken });
    
        return {accessToken, refreshToken};
    }

    async refreshAccess(token) {
        if (!token) {
          throw new HttpError(401, 'Refresh token is invalid');
        }
        const user = await usersService.findUserByRefreshToken(token);
        if (!user) {
          throw new HttpError(401, 'Refresh token is invalid');
        }
    
        const accessToken = jwt.sign(
          {
            sub: user._id,
            email: user.email,
          },
          JWT_SECRET,
          { expiresIn: 120 },
        );
    
        const refreshToken = crypto.randomBytes(8).toString('base64');
        await this.usersService.updateUserById(user._id, { refreshToken });
    
        return {
          accessToken,
          refreshToken,
        };
      }

}

const authService = new AuthService(usersService);

module.exports = authService;
