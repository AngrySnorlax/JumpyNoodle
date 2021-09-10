class LevelScene extends Phaser.Scene
{
    constructor()
    {
        super({key:'levelScene'});

        this.map = null;
        this.tileset = null;
        this.groundLayer = null;

        this.LevelDefinition = null;
        this.gameHasStarted = false;
        this.playerHasWon = false;
        this.playerIsDead = false;
        this.spaceKeyPressed = false;
        this.fadeSpeed = 320;
        this.afterFadeCase = "mainMenu";
        this.loadingMainMenuOrRestarting = false;
        this.playerOffCameraDeathOffsetY = 300;
    }

    loadLevelDefinition()
    {
        this.LevelDefinition = levelManager.levelDefinitions[levelManager.currentLevelIndex];
        this.gameHasStarted = false;
        this.playerHasWon = false;
        this.playerIsDead = false;
        this.spaceKeyPressed = false;
        this.fadeSpeed = 280;
        this.afterFadeCase = "mainMenu";
        this.loadingMainMenuOrRestarting = false;
    }

    create()
    {
        this.loadLevelDefinition();
        this.savedSlimeIDs = [];

        this.events.on('resume', this.onResume, this);
        this.cameras.main.roundPixels = true;

        this.map = this.make.tilemap({ key: this.LevelDefinition.tilemapKey });

        this.tileset = this.map.addTilesetImage('tileset', 'tileset');
        this.groundLayer = this.map.createLayer('Ground', this.tileset);

        this.physics.world.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height + this.playerOffCameraDeathOffsetY);

        this.cameras.main.zoom = 1;
        this.cameras.main.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);
        this.groundLayer.setCollisionByProperty({ collides: true });

        this.instantiateObjects();
        this.addInput();

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.afterFadeOut();
        });

        this.scene.wake('startOfLevelUI', { levelName: this.LevelDefinition.levelName, levelNameOffsetY: this.LevelDefinition.levelNameOffsetY,
            extraText: this.LevelDefinition.extraText, extraTextOffsetY: 0 });

        this.cameras.main.fadeIn(this.fadeSpeed, 0, 0, 0);
    }

    instantiatePlayer(spawnObject)
    {
        this.playerSprite = new Player(this, spawnObject.x + 16, spawnObject.y, 'playerCharacter');
        this.playerSprite.setCollideWorldBounds(true);
        this.playerSprite.body.immovable = true;
        this.playerSprite.body.setSize(14, 30);

        this.cameras.main.startFollow(this.playerSprite);
        this.children.bringToTop(this.playerSprite);
        uIDict.inGameUI.updateInGameUI(this.playerSprite.level, this.playerSprite.currentExp, this.playerSprite.maxExp);
    }

    playerBattlesEnemy(player, enemy)
    {
        if(player.isDead)
        {
            return;
        }

        if(player.level >= enemy.level)
        {
            player.gainExp(enemy.expValue);
            enemy.getSaved();
        }
        else
        {
            player.playerDie(player.scene);
        }
    }

    onResume(sys, data)
    {
        if(data.goToMainMenu)
        {
            this.afterFadeCase = "mainMenu";
            this.loadingMainMenuOrRestarting = true;
            sys.scene.cameras.main.fadeOut(this.fadeSpeed, 0, 0, 0);
        }
    }

    addInput()
    {
        this.input.on('pointerdown', function (pointer)
        {
            if(!this.gameHasStarted)
            {
                this.gameHasStarted = true;
                this.scene.sleep('startOfLevelUI');
                this.scene.wake('inGameUI', { currentLevelKey: "levelScene" });
                return;
            }

            if(this.playerHasWon)
            {
                return;
            }

            if(this.playerIsDead)
            {
                return;
            }

            this.playerJump();
        }, this);

        var scene = this;

        this.input.keyboard.on('keydown-' + 'SPACE', function (event)
        {
            if(!scene.gameHasStarted)
            {
                scene.gameHasStarted = true;
                scene.scene.sleep('startOfLevelUI');
                scene.scene.wake('inGameUI', { currentLevelKey: "levelScene" });
                return;
            }

            if(scene.playerHasWon)
            {
                return;
            }

            if(scene.playerIsDead)
            {
                return;
            }

            if(scene.spaceKeyPressed == false)
            {
                scene.playerJump();
            }
            scene.spaceKeyPressed = true;
        });

        this.input.keyboard.on('keyup-' + 'SPACE', function (event)
        {
            scene.spaceKeyPressed = false;
        });

        this.input.keyboard.on('keydown-' + 'ESC', function (event)
        {
            if(!scene.gameHasStarted)
            {
                return;
            }
            scene.pauseGame();
        });

        this.input.keyboard.on('keydown-' + 'P', function (event)
        {
            if(!scene.gameHasStarted)
            {
                return;
            }
            scene.pauseGame();
        });
    }

    playerJump()
    {
        if(this.playerSprite.body.blocked.down)
        {
            this.playerSprite.setVelocityY(this.playerSprite.jumpVelocity);
        }
        else
        {
            if(this.playerSprite.canWallJump)
            {
                if(this.playerSprite.runSpeed > 0)
                {
                    this.playerSprite.setVelocityX(-this.playerSprite.wallJumpVelocityX);
                }
                else
                {
                    this.playerSprite.setVelocityX(this.playerSprite.wallJumpVelocityX);
                }

                this.playerSprite.setVelocityY(this.playerSprite.wallJumpVelocityY);
                this.playerSprite.runSpeed = -this.playerSprite.runSpeed;
                this.playerSprite.extraJumpsAvailable = this.playerSprite.maxNumberOfExtraJumps;
            }
            else
            {
                if(this.playerSprite.extraJumpsAvailable > 0)
                {
                    this.playerSprite.extraJumpsAvailable--;
                    this.playerSprite.setVelocityY(this.playerSprite.jumpVelocity);
                }
            }
        }
    }

    pauseGame()
    {
        if(this.playerIsDead)
        {
            return;
        }

        this.scene.wake('pauseMenu', { currentLevelKey: 'levelScene' });
        this.scene.pause();
    }

    update()
    {
        if(this.loadingMainMenuOrRestarting)
        {
            return;
        }

        if(this.playerSprite == null)
        {
            return;
        }

        if(!this.gameHasStarted)
        {
            this.playerSprite.anims.play('playerIdle', true);
            return;
        }

        if(this.playerSprite.level < 3)
        {
            uIDict.inGameUI.updateInGameUI(this.playerSprite.level, this.playerSprite.currentExp, this.playerSprite.maxExp);
        }
        else
        {
            uIDict.inGameUI.clearExpBar();
        }

        if(this.playerHasWon)
        {
            this.playerSprite.anims.play('playerWin', true);
            return;
        }

        if(this.playerIsDead)
        {
            this.playerSprite.anims.play('playerDead', true);
            return;
        }

        if(this.playerSprite.active)
        {
            this.playerSprite.update(this);
        }

        for(var i = 0; i < this.slimes.length; i++)
        {
            this.slimes[i].update();
        }
    }

    instantiateObjects()
    {
        var objectArray = this.map.getObjectLayer("GameObjects").objects;
        this.slimes = [];
        this.pickUps = [];
        this.spikes = [];
        var endOfLevelFlag = null;

        objectArray.forEach(object => {
            var objectProperties = this.map.tilesets[0].getTileProperties(object.gid);

            switch(objectProperties.objectTag)
            {
                case "slimeEnemy":
                    if(objectProperties.isFlying)
                    {
                        var slimeSprite = new FlyingSlime(this, object.x, object.y, objectProperties, this.slimes.length);
                        this.slimes.push(slimeSprite);
                    }
                    else
                    {
                        var slimeSprite = new GroundedSlime(this, object.x, object.y, objectProperties, this.slimes.length);
                        this.slimes.push(slimeSprite);
                    }
                    break;
                case "pickUp":
                    var pickUpSprite = new PickUp(this, object.x, object.y, objectProperties).setOrigin(-0.4, 1.4);
                    this.pickUps.push(pickUpSprite);
                    break;
                case "spike":
                    var spikeSprite = new Spike(this, object.x, object.y, objectProperties);
                    this.spikes.push(spikeSprite);
                    break;
                case "endOfLevel":
                     endOfLevelFlag = new EndOfLevelFlag(this, object.x, object.y, objectProperties).setOrigin(0, 1);
                    break;
                case "playerSpawn":
                    this.instantiatePlayer(object);
                    break;
                default:
                    console.log("Bad objectTag on game object instantiation.");
                    break;
            }
        });

        for(var i = 0; i < this.slimes.length; i++)
        {
            this.slimes[i].addPlayerCollider(this.playerSprite);
        }

        for(var i = 0; i < this.pickUps.length; i++)
        {
            this.pickUps[i].addPlayerCollider(this.playerSprite);
        }

        for(var i = 0; i < this.spikes.length; i++)
        {
            this.spikes[i].addPlayerCollider(this.playerSprite);
        }

        endOfLevelFlag.addPlayerCollider(this.playerSprite);
    }

    playerWin(player, endOfLevelFlag)
    {
        if(this.playerIsDead || this.loadingMainMenuOrRestarting || this.playerHasWon)
        {
            return;
        }

        player.body.setVelocityX(0);
        this.playerSprite.runSpeed = 0;
        this.playerHasWon = true;
        this.afterFadeCase = "nextLevel";

        for(var i = 0; i < this.savedSlimeIDs.length; i++)
        {
            slimeSaved(this.LevelDefinition.levelName, this.savedSlimeIDs[i]);
        }

        this.time.delayedCall(1000, this.fadeToBlack, [], this);
    }

    fadeToBlack()
    {
        this.cameras.main.fadeOut(this.fadeSpeed, 0, 0, 0);
    }

    afterFadeOut()
    {
        switch(this.afterFadeCase) {
            case "mainMenu":
                this.scene.sleep('inGameUI');
                this.scene.start('mainMenu');
                this.scene.stop('levelScene');
            break;
            case "restart":
                this.time.delayedCall(300, this.restartLevel, [], this);
            break;
            case "nextLevel":
                this.scene.sleep('inGameUI');
                levelManager.currentLevelIndex++;

                if(levelManager.currentLevelIndex >= levelManager.levelDefinitions.length)
                {
                    levelManager.currentLevelIndex = 0;

                    this.scene.sleep('inGameUI');
                    this.scene.start('mainMenu');
                    this.scene.stop('levelScene');
                }
                else
                {
                    this.scene.restart();
                }
            break;
            default:
                console.log("afterFadeCase for BaseLevel was set to a nonexistent case. Restarting level.");
                scene.scene.restart();
        }
    }

    restartLevelAfterFader()
    {
        if(scene.playerIsDead || scene.loadingMainMenuOrRestarting || scene.playerHasWon)
        {
            return;
        }

        scene.scene.sleep('inGameUI');
        this.body.setVelocityX(0);
        scene.scene.afterFadeCase = "restart";
        scene.scene.scene.time.delayedCall(300, scene.fadeToBlack, [], scene);
    }

    restartLevel()
    {
        this.scene.restart();
    }
}

export default LevelScene;
