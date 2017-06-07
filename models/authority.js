var Authority=require('../common/mongo').Authority;
var RAManager=require('./ramanager');
Authority.plugin('addRoleIds',{
	afterFind:function(authorities){
		return Promise.all(authorities.map(function(authority){
			return RAManager.getRAManagerByAuthorityId(authority._id).then(function(ramanagers){
				var roleIds="";
				ramanagers.map(function(ramanager){
					roleIds=ramanager.roleId+",";
				});
				roleIds=roleIds.substring(0,roleIds.length-1);
				authority.roleIds=roleIds;
				return authority;
			});
		}));
	},
	afterFindOne:function(authority){
		if(authority){
			return RAManager.getRAManagerByAuthorityId(authority._id).then(function(ramanagers){
				var roleIds="";
				ramanagers.map(function(ramanager){
					roleIds=ramanager.roleId+",";
				});
				roleIds=roleIds.substring(0,roleIds.length-1);
				authority.roleIds=roleIds;
				return authority;
			});
		}
		return authority;
	}
});
module.exports={
	getAuthorities:function(){
		return Authority.find().addCreatedAt().addRoleIds().exec();
	},
	getAuthorityById:function(id){
		return Authority.findOne({_id:id}).addCreatedAt().exec();
	},
	updateAuthorityById:function(id,name,url){
		return Authority.update({_id:id},{$set:{name:name,url:url}}).exec();
	},
	createAuthority:function(authority){
		return Authority.create(authority).exec();
	}
}
