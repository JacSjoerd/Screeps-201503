module.exports = function(creep){
    // Genearl carrier 
    var target;
    var energyDrop = creep.pos.findClosest(Game.DROPPED_ENERGY, {maxOps: 20});
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
        if (creep.energy < creep.energyCapacity) {
            creep.moveTo(Game.creeps[creep.memory.target]);
            if (creep.pos.isNearTo(energyDrop)) {
                creep.pickup(energyDrop);
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
    }
}
