module.exports = function(){
    Memory.constructingPipe = true;
    Memory.lastBuilder = undefined;
    Memory.lastSniper = undefined;
    Memory.lastHarvester = undefined;
    Memory.activeCreeps = undefined;
    Memory.countedExtension = 0;
    
    Game.spawns.Spawn1.room.createFlag(16, 18, 'Flag1', Game.COLOR_YELLOW);
    Game.spawns.Spawn1.room.createConstructionSite(22, 22, Game.STRUCTURE_EXTENSION);
    Game.spawns.Spawn1.room.createConstructionSite(20, 24, Game.STRUCTURE_EXTENSION);
    
    // Building cost
    Memory.buildcost = {
        move: 50,
        work: 20,
        carry: 50,
        attack: 80,
        ranged_attack: 150,
        heal: 200,
        tough: 20
    };
    
    // Building plans
    Memory.buildingPlan = {
        guard:     [340, Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE],
        sniper:    [650, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE],
        healer:    [500, Game.HEAL, Game.HEAL, Game.MOVE, Game.MOVE],
        harvester: [160, Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
        builder:   [160, Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
        fixer:     [160, Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE],
        carrier:   [200, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE],
        supplier:  [200, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE],
        snooper:   [200, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE]
    };

    // Setup array of initial build sequence.
    Memory.buildOrder = ['guard', 
        'harvester', 'carrier', 'carrier', 'carrier', 
        'harvester', 'carrier', 'carrier', 'carrier', 'carrier', 
        'guard', 'healer', 'snooper', 'guard', 'builder', 'supplier',
        'harvester', 'carrier', 'carrier', 'carrier', 
        'harvester', 'carrier', 'carrier', 'carrier', 'carrier', 
        'sniper', 'sniper',
        'healer', 'guard',
        'sniper', 'sniper', 'sniper', 'sniper',
        'supplier', 
        'sniper', 'sniper', 'sniper', 'sniper', 'sniper', 'sniper',
        'builder', 'supplier', 'supplier',
        'fixer', 'supplier'
        ];
      
    Memory.sourceLocation = [{x: 45, y: 2}, {x: 43, y: 28}, {x: 46, y: 3}, {x: 44, y: 29}];
    Memory.SniperLocation = [{x: 29, y: 20}, {x: 18, y: 30}, {x: 29, y: 19}, {x: 17, y: 30}, {x: 29, y: 21}, {x: 19, y: 30},
        {x: 29, y: 18}, {x: 20, y: 30}, {x: 29, y: 17}, {x: 16, y: 30}, {x: 29, y: 22}, {x: 21, y: 30}
        ];
    
    Memory.initialized = true;
    console.log("Initialized!");
};
