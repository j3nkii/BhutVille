//const axios = require('axios')

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
    scene: {
        preload,
        create,
        update
    }
};//end config
var cursors;
var keys;
var game = new Phaser.Game(config);



function preload (){
    this.load.image('floor', 'assets/TilesetFloor.png');
    this.load.image('house', 'assets/TilesetHouse.png');
    this.load.spritesheet('speak', 'assets/DialogInfo.png', { frameWidth: 19, frameHeight: 16 });
    this.load.tilemapTiledJSON('map', 'assets/bhutvillev2.json');
    this.load.spritesheet('dude', 'assets/SpriteSheet.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('beast', 'assets/Beast.png', { frameWidth: 16, frameHeight: 16 });
}


function create (){
    const map = this.make.tilemap({key: 'map'});
    const floorTiles = map.addTilesetImage('TilesetFloor', 'floor');
    const buildingTiles = map.addTilesetImage('TilesetHouse', 'house');
    const layer1 = map.createLayer('Tile Layer 1', floorTiles, 0, 0)
    const layer2 = map.createLayer('fence', buildingTiles, 0, 0)
    const layer3 = map.createLayer('Tile Layer 2', buildingTiles, 0, 0)

    //add player sprite
    this.player = this.physics.add.sprite(60, 60, 'dude');
    this.beast = this.physics.add.sprite(120, 60, 'beast');

    this.speak = this.physics.add.sprite(0, 0, 'speak');
    
    this.player.setCollideWorldBounds(true);
    this.beast.setCollideWorldBounds(true);

    //hitbox
    this.box = this.add.rectangle(this.player.x, this.player.y , 48, 8);
    this.physics.add.existing(this.box);

    //add dialog box
    

    //setting collision
    layer2.setCollisionByProperty({collide: true})
    layer3.setCollisionByProperty({collide: true})
    this.physics.add.collider(this.player, layer2)
    this.physics.add.collider(this.beast, layer2)
    this.physics.add.collider(this.player, layer3)
    this.physics.add.collider(this.beast, layer3)
    this.physics.add.collider(this.player, this.beast)

    //setting overlap
    this.physics.add.overlap(this.box, this.beast, () => this.beast.destroy())
    
    //controls
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys('W,A,S,D,F');
    console.log(this);

    this.anims.create({
        key: 'think',
        frames: this.anims.generateFrameNumbers('speak', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    console.log(this.speak);
}



function update (){
    this.speak.y = this.beast.y - 18
    this.speak.x = this.beast.x
    //player movement
    //going to have to add a 'compass' 
        //for directional attacks
    if((this.player.x <= this.beast.x + 30 && this.player.x >= this.beast.x - 30 )
            &&
        (this.player.y <= this.beast.y + 30 && this.player.y >= this.beast.y - 30)){
            this.speak.visible = true
        } else {
        this.physics.world.remove(this.speak.body)
        this.speak.visible = false
    }

    
    this.player.setVelocity(0);
    if(keys.W.isDown || cursors.up.isDown){
        cursors.shift.isDown
            ? this.player.setVelocityY(-200)
            : this.player.setVelocityY(-120)
    } 
    if(keys.S.isDown || cursors.down.isDown){
        cursors.shift.isDown
            ? this.player.setVelocityY(200)
            : this.player.setVelocityY(120)
    } 
    if(keys.A.isDown || cursors.left.isDown){
        cursors.shift.isDown
            ? this.player.setVelocityX(-200)
            : this.player.setVelocityX(-120)
    } 
    if (keys.D.isDown || cursors.right.isDown){
        cursors.shift.isDown
            ? this.player.setVelocityX(200)
            : this.player.setVelocityX(120)
    } //end movement
    //attacking
    if(cursors.space.isDown){
        this.physics.world.add(this.box.body)
        this.box.x = this.player.x
        this.box.y = this.player.y
    } else {
        this.physics.world.remove(this.box.body)
        this.box.body.enable = false
    }
    //this.physics.world.remove(this.box.body)
}



            //saving for later --- used for transitioning hit box
    // this.box.width = 8
    // this.box.height = 48
    // this.box.body.width = 8
    // this.box.body.height = 48

    //player animations
    // this.anims.create({
    //     key: 'left',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });
    // this.anims.create({
    //     key: 'turn',
    //     frames: [ { key: 'dude', frame: 4 } ],
    //     frameRate: 20
    // });
    // this.anims.create({
    //     key: 'right',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    //     frameRate: 10,
    //     repeat: -1
    // });