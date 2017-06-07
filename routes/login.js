var express=require('express');
var router=express.Router();
var sha1=require('sha1');
var AdminModel=require('../models/admins');
var Authority=require('../models/authority');
router.get('/',function(req,res,next){
	res.render('login');
});
router.post('/',function(req,res,next){
	var name=req.fields.adminname;
	var password=req.fields.password;
	AdminModel.getAdminByName(name).then(function(admin){
		if(!admin){
			req.flash('error','用户名不存在');
			res.redirect('back');
		}
		if(sha1(password)!==admin.password){
			req.flash('error','用户名或密码错误');
			res.redirect('back');
		}
		req.flash('success','登陆成功');
		delete admin.password;
		req.session.admin=admin;
		Authority.getAuthorities().then(function(authorities){
//			req.flash('menus',authorities);
			req.session.menus=authorities;
			res.redirect('/home');
		}).catch(next);
	}).catch(next);
});
module.exports=router;
