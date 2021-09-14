var levelButtons = [];
var leftArrowButtonImage;
var rightArrowButtonImage;
var firstDisplayedLevelIndex;

var scene;

class MaineMenu extends Phaser.Scene {

	constructor() {
		super({key:'mainMenu'});
		this.buttonsInstantiated = false;
	}

	create()
	{
		localStorage.clear();

		scene = this;
		firstDisplayedLevelIndex = 1;

		var mainMenuBG = this.add.sprite(0,0,'mainMenuBG');
		mainMenuBG.setOrigin(0,0);

		this.instantiateButtons();
		setButtons();

		var centerOfScreenX = this.cameras.main.width/2;

		var gameTitleText = this.add.text(200, 50, jumpyGameTitle, { color: '#3d5e66', fontFamily: 'JumpyFont' });
		gameTitleText.setOrigin(0.5,0.5);
		gameTitleText.setPadding(2);

		this.cameras.main.fadeIn(340, 0, 0, 0);
	}

	instantiateButtons()
	{
		var centerOfScreenX = this.cameras.main.width/2;
		var buttonPositionX = centerOfScreenX - 100;
		var buttonPositionY = 160;

		leftArrowButtonImage = this.add.sprite(centerOfScreenX - 140, 200, 'leftArrowButton');
		leftArrowButtonImage.setInteractive({ useHandCursor: false });
		leftArrowButtonImage.visible = false;
		leftArrowButtonImage.on('pointerdown', () => leftArrowButton());

		rightArrowButtonImage = this.add.sprite(centerOfScreenX + 140, 200, 'rightArrowButton');
		rightArrowButtonImage.setInteractive({ useHandCursor: false });
		rightArrowButtonImage.visible = false;
		rightArrowButtonImage.on('pointerdown', () => rightArrowButton());

		for(var i = 0; i < 10; i++)
		{
			var buttonImage = this.add.sprite(buttonPositionX, buttonPositionY, 'buttonTemplate');
			buttonImage.setInteractive({ useHandCursor: false });
			buttonImage.visible = false;

			var bbSlimeImages = [];

			for(var j = 0; j < 15; j++)
			{
				bbSlimeImages.push(this.add.sprite(buttonPositionX, buttonPositionY, 'bbSlime'));
				bbSlimeImages[j].visible = false;
			}

			var buttonText = this.add.text(buttonPositionX + 1, buttonPositionY, "X", { color: '#3d5e66', fontFamily: 'JumpyFont' });;
			buttonText.setOrigin(0.5,0.5);
			buttonText.visible = false;

			levelButtons[i] = {
				levelSceneDefinitionIndex: null,
				buttonImage: buttonImage,
				buttonText: buttonText,
				bbSlimeImages: bbSlimeImages,
			};

			( function(index){
				buttonImage.on('pointerdown', () => levelSelectButton(levelButtons[index]));
			}
			)(i)

			buttonPositionX+= 44;

			if(i == 4)
			{
				buttonPositionX = centerOfScreenX - 80;
				buttonPositionY+= 48;
			}
		}
	}
}

function setButtons()
{
	if(firstDisplayedLevelIndex <= 1)
	{
		leftArrowButtonImage.visible = false;
	}
	else
	{
		leftArrowButtonImage.visible = true;
	}

	if((levelManager.levelDefinitions.length - firstDisplayedLevelIndex) < 11)
	{
		rightArrowButtonImage.visible = false;
	}
	else
	{
		rightArrowButtonImage.visible = true;
	}

    for(var i = 0; i < levelButtons.length; i++)
    {
		if(i + firstDisplayedLevelIndex >= levelManager.levelDefinitions.length)
		{
			levelButtons[i].levelSceneDefinitionIndex = 0;
			levelButtons[i].buttonImage.visible = false;
			levelButtons[i].buttonText.visible = false;
			levelButtons[i].buttonText.setText("X");

			for(var j = 0; j < levelButtons[i].bbSlimeImages.length; j++)
			{
				levelButtons[i].bbSlimeImages[j].visible = false;
			}
		}
		else
		{
			setButton(levelButtons[i], i + firstDisplayedLevelIndex);
		}
    }
}

function setButton(buttonData, levelIndex)
{
	buttonData.levelSceneDefinitionIndex = levelIndex;
	buttonData.buttonImage.visible = true;
	buttonData.buttonText.visible = true;
	buttonData.buttonText.setText(levelManager.levelDefinitions[levelIndex].levelNameShortened);

	var bbSlimeImageOffsetX = 0;
	var bbSlimeImageOffsetY = 16;

	if(levelManager.levelDefinitions[levelIndex].numberOfSlimes < 5)
	{
		bbSlimeImageOffsetX = (-3.5)*(levelManager.levelDefinitions[levelIndex].numberOfSlimes - 1)
	}
	else
	{
		bbSlimeImageOffsetX = -14;
	}

	for(var j = 0; j < buttonData.bbSlimeImages.length; j++)
	{
		if(j < levelManager.levelDefinitions[levelIndex].numberOfSlimes)
		{
			buttonData.bbSlimeImages[j].visible = true;
			buttonData.bbSlimeImages[j].setPosition(buttonData.buttonImage.x + bbSlimeImageOffsetX, buttonData.buttonImage.y + bbSlimeImageOffsetY);

			if(levelManager.levelDefinitions[levelIndex].levelName in jumpySaveData.slimeData &&
				j < jumpySaveData.slimeData[levelManager.levelDefinitions[levelIndex].levelName].length)
			{
				buttonData.bbSlimeImages[j].setTexture('bbSlime');
			}
			else
			{

				buttonData.bbSlimeImages[j].setTexture('bbSlimeDarkedOut');
			}

			bbSlimeImageOffsetX += 7;

			if(bbSlimeImageOffsetX > 14)
			{
				bbSlimeImageOffsetX = -14;
				bbSlimeImageOffsetY += 6;
			}
		}
		else
		{
			buttonData.bbSlimeImages[j].visible = false;
		}
	}
}

function levelSelectButton(buttonData)
{
	scene.scene.stop('mainMenu')
	levelManager.currentLevelIndex = buttonData.levelSceneDefinitionIndex;
	scene.scene.start("levelScene");
	clearLevelButtonArray();
}

function rightArrowButton()
{
	if((firstDisplayedLevelIndex + 10) > levelManager.levelDefinitions.length)
	{
		return;
	}

	firstDisplayedLevelIndex += 10;
	setButtons();
}

function leftArrowButton()
{
	if(firstDisplayedLevelIndex <= 1)
	{
		return;
	}

	firstDisplayedLevelIndex -= 10;
	setButtons();
}

function clearLevelButtonArray()
{
	for(var i = 0; i < levelButtons.length; i++)
	{
		levelButtons[i].levelSceneDefinitionIndex = null;
		levelButtons[i].buttonImage.destroy();
		levelButtons[i].buttonText.destroy();
		levelButtons[i].buttonImage = null;
		levelButtons[i].buttonText = null;

		for(var j = 0; j < levelButtons[i].bbSlimeImages.length; j++)
		{
			levelButtons[i].bbSlimeImages[j].destroy();
		}

		levelButtons[i].bbSlimeImages = null;
	}
}

function sceneSelectButton(scene, sceneName) {
    scene.scene.start(sceneName);
}

export default MaineMenu;
