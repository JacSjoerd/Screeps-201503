module.exports = function(creep) {
    var targetX = creep.memory.target.x;
    var targetY = creep.memory.target.y;
    var target;

    // Move creep to location
    if (!creep.pos.equalsTo(targetX, targetY)) {
        creep.moveTo(targetX, targetY);
    } else {
        if (creep.memory.defenseLineCounter < Memory.defenseLine.length - 1) {
            if (creep.memory.defenseLineCounter < Memory.snipers - 1){
                creep.memory.defenseLineCounter++;
                creep.memory.target = Memory.defenseLine[creep.memory.defenseLineCounter];
            }
        }
    }

    if (creep.memory.role == 'sniper') {
        
        if (!Game.getObjectById(Memory.sniperTarget)) {
            target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
            if(target) {
                if (creep.pos.inRangeTo(target,3)) {
                    Memory.sniperTarget = target.id;
                    console.log("target set");
                }
            }
        }

        target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
        if(target) {
            if (Game.getObjectById(Memory.sniperTarget) && creep.pos.inRangeTo(Game.getObjectById(Memory.sniperTarget), 3)) {
                creep.rangedAttack(Game.getObjectById(Memory.sniperTarget));
            } else if (creep.pos.inRangeTo(target,3)) {
                creep.rangedAttack(target);
            }
        }

    } else {
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
