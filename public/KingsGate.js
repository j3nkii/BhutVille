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
        this.load.image('dialogBox', '/assets/Dialog/dialogBox.png');
        this.load.image('puppoFace', '/assets/Dialog/puppoFace.png');
        this.load.image('hermitFace', '/assets/Dialog/hermitFace.png');
        this.load.image('marketFace', '/assets/Dialog/marketFace.png');
        this.load.image('ramenFace', '/assets/Dialog/ramenFace.png');
        this.load.image('guardFace', '/assets/Dialog/guardFace.png');
        this.load.image('puppoDialog', '/assets/Dialog/puppoDialog.png');
        this.load.image('ramenD1', '/assets/Dialog/ramenD1.png');
        this.load.image('ramenD2', '/assets/Dialog/ramenD2.png');
        this.load.image('ramenD3', '/assets/Dialog/ramenD3.png');
        this.load.image('marketD1', '/assets/Dialog/marketD1.png');
        this.load.image('marketD2', '/assets/Dialog/marketD2.png');
        this.load.image('marketD3', '/assets/Dialog/marketD3.png');
        this.load.image('marketD4', '/assets/Dialog/marketD4.png');
        this.load.image('guardD1', '/assets/Dialog/guardD1.png');
        this.load.image('guardD2', '/assets/Dialog/guardD2.png');
        this.load.image('hermitD1', '/assets/Dialog/hermitD1.png');
        this.load.image('hermitD2', '/assets/Dialog/hermitD2.png');
        this.load.image('hermitD3', '/assets/Dialog/hermitD3.png');
        this.load.image('hermitD4', '/assets/Dialog/hermitD4.png');
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
            GameMachine.sceneTransition();
        });
    //create map
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
        //this.puppo.setCollideWorldBounds(true); -- dog tends to run off
    //speakin icon
        this.speak = this.physics.add.sprite(0, 0, 'speak');
    //hitbox -- not used
        this.ramenBox = this.add.rectangle(this.ramen.x, this.ramen.y , 48, 48);
        this.physics.add.existing(this.ramenBox);
    //hitbox -- not used
        this.hermitBox = this.add.rectangle(this.hermit.x, this.hermit.y , 48, 48);
        this.physics.add.existing(this.hermitBox);
    //hitbox -- not used
        this.guardBox = this.add.rectangle(this.guard.x, this.guard.y , 48, 48);
        this.physics.add.existing(this.guardBox);
    //hitbox -- not used
        this.marketBox = this.add.rectangle(this.market.x, this.market.y , 48, 48);
        this.physics.add.existing(this.marketBox);
    //hitbox -- not used
        this.puppoBox = this.add.rectangle(this.puppo.x, this.puppo.y , 48, 48);
        this.physics.add.existing(this.puppoBox);
        
    //gate barricade
        this.gate = this.add.rectangle(450, 0, 80, 64);
        this.physics.add.existing(this.gate);
        this.gate.body.immovable = true
    //gate trigger
        this.door = this.add.rectangle(450, 0, 80, 30);
        this.physics.add.existing(this.door);
        this.gate.body.immovable = true;
    // dialog boxes
        this.dialogContainer = this.add.image(320, 230, 'dialogBox');
        this.puppoFaceset = this.add.image(65, 200, 'puppoFace');
        this.ramenFaceset = this.add.image(65, 200, 'ramenFace');
        this.hermitFaceset = this.add.image(65, 200, 'hermitFace');
        this.marketFaceset = this.add.image(65, 200, 'marketFace');
        this.guardFaceset = this.add.image(65, 200, 'guardFace');
    //dialogs
        //puppo
        this.puppo1 = this.add.image(340, 215, 'puppoDialog');
        //ramen
        this.ramenD1 = this.add.image(350, 230, 'ramenD1');
        this.ramenD2 = this.add.image(350, 230, 'ramenD2');
        this.ramenD3 = this.add.image(350, 230, 'ramenD3');
        //market
        this.marketD1 = this.add.image(350, 230, 'marketD1');
        this.marketD2 = this.add.image(350, 230, 'marketD2');
        this.marketD3 = this.add.image(350, 230, 'marketD3');
        this.marketD4 = this.add.image(350, 230, 'marketD4');
        //guard
        this.guardD1 = this.add.image(350, 230, 'guardD1');
        this.guardD2 = this.add.image(350, 230, 'guardD2');
        //hermit
        this.hermitD1 = this.add.image(350, 230, 'hermitD1');
        this.hermitD2 = this.add.image(350, 230, 'hermitD2');
        this.hermitD3 = this.add.image(350, 230, 'hermitD3');
        this.hermitD4 = this.add.image(350, 230, 'hermitD4');

        //hide dialogs
            this.dialogContainer.visible = false;
            this.puppoFaceset.visible = false;
            this.ramenFaceset.visible = false;
            this.marketFaceset.visible = false;
            this.guardFaceset.visible = false;
            this.hermitFaceset.visible = false;
            this.puppo1.visible = false;
            this.ramenD1.visible = false;
            this.ramenD2.visible = false;
            this.ramenD3.visible = false;
            this.marketD1.visible = false;
            this.marketD2.visible = false;
            this.marketD3.visible = false;
            this.marketD4.visible = false;
            this.guardD1.visible = false;
            this.guardD2.visible = false;
            this.hermitD1.visible = false;
            this.hermitD2.visible = false;
            this.hermitD3.visible = false;
            this.hermitD4.visible = false;

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
        this.physics.add.overlap(this.door, this.player, (event) => {  
            GameMachine.sceneTransition();
        }); 
        this.physics.add.overlap(this.player, 
            [this.ramenBox, this.hermitBox, this.guardBox, this.marketBox, this.puppoBox],
            (event) => {  
            console.log(event);
            console.log(this);
        });
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
                //could use "area boxes" instead in future refactor in 
        if((this.player.x <= this.ramen.x + 30 && this.player.x >= this.ramen.x - 30 )
                    &&
                (this.player.y <= this.ramen.y + 30 && this.player.y >= this.ramen.y - 30)){
            GameMachine.speakBubble(this.ramen);
            GameMachine.speaker = 'ramen' ;
        } else if((this.player.x <= this.market.x + 30 && this.player.x >= this.market.x - 30 )
                    &&
                (this.player.y <= this.market.y + 30 && this.player.y >= this.market.y - 30)){
            GameMachine.speakBubble(this.market);
            GameMachine.speaker = 'market';
        } else if((this.player.x <= this.hermit.x + 30 && this.player.x >= this.hermit.x - 30 )
                    &&
                (this.player.y <= this.hermit.y + 30 && this.player.y >= this.hermit.y - 30)
                    && !GameMachine.hermit.isReady){
            GameMachine.speakBubble(this.hermit);
            GameMachine.speaker = 'hermit';
        } else if((this.player.x <= this.guard.x + 30 && this.player.x >= this.guard.x - 30 )
                    &&
                (this.player.y <= this.guard.y + 30 && this.player.y >= this.guard.y - 30)){
                GameMachine.speakBubble(this.guard);
            GameMachine.speaker = 'guard';
        }else if((this.player.x <= this.puppo.x + 30 && this.player.x >= this.puppo.x - 30 )
                    &&
                (this.player.y <= this.puppo.y + 30 && this.player.y >= this.puppo.y - 30)){
            GameMachine.speakBubble(this.puppo);
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