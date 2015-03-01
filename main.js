var initialize = require('init');
var guardWith = require('guard');
var snipeWith = require('sniper');
var harvestWith = require('harvester');
var carryWith = require('carrier');
var healWith = require('healer');
var buildWith= require('builder');

var mySpawn = Game.spawns.Spawn1;
var pipe = 0;
var harvesters = 0;
var guards = 0;
var builders = 0;


if (typeof Memory.initialized === 'undefined' || Memory.initialized === false) {
    initialize();
}

for(var creepName in Game.creeps) {
    var creep = Game.creeps[creepName];

    switch (creep.memory.role) {
        case "guard":
            guards++;
            guardWith(creep);
            break;
        case "sniper":
            snipeWith(creep);
            break;
        case "harvester":
            harvesters++;
            harvestWith(creep);
            break;
        case "carrier":
        case "snooper":
        case "supplier":
            carryWith(creep);
            break;
        case "builder":
        case "fixer":
            builders++;
            buildWith(creep);
            break;
        case "healer":
            healWith(creep);
            break;
    }
}

    
if (Memory.buildOrder.length === 0) {
    Memory.buildOrder = ['guard', 'healer', 'guard', 'guard'];
}

var nextBuild = Memory.buildOrder[0];
var nextBuildingPlan = Memory.buildingPlan[nextBuild];
var nextBuildingEnergy = nextBuildingPlan[0];

//    console.log('Next build is a ' + nextBuild + ' that needs ' + nextBuildingEnergy + ' energy.');

if (!mySpawn.spawning && mySpawn.energy > nextBuildingEnergy) {
    var build = Memory.buildOrder.shift();

    switch (build) {
        case 'guard':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'guard'});
            break;
        case 'sniper':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'sniper', target: Memory.SniperLocation.shift()});
            Memory.lastSniper = creepName;
            break;
        case 'harvester':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'harvester', target: Memory.sourceLocation.shift()});
            Memory.lastHarvester = creepName;
            break;
        case 'carrier':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'carrier', target: Memory.lastHarvester});
            break;
        case 'supplier':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'supplier', target: Memory.lastBuilder});
            break;
        case 'snooper':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'snooper'});
            break;
        case 'builder':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'builder'});
            Memory.lastBuilder = creepName;
            break;
        case 'fixer':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'fixer'});
            Memory.lastBuilder = creepName;
            break;
        case 'healer':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'healer'});
            break;
        default:
    }
    
    console.log('Build ' + build + ' with name ' + creepName);
}
   

if ((Game.time % 100) === 0) {
    var extensions = 0;
    var roomName = Game.spawns.Spawn1.pos.roomName;
    var myStructures = Game.rooms[roomName].find(Game.MY_STRUCTURES);
    for (var i = 0; i < myStructures.length -1 ; i++) {
        if (myStructures[i].structureType == 'extension') {
            extensions++;
        }    
    }
    
    console.log('Found ' + extensions + ' extensions');
    if (extensions > Memory.countedExtension){
        var requiredEnergy;
        
        requiredEnergy = Memory.buildingPlan.guard.shift();
        Memory.buildingPlan.guard.unshift(Memory.buildingPlan.guard[0]);
        requiredEnergy = requiredEnergy + Memory.buildcost[Memory.buildingPlan.guard[0]];
        Memory.buildingPlan.guard.unshift(requiredEnergy);
        
        requiredEnergy = Memory.buildingPlan.sniper.shift();
        Memory.buildingPlan.sniper.unshift(Memory.buildingPlan.sniper[0]);
        requiredEnergy = requiredEnergy + Memory.buildcost[Memory.buildingPlan.sniper[0]];
        Memory.buildingPlan.sniper.unshift(requiredEnergy);
        
        requiredEnergy = Memory.buildingPlan.harvester.shift();
        Memory.buildingPlan.harvester.unshift(Memory.buildingPlan.harvester[0]);
        requiredEnergy = requiredEnergy + Memory.buildcost[Memory.buildingPlan.harvester[0]];
        Memory.buildingPlan.harvester.unshift(requiredEnergy);
        
        Memory.countedExtension++;
        console.log('Updated buildplan');
    }
}
 