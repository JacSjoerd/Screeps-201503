module.exports = function(creep) {
	var targetX = creep.memory.target.x;
	var targetY = creep.memory.target.y;

	// Move creep to location unless there is a Keeper
	var keeper = creep.pos.findInRange(Game.HOSTILE_CREEPS, 6, {
	    filter: function(object) {
	        return object.owner.username == "Source Keeper";
	    }
	})
	
	if (keeper.length || (Game.time > 1000 && Game.time <1200) ) {
	    creep.moveTo(43, 22);
	} else if (!creep.pos.isEqualTo(targetX, targetY)) {
		creep.moveTo(targetX, targetY);
	} else {
	    var target = creep.pos.findClosest(Game.SOURCES, {maxOps: 5, ignoreCreeps: true});
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
