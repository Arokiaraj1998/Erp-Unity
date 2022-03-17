const jwt = require('jsonwebtoken');
require('dotenv').config();

function GenerateUserToken(email, userId){
    try{
        const token = jwt.sign({email:email, userId : userId}, process.env.JWT_SECERT_KEY, {expiresIn: 86400});
        return token;
    }
    catch(ex){
        return "";
    }    
}

module.exports = {
    generateUserToken : GenerateUserToken
}
