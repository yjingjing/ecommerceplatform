var express=require('express');
var session=require('express-session');
var config=require('config-lite')(__dirname);
var MongoStore=require('connect-mongo')(session);
var flash=require('connect-flash');
var path=require('path');
var route=require('./routes');
var app=express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
	name:config.name,
	secret:config.secret,
	resave:true,
	saveUninitialized:false,
	cookie:{
		maxAge:config.maxAge
	},
	store:new MongoStore({
		url:config.mongodb
	})
}));
app.use(flash());
//处理表单及文件上传的中间件
app.use(require('express-formidable')({
	//上传文件目录
	uploadDir:path.join(__dirname,'public/images'),
	//保留后缀
	keepExtensions:true
}));
app.use(function(req,res,next){
	res.locals.admin=req.session.admin;
	res.locals.success=req.flash('success').toString();
	res.locals.error=req.flash('error').toString();
	res.locals.role=req.flash('role');
	res.locals.ramanagers=req.flash('ramanagers');
//	res.locals.menus=req.flash('menus');
	res.locals.menus=req.session.menus;
	next();
});
route(app);
app.listen(9090,function(){
	console.log('服务器启动成功');
});
