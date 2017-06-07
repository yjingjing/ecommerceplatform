var express=require('express');
var router=express.Router();
var Catagory=require('../models/catagory');
router.get('/',function(req,res,next){
	Catagory.getCatagories().then(function(catagories){
		console.log('分类首页');
		res.render('catagory/index',{catagories:catagories});
	}).catch(next);
});
router.get('/add',function(req,res,next){
	res.render('catagory/add');
});
router.post('/add',function(req,res,next){
	var cname=req.fields.cname;
	var ename=req.fields.ename;
	Catagory.createCatagory({cname:cname,ename:ename}).then(function(){
		req.flash('success','添加成功');
		res.redirect('/catagory');
	}).catch(next);
});
router.get('/edit/:id',function(req,res,next){
	var id=req.params.id;
	Catagory.getCatagoryById(id).then(function(catagory){
		res.render('catagory/edit',{catagory:catagory});
	}).catch(next);
});
router.post('/edit',function(req,res,next){
	var id=req.fields.id;
	var cname=req.fields.cname;
	var ename=req.fields.ename;
	Commodity.updateCatagoryById(id,cname,ename).then(function(){
		req.flash('success','更新成功');
		res.redirect('/catagory');
	}).catch(next);
});
module.exports=router;
