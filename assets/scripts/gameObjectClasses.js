class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        this.level = 1;
        this.currentExp = 0;
        this.maxExp = expToLevel2;
        this.runSpeed = 195;
        this.jumpVelocity = -326;
        this.wallJumpVelocityX = 230;
        this.wallJumpVelocityY = -318;
        this.canWallJump = false;
        this.maxNumberOfExtraJumps = 0;
        this.extraJumpsAvailable = null;
        this.isDead = false;
        this.groundLayerCollision = scene.physics.add.collider(this, scene.groundLayer);
    }

    update(scene)
    {
        this.wallJumpDetection(scene.groundLayer);

        if(this.body.velocity.y > 0)
        {
            this.body.setGravityY(876);
        }
        else
        {
            this.body.setGravityY(60);
        }

        if(maxPlayerVelocityY < this.body.velocity.y)
        {
            this.body.velocity.y = maxPlayerVelocityY;
        }

        if(this.body.blocked.down)
        {
            this.movePlayer();
            this.extraJumpsAvailable = this.maxNumberOfExtraJumps;

            if(this.runSpeed < 0)
            {
                this.anims.play('playerMoveLeft', true);
            }
            else
            {
                this.anims.play('playerMoveRight', true);
            }

            if(this.body.blocked.right && this.runSpeed > 0)
            {
                this.runSpeed = -this.runSpeed;
            }

            if(this.body.blocked.left && this.runSpeed < 0)
            {
                this.runSpeed = -this.runSpeed;
            }
        }
        else
        {
            if(this.runSpeed < 0)
            {
                this.anims.play('playerInAirLeft', true);
            }
            else
            {
                this.anims.play('playerInAirRight', true);
            }

            if(this.body.velocity.y < 0)
            {
                this.movePlayer();
            }
        }

        if(this.body.y > (scene.cameras.main.worldView.y + scene.playerOffCameraDeathOffsetY))
        {
            this.playerDie(scene);
        }
    }

    wallJumpDetection(wallJumpableLayer)
    {
        if(this.runSpeed > 0)
        {
            var topRightTile = wallJumpableLayer.getTileAtWorldXY(this.body.x + 23, this.body.y + 8);
            var bottomRightTile = wallJumpableLayer.getTileAtWorldXY(this.body.x + 23, this.body.y + 24);

            if(topRightTile != null || bottomRightTile != null)
            {
                this.canWallJump = true;
            }
            else
            {
                this.canWallJump = false;
            }
        }
        else
        {
            var topLeftTile = wallJumpableLayer.getTileAtWorldXY(this.body.x - 1, this.body.y + 8);
            var bottomLeftTile = wallJumpableLayer.getTileAtWorldXY(this.body.x - 1, this.body.y + 24);

            if(topLeftTile != null || bottomLeftTile != null)
            {
                this.canWallJump = true;
            }
            else
            {
                this.canWallJump = false;
            }
        }
    }

    movePlayer()
    {
        this.setVelocityX(this.runSpeed);
    }

    playerDie(scene)
    {
        if(scene.playerIsDead || scene.loadingMainMenuOrRestarting || scene.playerHasWon)
        {
            return;
        }

        scene.scene.sleep('inGameUI');
        this.body.setVelocityX(0);
        this.body.setVelocityY(-160);
        this.body.setGravityY(40);
        scene.afterFadeCase = "restart";
        scene.playerIsDead = true;
        this.isDead = true;
        scene.scene.scene.time.delayedCall(300, scene.fadeToBlack, [], scene);
        scene.cameras.main.stopFollow();
        this.groundLayerCollision.destroy();
    }

    gainExp(expAmount)
    {
        this.currentExp += expAmount;

        if(this.currentExp >= this.maxExp)
        {
            if(this.level > 2)
            {
                this.currentExp = this.maxExp;
                return;
            }

            this.level++;
            this.currentExp -= this.maxExp;
            this.maxExp = expToLevel3;
        }
    }

    getDoubleJump()
    {
        this.maxNumberOfExtraJumps = 1;
        this.extraJumpsAvailable = 1;
    }

    battleEnemy(player, enemy)
    {
        if(this.isDead)
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
}

class EndOfLevelFlag extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, objectProperties)
    {
        super(scene, x, y, "endOfLevel");
        scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.body.allowGravity = false;
        this.body.immovable = true;
    }

    getCollidedWith(player, flag)
    {
        this.scene.scene.playerWin(player, flag);
    }

    addPlayerCollider(player)
    {
        this.scene.physics.add.collider(player, this, this.getCollidedWith, null, this.scene);
    }
}

class Slime extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, objectProperties, slimeID)
    {
        super(scene, x, y, texture);

        scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.body.immovable = true;
        this.isSaved = false;
        this.savedAnimationKey = '';
        this.destroyOnSaveObjects = [];
        this.body.setSize(22, 22);

        this.level = objectProperties.level;
        this.slimeID = slimeID;
        this.expValue = objectProperties.expValue;
    }

    getSaved()
    {
        this.body.enable = false;
        this.isSaved = true;
        this.anims.play(this.savedAnimationKey, true);

        for(var i = 0; i < this.destroyOnSaveObjects.length; i++)
        {
            this.destroyOnSaveObjects[i].destroy();
        }

        this.destroyOnSaveObjects = null;
        this.scene.savedSlimeIDs.push(this.slimeID);

        // slimeSaved(levelManager.levelDefinitions[levelManager.currentLevelIndex].levelName, this.slimeID);
    }

    addPlayerCollider(player)
    {
        this.scene.physics.add.collider(player, this, this.scene.playerBattlesEnemy, null, this.scene);
    }
}

class FlyingSlime extends Slime
{
    constructor(scene, x, y, objectProperties, slimeID)
    {
        super(scene, x, y, "flyingSlimes", objectProperties, slimeID);

        this.body.allowGravity = false;
        this.anims.play('flyingSlimeEnemyLevel' + this.level, true);
        this.savedAnimationKey = 'flyingSlimeFriendLevel' + this.level;
        this.setOrigin(0, 1);
    }

    update()
    {

    }
}

class GroundedSlime extends Slime
{
    constructor(scene, x, y, objectProperties, slimeID)
    {
        super(scene, x, y, ("slimeEnemyLevel_" + objectProperties.level), objectProperties, slimeID);

        scene.physics.add.collider(this, scene.groundLayer);
        this.seesPlayer = false;
        this.anims.play('slimeEnemyLevel' + this.level + 'Idle', true);
        this.savedAnimationKey = 'slimeFriendLevel' + this.level + 'Idle';
        this.setOrigin(-0.15, this.originY);

        this.playerDetectionCircle = scene.add.circle(this.body.x, this.body.y, 46).setOrigin(1.025, 1.15);
        scene.add.existing(this.playerDetectionCircle);
        this.scene.physics.world.enableBody(this.playerDetectionCircle, 0);
        this.playerDetectionCircle.body.allowGravity = false;
        this.playerDetectionCircle.body.immovable = true;
        this.playerDetectionCircle.body.setCircle(120);
        this.playerDetectionCircle.slime = this;
        scene.physics.add.overlap(this.playerDetectionCircle, scene.playerSprite, function (detectionCircle, player) {
            if(player.y < detectionCircle.y)
            {
                detectionCircle.slime.seesPlayer = true;
            }
        });

        this.destroyOnSaveObjects.push(this.playerDetectionCircle);

        this.playerAttackCircle = scene.add.circle(this.body.x, this.body.y, 46).setOrigin(0.03, 0.25);
        scene.add.existing(this.playerAttackCircle);
        this.scene.physics.world.enableBody(this.playerAttackCircle, 0);
        this.playerAttackCircle.body.allowGravity = false;
        this.playerAttackCircle.body.immovable = true;
        this.playerAttackCircle.body.setCircle(30);
        this.playerAttackCircle.slime = this;
        scene.physics.add.overlap(this.playerAttackCircle, scene.playerSprite, function (detectionCircle, player) {
            detectionCircle.slime.attackingPlayer = true;
        });

        this.destroyOnSaveObjects.push(this.playerAttackCircle);
    }

    update()
    {
        if(this.isSaved)
        {
            return;
        }

        if(this.attackTimer > 0)
        {
            this.attackTimer -= jumpyGame.loop.delta;
            return;
        }

        if(this.attackingPlayer)
        {
            this.anims.play('slimeEnemyLevel' + this.level + 'AttackPlayer', true);
            this.attackTimer = 150;
        }
        else if(this.seesPlayer)
        {
            this.anims.play('slimeEnemyLevel' + this.level + 'DetectPlayer', true);
            if(this.scene.playerSprite.x > this.x)
            {
                this.flipX = true;
            }
            else
            {
                this.flipX = false;
            }
        }
        else
        {
            this.anims.play('slimeEnemyLevel' + this.level + 'Idle', true);
        }

        this.seesPlayer = false;
        this.attackingPlayer = false;
    }
}

class PickUp extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, objectProperties)
    {
        super(scene, x, y, objectProperties.spriteName);
        scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        this.body.allowGravity = false;
        this.body.immovable = true;
        this.pickUpType = objectProperties.pickUpType;
        this.body.setCircle(this.body.width/2);
    }

    getPickedUp(player, pickUp)
    {
        switch(pickUp.pickUpType)
        {
            case "doubleJump":
                player.getDoubleJump();
                uIDict.inGameUI.setCurrentPickUpByKey('doubleJumpUI');
                break;
            default:
                console.log("Bad pickUpType value on PickUp!");
                break;
        }

        pickUp.destroy();
    }

    addPlayerCollider(player)
    {
        this.scene.physics.add.collider(player, this, this.getPickedUp, null, this.scene);
    }
}

class Spike extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, objectProperties)
    {
        super(scene, x, y, objectProperties.spriteName);
        scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        this.body.allowGravity = false;
        this.body.immovable = true;

        switch(objectProperties.direction)
        {
            case "right":
                this.setOrigin(0, 1);
                break;
            case "left":
                this.setOrigin(-3, 1);
                break;
            case "down":
                this.setOrigin(0, 4);
                break;
            case "up":
                this.setOrigin(0, 1);
                break;
            default:
                console.log("Spike instantiated with a bad direction.");
                break;
        }
    }

    getCollidedWith(player, spike)
    {
        this.scene.scene.playerSprite.playerDie(this.scene.scene);
    }

    addPlayerCollider(player)
    {
        this.scene.physics.add.collider(player, this, this.getCollidedWith, null, this.scene);
    }
}

class ExpBar
{
    constructor (scene, x, y)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.percentageOfExp = 0;

        this.x = x;
        this.y = y;

        this.draw();

        scene.add.existing(this.bar);
    }

    setExp(currentExp, maxExp)
    {
        this.percentageOfExp = currentExp / maxExp;
        this.draw();
    }

    clearExpBar()
    {
        this.bar.clear();
    }

    draw()
    {
        var someFloat = 22.5;
        this.bar.clear();

        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 44, 11);

        this.bar.fillStyle(0x483D8B);
        this.bar.fillRect(this.x + 1, this.y + 1, 42, 9);

        this.bar.fillStyle(0x9370DB);
        this.bar.fillRect(this.x + 1, this.y + 1, this.percentageOfExp * 42, 9);
    }
}
