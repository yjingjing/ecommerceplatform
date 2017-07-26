var Commodity=require('../common/mongo').Caommodity;
var Catagory=require('./catagory');
Commodity.plugin('addCatagoryName',{
	afterFind:function(commodities){
		return Promise.all(commodities.map(function(commodity){
			return Catagory.getCatagoryById(commodity.catagory).then(function(catagory){
				commodity.catagoryName=catagory.cname;
				return commodity;
			});
		}));
	},
	afterFindOne:function(commodity){
		if(commodity){
			return Catagory.getCatagoryById(commodity.catagory).then(function(catagory){
				commodity.catagoryName=catagory.cname;
				return commodity;
			});
		}
		return commodity;
	}
});
module.exports={
	createCommodity:function(commodity){
		return Commodity.create(commodity).exec();
	},
	getCommodities:function(page){
		return Commodity.find().skip(page*1).limit(1).addCreatedAt().addCatagoryName().exec();
	},
	getCommoditiesCount:function(){
		return Commodity.count().exec();
	},
	getCommodityById:function(id){
		return Commodity.findOne({_id:id}).addCreatedAt().addCatagoryName().exec();
	},
	updateCommodityById:function(id,obj){
		return Commodity.update({_id:id},{$set:obj}).exec();
	}
};
