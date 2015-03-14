module.exports = function(creep) {
	var targetX = creep.memory.target.x;
	var targetY = creep.memory.target.y;
    var target;

    if (creep.memory.role == 'sniper') {
    	// Move creep to location
    	if (!creep.pos.equalsTo(targetX, targetY)) {
    		creep.moveTo(targetX, targetY);
    	} else {
    	    var obstructionAtTargetLocation = false;
    	    var targetLocation = creep.room.lookAt(targetX - 1, targetY);
    	    
    	    targetLocation.forEach(function(object) {
    	        if (object.type == 'creep') {
    	            obstructionAtTargetLocation = true;
    	        }
    	        if (object.type == 'terrain' && object.terrain == 'wall') {
    	            obstructionAtTargetLocation = true;
    	        }
    	    });
            
            if (obstructionAtTargetLocation === false) {
                creep.memory.target.x--;
            }
    	}
    	
		target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
		if(target) {
		    if (creep.pos.inRangeTo(target,3)) {
    			creep.rangedAttack(target);
		    }
    	}
    } else {
      	if (!creep.pos.equalsTo(targetX, targetY)) {
    		creep.moveTo(targetX, targetY);
    	} else {
    	    var obstructionAtTargetLocation = false;
    	    var targetLocation = creep.room.lookAt(targetX - 1, targetY);
    	    
    	    targetLocation.forEach(function(object) {
    	        if (object.type == 'creep') {
    	            obstructionAtTargetLocation = true;
    	        }
    	        if (object.type == 'terrain' && object.terrain == 'wall') {
    	            obstructionAtTargetLocation = true;
    	        }
    	    });
            
            if (obstructionAtTargetLocation === false) {
                creep.memory.target.x--;
            }
    	}
        
		target = creep.pos.findClosest(Game.MY_CREEPS, {
		    filter: function(object){
		        return (object.hits < object.hitsMax) && (object != creep);
		    }
		});

        if (creep.pos.isNearTo(target)) {
            creep.heal(target);
        } else {
            creep.rangedHeal(target);
        }
    }
 }
