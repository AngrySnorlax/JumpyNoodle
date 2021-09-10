var scene;
var currentLevelKey;

class InGameUI extends Phaser.Scene {

	constructor()
    {
		super({key:'inGameUI'});
		uIDict.inGameUI = this;
	}

    onWake(sys, data)
    {
        currentLevelKey = data.currentLevelKey;
		this.setCurrentPickUpByKey('emptySprite');
    }

	create()
    {
        scene = this;
        this.events.on('wake', this.onWake, this);

        var pauseButton = scene.add.sprite(this.cameras.main.width - 10, 10, 'pauseButton');
        pauseButton.setInteractive({ useHandCursor: false });
        pauseButton.setOrigin(1, 0);
        pauseButton.on('pointerdown', () => scene.pauseGame());

		this.playerExp = new ExpBar(this, 15, 40);

		this.playerLevel = this.add.text(44, 25, '', { color: '#3d5e66', fontFamily: 'JumpyFont' });
		this.playerLevel.setOrigin(0.5, 0.5);
		this.playerLevel.setPadding(2, 2);
		this.playerLevel.setFontSize(26);

		this.playerLevelPrefix = this.add.text(30, 20, 'Lvl', { color: '#3d5e66', fontFamily: 'JumpyFont' });
		this.playerLevelPrefix.setOrigin(0.5, 0.5);
		this.playerLevelPrefix.setPadding(2, 2);
		this.playerLevelPrefix.setFontSize(12);

		var pickUpUI = scene.add.sprite(68, 22, 'pickUpUI');
		pickUpUI.setOrigin(0.5, 0.5);
		this.currentPickUp = scene.add.sprite(68, 22, 'emptySprite');
		this.currentPickUp.setOrigin(0.5, 0.5);
	}

	updateInGameUI(playerLevel, playerExp, maxExp)
	{
		this.playerLevel.setText(playerLevel);
		this.playerExp.setExp(playerExp, maxExp);
	}

	setCurrentPickUpByKey(pickUpSpriteKey)
	{
		this.currentPickUp.setTexture(pickUpSpriteKey);
	}

	clearExpBar()
	{
		this.playerLevel.setText(3);
		this.playerExp.clearExpBar();
	}

    pauseGame()
    {
        this.scene.wake('pauseMenu', { currentLevelKey: currentLevelKey });
        this.scene.pause(currentLevelKey);
    }
}

export default InGameUI;
