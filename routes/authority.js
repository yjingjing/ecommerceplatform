var express=require('express');
var router=express.Router();
var AuthorityModel=require('../common/mongo').Authority;
var Authority=require('../models/authority');
router.get('/',function(req,res,next){
	Authority.getAuthorities().then(function(authorities){
		res.render('authority/index',{authorities:authorities});
	}).catch(next);
});
router.get('/add',function(req,res,next){
	res.render('authority/add');
});
router.post('/add',function(req,res,next){
	var name=req.fields.name;
	var url=req.fields.url;
	Authority.createAuthority({name:name,url:url}).then(function(result){
		req.flash('success','权限添加成功');
		res.redirect('/authority')
	}).catch(next);
});
router.get('/edit/:id',function(req,res,next){
	var id=req.params.id;
	Authority.getAuthorityById(id).then(function(authority){
		res.render('authority/edit',{authority:authority});
	});
});
router.post('/edit',function(req,res,next){
	var id=req.fields.id;
	var name=req.fields.name;
	var url=req.fields.url;
	Authority.updateAuthorityById(id,name,url).then(function(){
		req.flash('success','更新成功');
		res.redirect('/authority');
	}).catch(next);
});
module.exports=router;
