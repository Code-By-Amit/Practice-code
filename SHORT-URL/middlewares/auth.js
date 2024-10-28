const { getUser } = require('../service/auth.js')

function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    if(!tokenCookie) return next();
    const user = getUser(tokenCookie);
    req.user = user;
   return next();
}

function restrictToUser(roles = []){
    return function(req,res,next){
        if(!req.user) return res.redirect('/login');
        if(!req.user.role) return res.end('UnAuthorized') ;
        return next();
    }
}
module.exports = {
    checkForAuthentication,
    restrictToUser
}
// async function restrictToLoggedInUser(req, res, next) {
//     const userUid = req.cookies?.uid;
 
//     if(!userUid) return res.redirect('/login');
//     let user = getUser(userUid);

//     if(!user) return res.redirect('/login');
//     req.user = user;
//     next()
// }

// async function checkAuth(req,res,next){
//     const userUid = req.cookies?.uid;

//     let user = getUser(userUid)
//     req.user = user;
//     next()
// }
// module.exports = {
    // restrictToLoggedInUser,
    // checkAuth
// }