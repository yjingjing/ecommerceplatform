var Role=require('../common/mongo').Role;
var Authority=require('../common/mongo').Authority;
var RAManager=require('../common/mongo').RAManager;
module.exports={
	getRAManagerByAuthorityId:function(authorityId){
		return RAManager.find({authorityId:authorityId}).addCreatedAt().exec();
	},
	getRAManagerByRoleId:function(roleId){
		return RAManager.find({roleId:roleId}).addCreatedAt().exec();
	},
	createRAManager:function(ramanager){
		return RAManager.create(ramanager).exec();
	},
	deleteRAManagerByRoleId:function(roleId){
		return RAManager.remove({roleId:roleId}).exec();
	}
}
