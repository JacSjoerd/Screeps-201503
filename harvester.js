module.exports = function(creep) {
			var targetX = creep.memory.target.x;
			var targetY = creep.memory.target.y;

			// Move creep to location
			if (!creep.pos.equalsTo(targetX, targetY)) {
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
		}
