 module.exports = function(creep) {
    var base;


 	var targets = creep.pos.findInRange(Game.CREEPS, 10, {
 	    filter: function(object) {
 	        return object.owner.username == 'Source Keeper';
 	    }
 	});
	if(targets.length > 0) {
		var target = creep.pos.findClosest(targets, {maxOps: 50});
		if(target) {
			creep.moveTo(target);
			creep.attack(target);
		} 
	} else {
		creep.moveTo(creep.memory.target.x, creep.memory.target.y);
	}
 }