var express=require('express');
var router=express.Router();
var Role=require('../models/role');
var Authority=require('../models/authority');
var RAManager=require('../models/ramanager');
router.get('/',function(req,res,next){
	Role.getRoles().then(function(roles){
		res.render('role/index',{roles:roles});
	}).catch(next);
});
router.get('/add',function(req,res,next){
	res.render('role/add');
});
router.post('/add',function(req,res,next){
	var name=req.fields.name;
	Role.createRole({name:name}).then(function(result){
		req.flash("success","角色添加成功");
		res.redirect('/role');
	}).catch(next);
});
router.get('/edit/:id',function(req,res,next){
	var id=req.params.id;
	Role.getRoleById(id).then(function(role){
		res.render('role/edit',{role:role});
	});
});
router.post('/edit',function(req,res,next){
	var id=req.fields.id;
	var name=req.fields.name;
	console.log(name);
	console.log(id);
	Role.updateRoleById(id,name).then(function(){
		res.redirect('/role');
	});
});
router.get('/delete/:id',function(req,res,next){
	var id=req.params.id;
	Role.deleteRoleById(id).then(function(){
		res.redirect('/role');
	});
});
router.get('/distribute/:id',function(req,res,next){
	var roleId=req.params.id;
	Authority.getAuthorities().then(function(allAuthorities){
		Role.getRoleById(roleId).then(function(role){
			res.render("role/distribute",{role:role,allAuthorities:allAuthorities});
		});
	}).catch(next);
});
router.post('/distribute',function(req,res,next){
	var roleId=req.fields.roleId;
	RAManager.deleteRAManagerByRoleId(roleId);
	for(var i in req.fields){
		if(i!=="roleId"){
			RAManager.createRAManager({
				roleId:roleId,
				authorityId:req.fields[i]
			});
		}
	}
	res.redirect('/role');
});
module.exports=router;
