module.exports.isLoggedIn = (req,res,next) =>{    
    if(!req.isAuthenticated()){
        //redirect URL
        req.session.redirectUrl = req.originalUrl;
        req.flash("Error", "Please login first!!");
        return res.redirect('/login');
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
