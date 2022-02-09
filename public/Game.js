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
    this.load.spritesheet('speak', 'assets/DialogInfo.png', { frameWidth: 20, frameHeight: 16 });
    this.load.tilemapTiledJSON('map', 'assets/bhutvillev2.json');
    this.load.spritesheet('dude', 'assets/SpriteSheet.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('ramen', 'assets/oldMan3.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('market', 'assets/MarketSprite.png', { frameWidth: 16, frameHeight: 16 });
}




function create (){
    this.input.keyboard.on('keydown-ENTER', function (event) {
        GameMachine.Dialog(this);
    });

    const map = this.make.tilemap({key: 'map'});
    const floorTiles = map.addTilesetImage('TilesetFloor', 'floor');
    const buildingTiles = map.addTilesetImage('TilesetHouse', 'house');
    const layer1 = map.createLayer('Tile Layer 1', floorTiles, 0, 0)
    const layer2 = map.createLayer('fence', buildingTiles, 0, 0)
    const layer3 = map.createLayer('Tile Layer 2', buildingTiles, 0, 0)

    //add player sprite
    this.player = this.physics.add.sprite(60, 60, 'dude');
    this.player.setCollideWorldBounds(true);
    //ramen sprite
    this.ramen = this.physics.add.sprite(120, 60, 'ramen');
    this.ramen.setCollideWorldBounds(true);
    //market man sprite
    this.market = this.physics.add.sprite(200, 100, 'market');
    this.market.setCollideWorldBounds(true);
    //speakin icon
    this.speak = this.physics.add.sprite(0, 0, 'speak');
    
    //hitbox
    this.box = this.add.rectangle(this.player.x, this.player.y , 48, 8);
    this.physics.add.existing(this.box);

    //setting collision
    layer2.setCollisionByProperty({collide: true})
    layer3.setCollisionByProperty({collide: true})
    this.physics.add.collider(this.player, layer2)
    this.physics.add.collider(this.ramen, layer2)
    this.physics.add.collider(this.player, layer3)
    this.physics.add.collider(this.ramen, layer3)
    //this.physics.add.collider(this.player, this.ramen)

    //setting overlap
    this.physics.add.overlap(this.box, this.ramen, () => {this.ramen.destroy(); this.speak.destroy()})
    //this.physics.add.overlap(this.box, this.ramen, () => {this.ramen.destroy(); this.speak.destroy()})
    
    //controls
    cursors = this.input.keyboard.createCursorKeys();
    //console.log(Phaser);

    //Dialog Indicator animation
    this.anims.create({
        key: 'think',
        frames: this.anims.generateFrameNumbers('speak', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1
    });
}





function update (){
    this.keys = GameMachine.inDialog ? this.input.keyboard.addKeys('W,A,S,D') : this.input.keyboard.addKeys('W,A,S,D,F');
    //move dialog indicator around with ramen



    //used to speak to ramen
    if((this.player.x <= this.ramen.x + 30 && this.player.x >= this.ramen.x - 30 )
            &&
        (this.player.y <= this.ramen.y + 30 && this.player.y >= this.ramen.y - 30)){
            this.speak.y = this.ramen.y - 18
            this.speak.x = this.ramen.x
            this.speak.active && this.speak.anims.play('think', true);
            this.speak.visible = true;
                if(this.keys.F && this.keys.F.isDown){
                    GameMachine.Dialog(this);
                }
        } else if((this.player.x <= this.market.x + 30 && this.player.x >= this.market.x - 30 )
                &&
            (this.player.y <= this.market.y + 30 && this.player.y >= this.market.y - 30)){
                this.speak.y = this.market.y - 18
                this.speak.x = this.market.x
                this.speak.active && this.speak.anims.play('think', true);
                this.speak.visible = true;
                    if(this.keys.F && this.keys.F.isDown){
                        GameMachine.Dialog(this, 'market');
                    }
    } else {
        this.speak.visible = false
    }



    //player movement
    //going to have to add a 'compass' 
        //for directional attacks
    this.player.setVelocity(0);
    if(this.keys.W.isDown || cursors.up.isDown){
        cursors.shift.isDown
            ? this.player.setVelocityY(-200)
            : this.player.setVelocityY(-120)
    } 
    if(this.keys.S.isDown || cursors.down.isDown){
        cursors.shift.isDown
            ? this.player.setVelocityY(200)
            : this.player.setVelocityY(120)
    } 
    if(this.keys.A.isDown || cursors.left.isDown){
        cursors.shift.isDown
            ? this.player.setVelocityX(-200)
            : this.player.setVelocityX(-120)
    } 
    if (this.keys.D.isDown || cursors.right.isDown){
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