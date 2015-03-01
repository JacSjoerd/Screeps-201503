module.exports = function(creep) {
	var target = creep.pos.findClosest(Game.MY_CREEPS, {
		filter: function(object) {
			return (object.hits < object.hitsMax) && (object != creep);
    		}
	});
	
	if(target) {
		creep.moveTo(target);
		creep.heal(target);
	} else {
		if (typeof Game.flags.Flag1 === 'undefined') {
			creep.moveTo(Game.spawns.Spawn1);
		} else {
    			creep.moveTo(Game.flags.Flag1)
		}
	}
}