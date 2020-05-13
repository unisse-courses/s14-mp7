const ObjectID = require ('mongodb').ObjectID;

router.get('/', (req,res,next)=>{
  if(req.isAuthenticated())
  {
    res.redirect('/home');
  }

  const users= req.app.locals.users;
  const _id=ObjectID(req.session.passpoort.user);

  users.findOne({_id},(err,results)=>{
    if(err)
    {
      throw err;
    }
    res.render('account', {..results});
  });
});

module.exports =router;
