var express=require('express');
var router=express.Router();
var path=require('path');
var fs=require('fs');
var Commodity=require('../models/commodity');
var Catagory=require('../models/catagory');
router.get('/',function(req,res,next){
	res.redirect('/commodity/0');
});
router.get('/:pageNum',function(req,res,next){
	var pageNum=req.params.pageNum;
	Commodity.getCommodities(pageNum).then(function(commodities){
		Commodity.getCommoditiesCount().then(function(count){
			var totalPage=Math.ceil(count/5);
			res.render('commodity/index',{
				commodities:commodities,
				pageNum:pageNum,
				isFirstPage:pageNum==0,
				isLastPage:(pageNum+1)==totalPage,
				totalPage:totalPage
			});
		});
	}).catch(next);
});
router.get('/add',function(req,res,next){
	Catagory.getCatagories().then(function(catagories){
		res.render('commodity/add',{catagories:catagories});
	}).catch(next);
});
router.post('/add',function(req,res,next){
	var name=req.fields.name;
	var price=req.fields.price;
	var stockNum=req.fields.stockNum;
	var catagory=req.fields.catagory;
	var remainTime=req.fields.remainTime;
	var discount=req.fields.discount;
	var imgSrc=req.files.imgSrc.path.split(path.sep).pop();
	var brandName=req.fields.brandName;
	var commodityCode=req.fields.commodityCode;
	var commodityWeight=parseFloat(req.fields.commodityWeight);
	var commodityLocation=req.fields.commodityLocation;
	try{
		if(!(name.length>=1 && name.length<=64)){
			throw new Error('商品名字请限制再1-32个字符');
		}
		if(!(req.files.imgSrc.name)){
			throw new Error('缺少商品图片');
		}
	}catch(e){
		//注册失败，异步删除上传的头像
		fs.unlink(req.files.imgSrc.path);
		req.flash('error',e.message);
		return res.redirect('/add');
	}
	var commodity={
		name:name,
		price:parseInt(price),
		stockNum:parseInt(stockNum),
		catagory:catagory,
		remainTime:parseInt(remainTime),
		discount:parseInt(discount),
		imgSrc:imgSrc,
		brandName:brandName,
		commodityCode:commodityCode,
		commodityWeight:commodityWeight,
		commodityLocation:commodityLocation
	}
	Commodity.createCommodity(commodity).then(function(){
		res.redirect('/commodity');
	}).catch(function(e){
		fs.unlink(req.files.imgSrc.path);
		next(e);
	});
});
router.get('/edit/:id',function(req,res,next){
	var id=req.params.id;
	Commodity.getCommodityById(id).then(function(commodity){
		Catagory.getCatagories().then(function(catagories){
			res.render('commodity/edit',{commodity:commodity,catagories:catagories});
		});
	}).catch(next);
});
router.post('/edit',function(req,res,next){
	var id=req.fields.id;
	var name=req.fields.name;
	var price=parseFloat(req.fields.price);
	var stockNum=parseInt(req.fields.stockNum);
	var catagory=req.fields.catagory;
	var remainTime=parseInt(req.fields.remainTime);
	var discount=parseInt(req.fields.discount);
	var imgSrc=req.files.imgSrc.path.split(path.sep).pop();
	console.log(imgSrc);
	var brandName=req.fields.brandName;
	var commodityCode=req.fields.commodityCode;
	var commodityWeight=parseFloat(req.fields.commodityWeight);
	var commodityLocation=req.fields.commodityLocation;
	var obj={
		name:name,
		price:price,
		stockNum:stockNum,
		catagory:catagory,
		remainTime:remainTime,
		discount:discount,
		imgSrc:imgSrc,
		brandName:brandName,
		commodityCode:commodityCode,
		commodityWeight:commodityWeight,
		commodityLocation:commodityLocation
	};
	Commodity.updateCommodityById(id,obj).then(function(){
		res.redirect('/commodity');
	}).catch(function(e){
		fs.unlink(req.files.imgSrc.path);
		next(e);
	});
});
module.exports=router;
