module.exports = function(creep) {
	var targetX = creep.memory.target.x;
	var targetY = creep.memory.target.y;

	// Move creep to location
	if (!creep.pos.equalsTo(targetX, targetY)) {
	//    console.log('Creep ' + creep.name + ' moving to (' + targetX + ', ' + targetY + ').');
		creep.moveTo(targetX, targetY);
	} 
		var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
		if(target) {
		    if (creep.pos.inRangeTo(target,3)) {
    			creep.rangedAttack(target);
		    }
	}
 }
