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
            debug: true
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
    //maps
    this.load.tilemapTiledJSON('map', 'assets/bhutvillev3.json');
    this.load.image('floor', 'assets/TilesetFloor.png');
    this.load.image('house', 'assets/TilesetHouse.png');
    this.load.image('water', 'assets/TilesetWater.png');
    this.load.image('nature', 'assets/TilesetNature.png');
    this.load.image('element', 'assets/TilesetElement.png');

    //sprites
    this.load.spritesheet('speak', 'assets/DialogInfo.png', { frameWidth: 20, frameHeight: 16 });
    this.load.spritesheet('dude', 'assets/SpriteSheet.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('ramen', 'assets/oldMan3.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('market', 'assets/MarketSprite.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('hermit', 'assets/hermit.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('guard', 'assets/knight.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('puppo', 'assets/puppo.png', { frameWidth: 16, frameHeight: 16 });
}




function create (){
    GameMachine.loadGame();

    this.input.keyboard.on('keydown-ENTER', function (event) {
        GameMachine.Dialog(this);
        this.hermit.moves();
    });
        //used for testing autoSave
    this.input.keyboard.on('keydown-Y', function (event) {
        GameMachine.autoSave();
    });

    //map
    const map = this.make.tilemap({key: 'map'});
    //tilesets
    const floorTiles = map.addTilesetImage('TilesetFloor', 'floor');
    const buildingTiles = map.addTilesetImage('TilesetHouse', 'house');
    const waterTiles = map.addTilesetImage('TilesetWater', 'water');
    const natureTiles = map.addTilesetImage('TilesetNature', 'nature');
    const elementTiles = map.addTilesetImage('TilesetElement', 'element');
    //layers
    const layer1 = map.createLayer('grass', [floorTiles, waterTiles], 0, 0);
    const layer2 = map.createLayer('fence', [buildingTiles, waterTiles, elementTiles], 0, 0);
    const layer3 = map.createLayer('tree1', [buildingTiles,floorTiles, natureTiles], 0, 0)
    const layer4 = map.createLayer('tree2', [natureTiles], 0, 0);
    const layer5 = map.createLayer('tree3', natureTiles, 0, 0);
    const layer6 = map.createLayer('tree4', natureTiles, 0, 0);
    const layer7 = map.createLayer('tree5', natureTiles, 0, 0);
    const layer8 = map.createLayer('tree6', natureTiles, 0, 0);
    const layer9 = map.createLayer('tree7', natureTiles, 0, 0);
    const layer10 = map.createLayer('buildings', [buildingTiles, elementTiles], 0, 0);
    const layer11 = map.createLayer('towertop', [buildingTiles, elementTiles], 0, 0);

    //ramen sprite
    this.ramen = this.physics.add.sprite(80, 120, 'ramen');
    this.ramen.setCollideWorldBounds(true);
    //market man sprite
    this.market = this.physics.add.sprite(430, 245, 'market');
    this.market.setCollideWorldBounds(true);
    //market man sprite
    this.hermit = this.physics.add.sprite(200, 80, 'hermit');
    this.hermit.setCollideWorldBounds(true);
    //market man sprite
    this.guard = this.physics.add.sprite(480, 60, 'guard');
    this.guard.setCollideWorldBounds(true);
    //add player sprite
    this.player = this.physics.add.sprite(225, 290, 'dude');
    this.player.setCollideWorldBounds(true);
    //add puppo sprite
    this.puppo = this.physics.add.sprite(225, 90, 'puppo');
    this.puppo.setCollideWorldBounds(true);
    if(this.puppo.x === 225){
        this.physics.moveTo(this.puppo, 230, 90);
    } else if(this.puppo.x === 230){
        this.physics.moveTo(this.puppo, 225, 90);
    }
    //speakin icon
    this.speak = this.physics.add.sprite(0, 0, 'speak');
    //hitbox
    this.box = this.add.rectangle(this.player.x, this.player.y , 48, 8);
    this.physics.add.existing(this.box);

    //setting collision
    layer1.setCollisionByProperty({collide: true})
    layer2.setCollisionByProperty({collide: true})
    layer3.setCollisionByProperty({collide: true})
    layer4.setCollisionByProperty({collide: true})
    layer5.setCollisionByProperty({collide: true})
    layer6.setCollisionByProperty({collide: true})
    layer7.setCollisionByProperty({collide: true})
    layer8.setCollisionByProperty({collide: true})
    layer9.setCollisionByProperty({collide: true})
    layer10.setCollisionByProperty({collide: true})
    layer11.setCollisionByProperty({collide: true})
    this.physics.add.collider(this.player, layer1)
    this.physics.add.collider(this.player, layer2)
    this.physics.add.collider(this.player, layer3)
    this.physics.add.collider(this.player, layer4)
    this.physics.add.collider(this.player, layer5)
    this.physics.add.collider(this.player, layer6)
    this.physics.add.collider(this.player, layer7)
    this.physics.add.collider(this.player, layer8)
    this.physics.add.collider(this.player, layer9)
    this.physics.add.collider(this.player, layer10)
    this.physics.add.collider(this.player, layer11)

    //setting overlap
    this.physics.add.overlap(this.box, this.ramen, () => {this.ramen.destroy(); this.speak.destroy()});

    //controls
    cursors = this.input.keyboard.createCursorKeys();

    //Dialog Indicator animation
    this.anims.create({
        key: 'think',
        frames: this.anims.generateFrameNumbers('speak', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('puppo', { start: 0, end: 1 }),
        frameRate: 4,
        repeat: -1
    });
}





function update (){
    if(this.hermit.x === 400){this.hermit.body.stop();}
    if(this.puppo.x === 225){
        this.physics.moveTo(this.puppo, 360, 90, 30);
        this.puppo.anims.play('right', true);
        this.puppo.flipX = false;
    } else if(this.puppo.x === 360){
        this.physics.moveTo(this.puppo, 225, 90, 30);
        this.puppo.anims.play('right', true);
        this.puppo.flipX = true;
    }
    this.keys = GameMachine.inDialog ? this.input.keyboard.addKeys('W,A,S,D') : this.input.keyboard.addKeys('W,A,S,D,F');
    //move dialog indicator around with ramen



    //used to speak to characters --- turn into function, pass in nearby char with "hitbox" style bodies

                //set *new*inrange* overlap and pass it to a function with logic below
    if((this.player.x <= this.ramen.x + 30 && this.player.x >= this.ramen.x - 30 )
                &&
            (this.player.y <= this.ramen.y + 30 && this.player.y >= this.ramen.y - 30)){
        this.speak.y = this.ramen.y - 18
        this.speak.x = this.ramen.x
        this.speak.active && this.speak.anims.play('think', true);
        this.speak.visible = true;
            if(this.keys.F && this.keys.F.isDown){
                GameMachine.speaker = 'ramen';
                GameMachine.Dialog(this);
                console.log(this.keys);
            }
    } else if((this.player.x <= this.market.x + 30 && this.player.x >= this.market.x - 30 )
                &&
            (this.player.y <= this.market.y + 30 && this.player.y >= this.market.y - 30)){
        this.speak.y = this.market.y - 18
        this.speak.x = this.market.x
        this.speak.active && this.speak.anims.play('think', true);
        this.speak.visible = true;
            if(this.keys.F && this.keys.F.isDown){
                GameMachine.speaker = 'market';
                GameMachine.Dialog(this);
            }
    } else if((this.player.x <= this.hermit.x + 30 && this.player.x >= this.hermit.x - 30 )
                &&
            (this.player.y <= this.hermit.y + 30 && this.player.y >= this.hermit.y - 30)){
        this.speak.y = this.hermit.y - 18
        this.speak.x = this.hermit.x
        this.speak.active && this.speak.anims.play('think', true);
        this.speak.visible = true;
            if(this.keys.F && this.keys.F.isDown){
                GameMachine.speaker = 'hermit';
                GameMachine.Dialog(this);
            }
    } else if((this.player.x <= this.guard.x + 30 && this.player.x >= this.guard.x - 30 )
                &&
            (this.player.y <= this.guard.y + 30 && this.player.y >= this.guard.y - 30)){
        this.speak.y = this.guard.y - 18
        this.speak.x = this.guard.x
        this.speak.active && this.speak.anims.play('think', true);
        this.speak.visible = true;
        if(this.keys.F && this.keys.F.isDown){
            GameMachine.speaker = 'guard';
            GameMachine.Dialog(this);
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