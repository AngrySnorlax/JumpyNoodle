// start of constants
const jumpyGameTitle = "Jumpy Noodle";      // name of the game
const expToLevel2 = 9;                      // exp needed to reach level 2 from 1
const expToLevel3 = 15;                     // exp needed to reach level 3 from 2
const tilemapURLPrefix = 'assets/tilemaps/levels/LevelTilemap_';
const maxPlayerVelocityY = 392;
const maxPlayerWalledVelocityY = 280;
// end of constants

var jumpyGame;  // used to reference the game object in other scripts

// global references to important UI elements for ease of access to UI variables and functions.
var uIDict =
{
    inGameUI: null,
    pauseMenu: null,
    startOfLevelUI: null
}

var jumpySaveData = {
    levelsBeaten: 0,
    displaySlimeProgress: false,
    slimeData: {}
};
var jumpySaveData =
{
    levelsBeaten: 2,
    displaySlimeProgress: true,
    slimeData: {
        "Level 1" : [
            1
        ],
        "Level 2" : [
            2,
        ],
        "Level 4" : [
            1,
            4
        ]
    }
}

function loadJumpySaveData()
{
    var loadedString = localStorage.getItem("jumpySaveData");

    if(loadedString == null)
    {
        jumpySaveData =
        {
            levelsBeaten: 0,
            displaySlimeProgress: false,
            slimeData: {}
        };
        saveJumpySaveData();
    }
    else
    {
        jumpySaveData = JSON.parse(loadedString);
    }
}

function saveJumpySaveData()
{
    var saveString = JSON.stringify(jumpySaveData);
    localStorage.setItem("jumpySaveData", saveString);
}

function slimeSaved(levelName, slimeID)
{
    if(levelName in jumpySaveData.slimeData)
    {
        if(!jumpySaveData.slimeData[levelName].includes(slimeID))
        {
            jumpySaveData.slimeData[levelName].push(slimeID);
        }
    }
    else
    {
        jumpySaveData.slimeData[levelName] = [slimeID];
    }

    saveJumpySaveData();
}
