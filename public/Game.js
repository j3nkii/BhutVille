var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 640,
    height: 320,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            //debug: true
        }
    },
    scene: [Title, KingsGate]
};//end config
var cursors;
var keys;
var BhutVille = new Phaser.Game(config);