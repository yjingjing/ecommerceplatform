var Catagory=require('../common/mongo').Catagory;
module.exports={
	getCatagories:function(){
		return Catagory.find().sort({_id:1}).addCreatedAt().exec();
	},
	getCatagoryById:function(id){
		return Catagory.findOne({_id:id}).addCreatedAt().exec();
	},
	updateCatagoryById:function(id,cname,ename){
		return Catagory.update({_id:id},{$set:{cname:cname,ename:ename}}).exec();
	},
	createCatagory:function(catagory){
		return Catagory.create(catagory).exec();
	}
};
