var tilemapURLArray = [
    { tilemapKey: 'testLevel', },
    { tilemapKey: 'level1', },
    { tilemapKey: 'level2', },
    { tilemapKey: 'level3', },
    { tilemapKey: 'level4', },
    { tilemapKey: 'level5', },
    { tilemapKey: 'level6', },
    { tilemapKey: 'level7', },
    { tilemapKey: 'level8', },
    { tilemapKey: 'level9', },
    { tilemapKey: 'level10', },
    { tilemapKey: 'level11', },
    { tilemapKey: 'level12', },
    { tilemapKey: 'level13', },
    { tilemapKey: 'level14', },
    { tilemapKey: 'level15', },
    { tilemapKey: 'level16', },
    { tilemapKey: 'level17', },
    { tilemapKey: 'level18', },
    { tilemapKey: 'level19', },
    { tilemapKey: 'level20', },

    // { tilemapKey: 'levelBranchingPaths', },
    // { tilemapKey: 'testLevel', },
]

class LevelManager
{
    constructor()
    {
        this.levelDefinitions = null;
        this.currentLevelIndex = null;
    }
}

var levelManager = new LevelManager();

// LevelDefinition contains information required to generate levels using the LevelScene class.
// Requires an object passed to it with the following properties listed inside the constructor.
class LevelDefinition
{
    constructor(levelConfig)
    {
        this.tilemapKey = levelConfig.tilemapKey;               // This refers to the tilemap key set for this level's loaded tilemap.
        this.levelName = levelConfig.levelName;                 // For display purposes.
        this.levelNameShortened = levelConfig.levelNameShortened;   // This is what is shown on the level select button.
        this.levelNameOffsetY = levelConfig.levelNameOffsetY;   // An offset value for displaying the level name at a different Y value.
        this.extraText = levelConfig.extraText;                 // For display purposes.
        this.numberOfSlimes = levelConfig.numberOfSlimes;       // Number of slimes in the map.
    }
}

function loadLevelDefintitions()
{
    levelManager.levelDefinitions = [];

    for(var i = 0; i < tilemapURLArray.length; i++)
    {
        var currentTilemap = jumpyGame.cache.tilemap.get(tilemapURLArray[i].tilemapKey);

        if(currentTilemap == null)
        {
            continue;
        }

        var levelConfig = {};
        levelConfig.tilemapKey = tilemapURLArray[i].tilemapKey;

        for(var j = 0; j < currentTilemap.data.properties.length; j++)
        {
            var property = currentTilemap.data.properties[j];
            var propertyKey = property.name;
            levelConfig[propertyKey] = property.value;
        }

        var newLevel = new LevelDefinition(levelConfig);
        levelManager.levelDefinitions.push(newLevel);
    }
}
