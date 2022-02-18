class Title extends Phaser.Scene {
    constructor(){
        super("Title")
    }
    preload(){
        this.load.image('img', 'assets/TitleScreen/background.jpg');
        this.load.image('bhut', 'assets/TitleScreen/bhutTitle.png');
        this.load.image('intro', 'assets/TitleScreen/intro.png');
        this.load.image('inst', 'assets/TitleScreen/instructions.png');
        this.load.audio('dadada', './assets/TitleScreen/village.ogg')
    }
    create(){
        const music = this.sound.add('dadada')
        music.play();

        this.add.image(600, 200, 'img');
        this.add.image(180, 200, 'intro');
        this.add.image(300, 50, 'bhut');
        this.add.image(480, 200, 'inst');

        this.input.keyboard.on('keydown-SPACE', function (event) {
            music.destroy();
            BhutVille.scene.stop("Title");
            BhutVille.scene.start("KingsGate");
        });
    }
}