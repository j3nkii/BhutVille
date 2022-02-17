class KingsGate extends Phaser.Scene {
    constructor(){
        super("KingsGate")
    }
    //PRELOAD****************************************************************************************
    preload (){
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
        //dialog
        this.load.image('dialogbox', '/assets/Dialog/dialogbox.png')
        this.load.image('puppoFace', '/assets/Dialog/puppoFace.png')
        this.load.image('hermitFace', '/assets/Dialog/hermitFace.png')
        this.load.image('marketFace', '/assets/Dialog/marketFace.png')
        this.load.image('ramenFace', '/assets/Dialog/ramenFace.png')
        this.load.image('guardFace', '/assets/Dialog/guardFace.png')
        this.load.image('puppoDialog', '/assets/Dialog/puppoDialog.png')
    }

//CREATE****************************************************************************************
    create (){
    //Load game, pass Game to GM
        GameMachine.loadGame(this);
    //define keys
        this.keys = this.input.keyboard.addKeys('W,A,S,D');
        cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', function (event) {
            GameMachine.Dialog();
        });
        this.input.keyboard.on('keydown-ESC', function (event) {
            GameMachine.test();
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
    //used to change scene / OPEN DOOR
        GameMachine.layer12 = map.createLayer('doorbackground', [buildingTiles, floorTiles], 0, 0);
        GameMachine.layer13 = map.createLayer('openDoor', [buildingTiles, floorTiles], 0, 0);
        GameMachine.layer12.visible = false;
        GameMachine.layer13.visible = false;
    //SPRITES*************************************************
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
    //speakin icon
        this.speak = this.physics.add.sprite(0, 0, 'speak');
    //hitbox -- not used
        this.box = this.add.rectangle(this.player.x, this.player.y , 48, 8);
        this.physics.add.existing(this.box);
    //gate barricade
        this.gate = this.add.rectangle(450, 0, 80, 64);
        this.physics.add.existing(this.gate);
        this.gate.body.immovable = true
    //pass through door trigger
        this.door = this.add.rectangle(450, 0, 80, 30);
        this.physics.add.existing(this.door);
        this.gate.body.immovable = true;
    // dialog boxes
        this.dialogContainer = this.add.image(320, 230, 'dialogbox');
        this.puppoFaceset = this.add.image(65, 200, 'puppoFace');
        this.puppo1 = this.add.image(340, 215, 'puppoDialog');
            this.puppo1.visible = false;
            this.puppoFaceset.visible = false;
            this.dialogContainer.visible = false;

    //COLLISION***************************************************
    //setting collision
    //[layer1..2..3].map(layer => layer.setCollisionByProperty({collide: true}))
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
        this.physics.add.collider(this.player,
            [
                layer1,
                layer2,
                layer3,
                layer4,
                layer5,
                layer6,
                layer7,
                layer8,
                layer9,
                layer10,
                layer11,
                this.gate
            ]);
        //this.physics.add.overlap(this.box, this.guard, () => this.guard.destroy()); -- unused
        this.physics.add.overlap(this.door, this.player, () => GameMachine.test());
    //ANIMATIONS***************************************************
    //Dialog Indicator animation
        this.anims.create({
            key: 'think',
            frames: this.anims.generateFrameNumbers('speak', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        //puppo animation, flip is handled line 176 & 180
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('puppo', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });
    }





//UPDATE****************************************************************************************
    update (){
//HERMIT AUTOMATION*************************************
        if(GameMachine.player.hasHermit && !GameMachine.hermit.isSpeaking){
            if(Math.ceil(this.hermit.x) >= 495 && Math.ceil(this.hermit.y) >= 45){
                GameMachine.hermit.isReady = true;
                this.hermit.setVelocity(0)
            } else if(!GameMachine.hermit.isReady){
                this.physics.moveTo(this.hermit, 496, 46, 90)
            }
        }
    //PUPPO AUTOMATION***************************************
        if(this.puppo.x === 225){
            this.physics.moveTo(this.puppo, 360, 90, 30);
            this.puppo.anims.play('right', true);
            this.puppo.flipX = false;
        } else if(this.puppo.x === 360){
            this.physics.moveTo(this.puppo, 225, 90, 30);
            this.puppo.anims.play('right', true);
            this.puppo.flipX = true;
        }
    //NPC DIALOG HELPER***************************************
    //used to throw speak sprite above npcs ++ used to pass the in range npc to dialog function
                //... lots of repeat code ...\\
                //could use "area boxes" instead in future refactor
        if((this.player.x <= this.ramen.x + 30 && this.player.x >= this.ramen.x - 30 )
                    &&
                (this.player.y <= this.ramen.y + 30 && this.player.y >= this.ramen.y - 30)){
            this.speak.y = this.ramen.y - 18
            this.speak.x = this.ramen.x
            this.speak.active && this.speak.anims.play('think', true);
            this.speak.visible = true;
            GameMachine.speaker = 'ramen';
        } else if((this.player.x <= this.market.x + 30 && this.player.x >= this.market.x - 30 )
                    &&
                (this.player.y <= this.market.y + 30 && this.player.y >= this.market.y - 30)){
            this.speak.y = this.market.y - 18
            this.speak.x = this.market.x
            this.speak.active && this.speak.anims.play('think', true);
            this.speak.visible = true;
            GameMachine.speaker = 'market';
        } else if((this.player.x <= this.hermit.x + 30 && this.player.x >= this.hermit.x - 30 )
                    &&
                (this.player.y <= this.hermit.y + 30 && this.player.y >= this.hermit.y - 30)){
            this.speak.y = this.hermit.y - 18
            this.speak.x = this.hermit.x
            this.speak.active && this.speak.anims.play('think', true);
            this.speak.visible = true;
            GameMachine.speaker = 'hermit';
        } else if((this.player.x <= this.guard.x + 30 && this.player.x >= this.guard.x - 30 )
                    &&
                (this.player.y <= this.guard.y + 30 && this.player.y >= this.guard.y - 30)){
            this.speak.y = this.guard.y - 18
            this.speak.x = this.guard.x
            this.speak.active && this.speak.anims.play('think', true);
            this.speak.visible = true;
            GameMachine.speaker = 'guard';
        }else if((this.player.x <= this.puppo.x + 30 && this.player.x >= this.puppo.x - 30 )
                    &&
                (this.player.y <= this.puppo.y + 30 && this.player.y >= this.puppo.y - 30)){
            this.speak.y = this.puppo.y - 18
            this.speak.x = this.puppo.x
            this.speak.active && this.speak.anims.play('think', true);
            this.speak.visible = true;
            GameMachine.speaker = 'puppo';
    } else {//remove speak sprite when player walks away, destroy dialog if exists
            this.speak.visible = false;
            if(GameMachine.inDialog){
                GameMachine.Dialog();
            }
        }
    //PLAYER MOVEMENT***************************************
        //going to have to add a 'compass' 
            //for directional attacks -- unused
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
    //     if(cursors.space.isDown){
    //         this.physics.world.add(this.box.body)
    //         this.box.x = this.player.x
    //         this.box.y = this.player.y
    //     } else {
    //         this.physics.world.remove(this.box.body)
    //         this.box.body.enable = false
    //     }
    // }
    }
}