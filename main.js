var initialize = require('init');
var guardWith = require('guard');
var keepWith = require('keeper');
var snipeWith = require('sniper');
var harvestWith = require('harvester');
var carryWith = require('carrier');
var healWith = require('healer');
var buildWith = require('builder');
var squadWith = require('squad');
var usePipe = require('pipe');

var mySpawn = Game.spawns.Spawn1;
var pipe = 0;
var harvesters = 0;
var guards = 0;
var keepers = 0;
var builders = 0;
var snoopers = 0;
var snipers = 0;
var healers = 0;
var myRoom = Game.spawns.Spawn1.room;
var sources = myRoom.find(Game.SOURCES_ACTIVE);
var targets = myRoom.find(Game.HOSTILE_CREEPS);


if (typeof Memory.initialized === 'undefined' || Memory.initialized === false) {
    initialize();
}

/*
for (var i = 0; i < Memory.pipeToSource.length; i++){
    
}
*/

for(var creepName in Game.creeps) {
    var creep = Game.creeps[creepName];

    switch (creep.memory.role) {
        case "pipehead":
        case "pipe":
            usePipe(creep);
            break;
        case "guard":
            guards++;
            guardWith(creep);
            break;
        case "keeper":
            keepers++;
            keepWith(creep);
            break;
        case "sniper":
            snipeWith(creep);
            snipers++;
            break;
        case "snipersupport":
            snipeWith(creep);
            break;
        case "harvester":
            harvesters++;
            harvestWith(creep);
            break;
        case "carrier":
        case "supplier":
            carryWith(creep);
            break;
        case "snooper":
            snoopers++;
            carryWith(creep);
            break;
        case "builder":
        case "fixer":
            builders++;
            buildWith(creep);
            break;
        case "healer":
            healWith(creep);
            healers++;
            break;
        case "squadguard":
        case "squadhealer":
            squadWith(creep);
            break;
    }
}

Memory.snipers = snipers;
if (healers <= 1 && (Memory.buildOrder.indexOf('healer') == -1)) {
    Memory.buildOrder.push('healer');
}
if (snoopers <= 1 && (Memory.buildOrder.indexOf('snooper') == -1)) {
    Memory.buildOrder.push('snooper');
}
if (Memory.buildOrder.length === 0) {
    Memory.buildOrder = ['sniper'];
}

var nextBuild = Memory.buildOrder[0];
var nextBuildingPlan = Memory.buildingPlan[nextBuild];
var nextBuildingEnergy = nextBuildingPlan[0];

//    console.log('Next build is a ' + nextBuild + ' that needs ' + nextBuildingEnergy + ' energy.');

if (!mySpawn.spawning && mySpawn.energy > nextBuildingEnergy) {
    var build = Memory.buildOrder.shift();

    switch (build) {
        case 'pipehead':
            if (Memory.pipeCounter < 0){
                Memory.pipeCounter = Memory.pipeToSource.length - 1;
            }
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'pipehead', pipeLocation: Memory.pipeCounter, target: {x: Memory.pipeToSource[Memory.pipeCounter].x, y: Memory.pipeToSource[Memory.pipeCounter].y}});
            Memory.pipeToSource[Memory.pipeCounter].name = creepName;
            Memory.pipeCounter--;
            break;
        case 'pipe':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'pipe', pipeLocation: Memory.pipeCounter, target: {x: Memory.pipeToSource[Memory.pipeCounter].x, y: Memory.pipeToSource[Memory.pipeCounter].y}});
            Memory.pipeToSource[Memory.pipeCounter].name = creepName;
            Memory.pipeCounter--;
            break;
        case 'guard':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'guard'});
            break;
        case 'squadguard':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'squadguard', defenseLineCounter: 0, target: {x: 46, y: 26}});
            break;
        case 'sniper':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'sniper', defenseLineCounter: 0, target: Memory.defenseLine[0]});
//            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'sniper', target: {x: 40, y: 16}});
            Memory.lastSniper = creepName;
            break;
        case 'harvester':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'harvester', target: Memory.sourceLocation.shift()});
            Memory.buildOrder.unshift("carrier");
            Memory.buildOrder.unshift("carrier");
            Memory.buildOrder.unshift("carrier");
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
            Memory.buildOrder.unshift('supplier');
            Memory.lastBuilder = creepName;
            break;
        case 'fixer':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'fixer'});
            Memory.lastBuilder = creepName;
            break;
        case 'snipersupport':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'snipersupport', target: {x: 40, y: 15}});
            Memory.sniperSupportCount++;
            break;
        case 'healer':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'healer'});
            break;
        case 'squadhealer':
            var creepName = mySpawn.createCreep(nextBuildingPlan.slice(1, nextBuildingPlan.length), null, {role: 'squadhealer', target: {x: 46, y: 25}});
            break;
        default:
    }
    
    console.log('Build ' + build + ' with name ' + creepName);
}
   

// Check for additional extension to upgrade build plans
if ((Game.time % 100) === 0) {
    var myExtensions = Game.spawns.Spawn1.room.find(Game.MY_STRUCTURES, {
        filter: function(object) {
            return object.structureType == 'extension';
        }
    });

    console.log('Found ' + myExtensions.length + ' extensions');
    if (myExtensions.length > Memory.countedExtension){
        var requiredEnergy;
        var extensionPart;
        
        for (var i in  Memory.buildingPlan) {
            
            switch (i) {
                case "guard":
                case "sniper":
                case "snipersupport":
                    requiredEnergy = Memory.buildingPlan[i].shift();
                    extensionPart = Memory.buildingPlan[i].pop();
                    Memory.buildingPlan[i].push(extensionPart);
                    Memory.buildingPlan[i].push(extensionPart);
                    requiredEnergy = requiredEnergy + Memory.buildcost[extensionPart];
                    Memory.buildingPlan[i].unshift(requiredEnergy);
                    break;
            } 
        }
        
        Memory.countedExtension++;
        console.log('Updated buildplan');
    }
}

// Check for enough snoopers
if ((snoopers < 1) && (Memory.buildOrder.indexOf("snooper") < 0) && !mySpawn.spawning) {
    Memory.buildOrder.push('snooper');
}


 