 module.exports = function(creep) {
    var base;

	if (typeof Game.flags.Flag1 === 'undefined') {
		base = Game.spawns.Spawn1;
	} else {
		base = Game.flags.Flag1;
	}
	
 	var targets = base.pos.findInRange(Game.HOSTILE_CREEPS, 20);
	if(targets.length > 0) {
		var target = creep.pos.findClosest(Game.HOSTILE_CREEPS, {maxOps: 20});
		if(target) {
			creep.moveTo(target);
			creep.attack(target);
		} 
	} else {
		creep.moveTo(base);
	}
 }