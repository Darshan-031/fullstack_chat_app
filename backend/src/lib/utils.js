import jwt from "jsonwebtoken";

export const generateToken = (userId, res)=>{

    //genarating jwt token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    });

    //sending to user in a cookie( httpOnly cookie )
    res.cookie("jwt", token, {
        maxAge : 7 * 24 * 60 * 60 * 1000, //7days in ms
        httpOnly : true, // prevent xss attack cross-site scripting attacks
        sameSite : "strict", // CSRF attacks cross-site request forgery attacks
        secure : process.env.NODE_ENV !== "development", //if i am not in dev environment secure by https( true or false)
    });

    return token;
};
