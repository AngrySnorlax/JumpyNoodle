// Import Scene Scripts
import Preloader from './preloader.js';
import MaineMenu from './mainMenu.js';
import LevelScene from './levelScene.js';
import InGameUI from './inGameUI.js';
import PauseMenu from './pauseMenu.js';
import StartofLevelUI from './startOfLevelUI.js';

var preloader = new Preloader();
var mainMenu = new MaineMenu();
var levelScene = new LevelScene();
var inGameUI = new InGameUI();
var pauseMenu = new PauseMenu();
var startofLevelUI = new StartofLevelUI();

// Config Object
var config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 400,
    height: 250,
    backgroundColor: '#91c9ff',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 650 }
        },
    },
    scale: {
        zoom: 2,
    },
    antialias: false
};

// Initialize Game Variable
jumpyGame = new Phaser.Game(config);

// Load scenes
jumpyGame.scene.add('preloader', preloader);
jumpyGame.scene.add('mainMenu', mainMenu);
jumpyGame.scene.add("levelScene", levelScene);
jumpyGame.scene.add("inGameUI", inGameUI);
jumpyGame.scene.add("puaseMenu", pauseMenu);
jumpyGame.scene.add("startofLevelUI", startofLevelUI);

// Start Preloader Scene which transitions to Main Menu
jumpyGame.scene.start('preloader');
