module.exports = function(creep) {
	var targetX = creep.memory.target.x;
	var targetY = creep.memory.target.y;

	// Move creep to location unless there is a Keeper
	var keeper = creep.pos.findInRange(Game.HOSTILE_CREEPS, 8, {
	    filter: function(object) {
	        return object.owner.username == "Source Keeper";
	    }
	});
	
    var target = creep.pos.findClosest(Game.SOURCES, {maxOps: 20, ignoreCreeps: true});

	if (keeper.length || target.ticksToRegeneration < 50 ) {
	    if (!creep.pos.isNearTo(45,21)){
    	    creep.moveTo(45, 21);
	    }
	} else if (!creep.pos.isEqualTo(targetX, targetY)) {
		creep.moveTo(targetX, targetY);
	} else {
	    creep.harvest(target);
	}
	
	// Look for carriers in range
	var carriers = creep.pos.findInRange(Game.MY_CREEPS, 1, {
	    filter: function(object) {
	        return object.memory.role == 'carrier';
	    }
	});
	if (carriers.length > 0 ) {
        creep.transferEnergy(carriers[0]);
	}
	
	if (creep.ticksToLive == 75) {
	    Memory.sourceLocation.unshift(creep.memory.target);
	    Memory.buildOrder.unshift("harvester");
	    console.log("Rebuilding harvester " + creep.name);
	}
};
