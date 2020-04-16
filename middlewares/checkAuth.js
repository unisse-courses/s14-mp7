exports.isLoggedIn = (req, res, next) => {
    if (req.session.Account) {
      return next();
    } else {
      res.redirect('/login');
    }
  };

  exports.isLoggedOut = (req, res, next) => {
    if (req.session.Account) {
      res.redirect('/');
    } else {
      return next();
    }
  };
