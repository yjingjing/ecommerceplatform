var express=require('express');
var router=express.Router();
var Admin=require('../models/admins');
var sha1=require('sha1');
router.get('/',function(req,res,next){
	res.render('updatepassword');
});
router.post('/',function(req,res,next){
	var id=req.fields.id;
	var name=req.fields.name;
	var newpassword=req.fields.newpassword;
	var repassword=req.fields.repassword;
	try{
		if(newpassword.length<6){
			throw new Error('密码至少6个字符');
		}
		if(newpassword!==repassword){
			throw new Error('两次输入密码不一致');
		}
	}catch(e){
		req.flash('error',e.message);
		return res.redirect('/updatepassword');
	}
	var obj={password:sha1(newpassword)};
	Admin.updateAdminByName(name,obj).then(function(){
		res.redirect('/home');
	});
});
module.exports=router;
