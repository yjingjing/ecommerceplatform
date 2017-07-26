var Mongolass=require('mongolass');
var mongolass=new Mongolass();
var config=require('config-lite')(__dirname);
var moment=require('moment');
var objectIdToTimestamp=require('objectid-to-timestamp');
mongolass.connect(config.mongodb);
mongolass.plugin('addCreatedAt',{
	afterFind:function(results){
		results.forEach(function(item){
			item.created_at=moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
		});
		return results;
	},
	afterFindOne:function(result){
		if(result){
			result.created_at=moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
		}
		return result;
	}
});
exports.Admin=mongolass.model('Admin',{
	name:{type:'string'},
	password:{type:'string'}
//	authority:{type:Mongolass.Types.ObjectId}
});
exports.Admin.index({name:1},{unique:true}).exec();
exports.Authority=mongolass.model('Authority',{
	name:{type:'string'},
	url:{type:'string'}
});
exports.Authority.index({_id:1}).exec();
exports.Role=mongolass.model('Role',{
	name:{type:'string'},
	authorityIds:{type:'string'}
});
exports.Role.index({name:1},{unique:true}).exec();
exports.RAManager=mongolass.model('RAManager',{
	roleId:{type:Mongolass.Types.ObjectId},
	authorityId:{type:Mongolass.Types.ObjectId}
});
exports.RAManager.index({_id:1}).exec();
exports.Catagory=mongolass.model('Catagory',{
	cname:{type:'string'},
	ename:{type:'string'}
});
exports.Catagory.index({_id:1}).exec();
exports.Caommodity=mongolass.model('Caommodity',{
	name:{type:'string'},
	price:{type:'number'},
	imgSrc:{type:'string'},
	catagory:{type:Mongolass.Types.ObjectId},
	remainTime:{type:'number'},
	discount:{type:'number'},
	stockNum:{type:'number'},
	brandName:{type:'string'},
	commodityCode:{type:'string'},
	commodityWeight:{type:'number'},
	commodityLocation:{type:'string'}
});
exports.Caommodity.index({_id:1}).exec();
