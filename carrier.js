module.exports = function(creep){
    // Genearl carrier 
    var target;
    var energyDrop = creep.pos.findClosest(Game.DROPPED_ENERGY);
    var mySpawn = Game.spawns.Spawn1;
    var extension = creep.pos.findClosest(Game.STRUCTURES, {
        filter: function(object) {
            return (object.structureType == 'extension') && (object.energy < object.energyCapacity);
        }
    });

    if (extension) {
        target = Game.structures[extension.id];
    } else {
        target = mySpawn;
    }

    
    if (creep.memory.role == 'carrier') {
        if (Game.creeps[creep.memory.target] === undefined) {
            creep.suicide();
        }
        
       if (creep.energy < creep.energyCapacity) {
            if (Game.creeps[creep.memory.target] === undefined) {
                creep.suicide();
            } else {
                var keeper = creep.pos.findInRange(Game.HOSTILE_CREEPS, 8, {
                    filter: function(object) {
                        return object.owner.username == "Source Keeper";
                    }
                });
                if (keeper.length || target.ticksToRegeneration < 50 ) {
                    if (!creep.pos.isNearTo(45,21)){
                        creep.moveTo(45, 21);
                    }
                } else {
                    creep.moveTo(Game.creeps[creep.memory.target]);
                    if (creep.pos.isNearTo(energyDrop)) {
                        creep.pickup(energyDrop);
                    }
                }
            }
        } else {
            creep.moveTo(target);
            creep.transferEnergy(target);
        }

        
        
    } else if (creep.memory.role == 'supplier'){
         if (creep.energy === 0) {
            creep.moveTo(mySpawn);
            if (creep.pos.isNearTo(mySpawn)){
                mySpawn.transferEnergy(creep);
            }
        } else {
            creep.moveTo(Game.creeps[creep.memory.target]);
            creep.transferEnergy(Game.creeps[creep.memory.target]);
        }
        if (creep.ticksToLive == 75) {
            Memory.sourceLocation.push(creep.memory.target);
            Memory.buildOrder.push("supplier");
            console.log("Rebuilding supplier " + creep.name);
        }
    } else { // Energy scoop   
        if(energyDrop) {
            if (creep.energy < creep.energyCapacity) {
                creep.moveTo(energyDrop);
                creep.pickup(energyDrop);
            } else {
                creep.moveTo(mySpawn);
                creep.transferEnergy(mySpawn);
            }
        } else {
            creep.moveTo(mySpawn);
            creep.transferEnergy(mySpawn);
        }
        if (creep.ticksToLive == 75) {
            Memory.sourceLocation.push(creep.memory.target);
            Memory.buildOrder.push("snooper");
            console.log("Rebuilding snooper " + creep.name);
        }
    }
}
