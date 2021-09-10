var currentLevelKey;
var scene;

class PauseMenu extends Phaser.Scene {

	constructor()
    {
		super({key:'pauseMenu'});
		uIDict.pauseMenu = this;
	}

    onWake(sys, data)
    {
        currentLevelKey = data.currentLevelKey;
    }

	create() {
        scene = this;
        this.events.on('wake', this.onWake, this);

        var text = this.add.text(200,50, 'Pause', { color: '#3d5e66', fontFamily: 'JumpyFont' });
        text.setOrigin(0.5,0.5);
		text.setPadding(2, 2);

        var pauseButton = scene.add.sprite(this.cameras.main.width - 10, 10, 'pauseButton');
        pauseButton.setInteractive({ useHandCursor: false });
        pauseButton.setOrigin(1, 0);
        pauseButton.on('pointerdown', () => scene.unpause());

        var centerOfScreenX = this.cameras.main.width/2;
        var centerOfScreenY = this.cameras.main.height/2;
        var resumeButton = scene.add.sprite(centerOfScreenX, centerOfScreenY + 45, 'longButtonTemplate');
        resumeButton.setInteractive({ useHandCursor: false });
        resumeButton.setOrigin(0.5, 0.5);
        resumeButton.on('pointerdown', () => scene.unpause());
        var resumeButtonText = scene.add.text(centerOfScreenX, centerOfScreenY + 45, "Resume", { color: '#3d5e66', fontFamily: 'JumpyFont' });
        resumeButtonText.setOrigin(0.5,0.5);
		resumeButtonText.setPadding(2, 2);

        var mainMenuButton = scene.add.sprite(centerOfScreenX, centerOfScreenY + 80, 'longButtonTemplate');
        mainMenuButton.setInteractive({ useHandCursor: false });
        mainMenuButton.setOrigin(0.5, 0.5);
        mainMenuButton.on('pointerdown', () => scene.goToMainMenu());
        var mainMenuButtonText = scene.add.text(centerOfScreenX, centerOfScreenY + 80, "Main Menu", { color: '#3d5e66', fontFamily: 'JumpyFont' });
        mainMenuButtonText.setOrigin(0.5,0.5);
		mainMenuButtonText.setPadding(2, 2);

        this.input.keyboard.on('keydown-' + 'ESC', function (event) {
            scene.unpause();
        });

        scene.input.keyboard.on('keydown-' + 'P', function (event) {
            scene.unpause();
        });
	}

    unpause()
    {
        scene.scene.resume(currentLevelKey, { goToMainMenu: false });
        scene.scene.sleep('pauseMenu');
    }

    goToMainMenu()
    {
        scene.scene.resume(currentLevelKey, { goToMainMenu: true });
        scene.scene.sleep('pauseMenu');
    }

	// restartLevel()
	// {
	// 	scene.scene.resume(currentLevelKey, { goToMainMenu: true });
	// 	scene.scene.sleep('pauseMenu');
	// }
}

export default PauseMenu;
