var express=require('express');
var router=express.Router();
router.get('/',function(req,res,next){
	req.session.admin=null;
	req.flash('success','退出成功');
	res.redirect('/login');
});
module.exports=router;
