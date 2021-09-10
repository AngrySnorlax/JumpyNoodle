var levelNameText;
var extraText;

class StartOfLevelUI extends Phaser.Scene {

	constructor()
    {
		super({key:'startOfLevelUI'});
		uIDict.startOfLevelUI = this;
	}

    onWake(sys, data)
    {
        var centerOfScreenY = this.cameras.main.height/2;
        levelNameText.setText(data.levelName);
		levelNameText.y = centerOfScreenY + data.levelNameOffsetY;
		extraText.setText(data.extraText);
		extraText.y = centerOfScreenY + 50 + data.extraTextOffsetY;
    }

	create()
    {
        this.events.on('wake', this.onWake, this);

        var centerOfScreenX = this.cameras.main.width/2;
        var centerOfScreenY = this.cameras.main.height/2;
        levelNameText = this.add.text(centerOfScreenX, centerOfScreenY, "Some Level", { color: '#3d5e66', fontFamily: 'JumpyFont' });
        levelNameText.setOrigin(0.5,0.5);
		levelNameText.setPadding(2, 2);



		extraText = this.add.text(centerOfScreenX, centerOfScreenY + 50, "Jump to Start!", { color: '#3d5e66', fontFamily: 'JumpyFont' });
		extraText.setOrigin(0.5,0.5);
		extraText.setPadding(2, 2);
	}
}

export default StartOfLevelUI;
