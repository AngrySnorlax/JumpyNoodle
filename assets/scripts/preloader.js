class Preloader extends Phaser.Scene
{
    constructor()
    {
        super({key:'preloader'});
    }

    preload()
    {
        loadJumpySaveData();

        this.load.image('emptySprite', 'assets/artwork/emptySprite.png');
        this.load.image('mainMenuBG', 'assets/artwork/mainMenuBG.png');
        this.load.image('buttonTemplate', 'assets/artwork/buttonTemplate.png');
        this.load.image('rightArrowButton', 'assets/artwork/rightArrowButton.png');
        this.load.image('leftArrowButton', 'assets/artwork/leftArrowButton.png');
        this.load.image('longButtonTemplate', 'assets/artwork/longButtonTemplate.png');
        this.load.image('pauseButton', 'assets/artwork/pauseButton.png');
        this.load.image('pickUpUI', 'assets/artwork/pickUpUI.png');
        this.load.image('doubleJumpUI', 'assets/artwork/doubleJumpUI.png');
        this.load.image('tileset', 'assets/artwork/tileset.png');
        this.load.image('endOfLevel', 'assets/artwork/endOfLevel.png');
        this.load.image('upSpikes', 'assets/artwork/upSpikes.png');
        this.load.image('downSpikes', 'assets/artwork/downSpikes.png');
        this.load.image('leftSpikes', 'assets/artwork/leftSpikes.png');
        this.load.image('rightSpikes', 'assets/artwork/rightSpikes.png');
        this.load.image('doubleJump', 'assets/artwork/doubleJumpPickUp.png');
        this.load.image('bbSlime', 'assets/artwork/bbSlime.png');
        this.load.image('bbSlimeDarkedOut', 'assets/artwork/bbSlimeDarkedOut.png');

        this.load.spritesheet('playerCharacter', 'assets/artwork/playerCharacterSheet.png',
            { frameWidth: 22, frameHeight: 30 });
        this.load.spritesheet('slimeEnemyLevel_1', 'assets/artwork/slimeEnemyLevel1.png',
            { frameWidth: 24, frameHeight: 22 });
        this.load.spritesheet('slimeEnemyLevel_2', 'assets/artwork/slimeEnemyLevel2.png',
            { frameWidth: 24, frameHeight: 22 });
        this.load.spritesheet('slimeEnemyLevel_3', 'assets/artwork/slimeEnemyLevel3.png',
            { frameWidth: 24, frameHeight: 22 });
        this.load.spritesheet('slimeFriendLevel_1', 'assets/artwork/slimeFriendLevel1.png',
            { frameWidth: 22, frameHeight: 22 });
        this.load.spritesheet('slimeFriendLevel_2', 'assets/artwork/slimeFriendLevel2.png',
            { frameWidth: 22, frameHeight: 22 });
        this.load.spritesheet('slimeFriendLevel_3', 'assets/artwork/slimeFriendLevel3.png',
            { frameWidth: 22, frameHeight: 22 });
        this.load.spritesheet('flyingSlimes', 'assets/artwork/flyingSlimes.png',
            { frameWidth: 34, frameHeight: 22 });

        this.loadTilemapJSONFiles();
    }

    loadTilemapJSONFiles()
    {
        for(var i = 0; i < tilemapURLArray.length; i++)
        {
            this.load.tilemapTiledJSON(tilemapURLArray[i].tilemapKey, tilemapURLPrefix + tilemapURLArray[i].tilemapKey + ".json");
        }
    }

    create()
    {
        loadLevelDefintitions();

        this.createAnimations();

        this.scene.launch('inGameUI');
        this.scene.sleep('inGameUI');
        this.scene.launch('pauseMenu');
        this.scene.sleep('pauseMenu');
        this.scene.launch('startOfLevelUI');
        this.scene.sleep('startOfLevelUI');

        this.scene.switch('mainMenu');
    }

    createAnimations()
    {
        this.createAnimation('playerMoveLeft', 'playerCharacter', [ 0, 1, 2, 3 ], 7, -1);
        this.createAnimation('playerInAirLeft', 'playerCharacter', [4], 1, -1);
        this.createAnimation('playerWallHangLeft', 'playerCharacter', [5], 1, -1);
        this.createAnimation('playerMoveRight', 'playerCharacter', [ 6, 7, 8, 9 ], 7, -1);
        this.createAnimation('playerInAirRight', 'playerCharacter', [10], 1, -1);
        this.createAnimation('playerWallHangRight', 'playerCharacter', [11], 1, -1);
        this.createAnimation('playerIdle', 'playerCharacter', [12], 1, -1);
        this.createAnimation('playerDead', 'playerCharacter', [13], 1, -1);
        this.createAnimation('playerWin', 'playerCharacter', [14, 15], 4, -1);

        this.createAnimation('slimeEnemyLevel1Idle', 'slimeEnemyLevel_1', [0, 1], 4, -1);
        this.createAnimation('slimeEnemyLevel2Idle', 'slimeEnemyLevel_2', [0, 1], 4, -1);
        this.createAnimation('slimeEnemyLevel3Idle', 'slimeEnemyLevel_3', [0, 1], 4, -1);
        this.createAnimation('slimeFriendLevel1Idle', 'slimeFriendLevel_1', [0, 1], 4, -1);
        this.createAnimation('slimeFriendLevel2Idle', 'slimeFriendLevel_2', [0, 1], 4, -1);
        this.createAnimation('slimeFriendLevel3Idle', 'slimeFriendLevel_3', [0, 1], 4, -1);
        this.createAnimation('slimeEnemyLevel1DetectPlayer', 'slimeEnemyLevel_1', [2, 3], 6, -1);
        this.createAnimation('slimeEnemyLevel2DetectPlayer', 'slimeEnemyLevel_2', [2, 3], 6, -1);
        this.createAnimation('slimeEnemyLevel3DetectPlayer', 'slimeEnemyLevel_3', [2, 3], 6, -1);
        this.createAnimation('slimeEnemyLevel1AttackPlayer', 'slimeEnemyLevel_1', [4], 1, -1);
        this.createAnimation('slimeEnemyLevel2AttackPlayer', 'slimeEnemyLevel_2', [4], 1, -1);
        this.createAnimation('slimeEnemyLevel3AttackPlayer', 'slimeEnemyLevel_3', [4], 1, -1);

        this.createAnimation('flyingSlimeEnemyLevel1', 'flyingSlimes', [1, 4, 7, 10], 7, -1);
        this.createAnimation('flyingSlimeEnemyLevel2', 'flyingSlimes', [2, 5, 8, 11], 7, -1);
        this.createAnimation('flyingSlimeEnemyLevel3', 'flyingSlimes', [0, 3, 6, 9], 7, -1);
        this.createAnimation('flyingSlimeFriendLevel1', 'flyingSlimes', [13, 16, 19, 22], 7, -1);
        this.createAnimation('flyingSlimeFriendLevel2', 'flyingSlimes', [14, 17, 20, 23], 7, -1);
        this.createAnimation('flyingSlimeFriendLevel3', 'flyingSlimes', [12, 15, 18, 21], 7, -1);
    }

    createAnimation(animationKey, spriteSheet, frames, frameRate, repeat)
    {
        this.anims.create({
            key: animationKey,
            frames: this.anims.generateFrameNumbers(spriteSheet, { frames: frames }),
            frameRate: frameRate,
            repeat: -1
        });
    }
}

export default Preloader;
