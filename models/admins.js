var Admin=require('../common/mongo').Admin;
module.exports={
	getAdminByName:function(name){
		return Admin.findOne({name:name}).addCreatedAt().exec();
	},
	updateAdminByName:function(name,obj){
		return Admin.update({name:name},{$set:obj}).exec();
	}
}
