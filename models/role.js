var Role=require('../common/mongo').Role;
var Authority=require('./authority');
var RAManager=require('./ramanager');
Role.plugin('addAuthorities',{
	afterFind:function(roles){
		return Promise.all(roles.map(function(role){
			return RAManager.getRAManagerByRoleId(role._id).then(function(ramanagers){
				var authorityIds="";
				ramanagers.map(function(ramanager){
					authorityIds+=ramanager.authorityId+",";
				});
				authorityIds=authorityIds.substring(0,authorityIds.length-1);
				role.authorityIds=authorityIds;
				return role;
			});
		}));
	},
	afterFindOne:function(role){
		if(role){
			return RAManager.getRAManagerByRoleId(role._id).then(function(ramanagers){
				var authorityIds="";
				ramanagers.map(function(ramanager){
					authorityIds+=ramanager.authorityId+",";
				});
				authorityIds=authorityIds.substring(0,authorityIds.length-1);
				role.authorityIds=authorityIds;
				return role;
			});
		}
		return role;
	}
});
module.exports={
	getRoles:function(){
		return Role.find().addCreatedAt().addAuthorities().exec();
	},
	getRoleByName:function(name){
		return Role.find({name:name}).addCreatedAt().addAuthorities().exec();
	},
	getRoleById:function(id){
		return Role.findOne({_id:id}).addCreatedAt().addAuthorities().exec();
	},
	createRole:function(role){
		return Role.create(role).exec();
	},
	updateRoleById:function(id,name){
		return Role.update({_id:id},{$set:{name:name}}).exec();
	},
	deleteRoleById:function(id){
		return Role.remove({_id:id}).exec();
	}
}
