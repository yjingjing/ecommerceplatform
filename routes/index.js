module.exports=function(app){
	app.get('/',function(req,res){
		res.redirect('/login');
	});
	app.use('/login',require('./login'));
	app.use('/logout',require('./logout'));
	app.use('/home',require('./home'));
	app.use('/authority',require('./authority'));
	app.use('/role',require('./role'));
	app.use('/catagory',require('./catagory'));
	app.use('/commodity',require('./commodity'));
	app.use('/updatepassword',require('./updatepassword'));
}
