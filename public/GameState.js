//grabs query string
const queryString = window.location.search;
const GameMachine = {
    puppo: {isSpeaking: false},
    ramen: {isSpeaking: false, hasMet: false},
    market: {isSpeaking: false, hasMet: false},
    hermit: {isSpeaking: false, hasMet: false, isReady:false},
    guard: {isSpeaking: false, hasMet: false},
    player: {hasNote: false, hasSupplies: false, hasRamen:false, hasHermit: false},
    speaker: null,
    inDialog: false,
    dialog: null,
    Dialog: function(){
        switch (this.speaker) {
            //******************** RAMEN ********************\\
            case 'ramen':
                if(this.inDialog){
                    this.removeDialog();
                    this.ramen.isSpeaking = false;
                } else {
                    this.game.dialogContainer.visible = true;
                    this.game.ramenFaceset.visible = true;
                    this.ramen.isSpeaking = true;
                    this.inDialog = true;
                    if(!this.ramen.hasMet) {
                        this.game.ramenD1.visible = true;
                        this.ramen.hasMet = true;
                        this.player.hasNote = true;
                        this.autoSave();
                    }else if(this.ramen.hasMet && this.player.hasSupplies){
                        this.game.ramenD2.visible = true;
                        this.player.hasRamen = true;
                        this.autoSave();
                    } else if(this.ramen.hasMet && this.player.hasNote){
                        this.game.ramenD3.visible = true;
                    }
                }
                break;
            //******************** MARKET ********************\\
            case 'market':
                if(this.inDialog){
                    this.removeDialog();
                    this.market.isSpeaking = false;
                    this.speaker = null;
                } else {
                    this.game.dialogContainer.visible = true;
                    this.game.marketFaceset.visible = true;
                    this.market.isSpeaking = true;
                    this.inDialog = true;
                    if(!this.market.hasMet && !this.player.hasNote) {
                        this.game.marketD1.visible = true;
                        this.market.hasMet = true;
                        this.autoSave();
                    } else if(this.market.hasMet && this.player.hasNote){
                        this.game.marketD2.visible = true;
                        this.player.hasSupplies = true;
                        this.autoSave();
                    } else if(!this.market.hasMet && this.player.hasNote){
                        this.game.marketD3.visible = true;
                        this.market.hasMet = true;
                        this.player.hasSupplies = true;
                        this.autoSave();
                    } else if(this.market.hasMet && !this.player.hasNote){
                        this.game.marketD4.visible = true;
                    }
                }
                break;
            //******************** GUARD ********************\\
            case 'guard':
                if(this.inDialog){
                    this.removeDialog();
                    this.guard.isSpeaking = false;
                } else {
                    this.game.dialogContainer.visible = true;
                    this.game.guardFaceset.visible = true;
                    this.guard.isSpeaking = true;
                    this.inDialog = true;
                    if(!this.player.hasHermit) {
                        this.game.guardD1.visible = true;
                        this.autoSave();
                    } else if(this.player.hasHermit){
                        this.game.guardD2.visible = true;
                        this.layer12.visible = true;
                        this.layer13.visible = true;
                        this.game.gate.destroy();
                        this.autoSave();
                    }
                }
                break;
            //******************** HERMIT ********************\\
            case 'hermit':
                if(this.inDialog){
                    this.removeDialog();
                    this.hermit.isSpeaking = false;
                } else {
                    this.game.hermitFaceset.visible = true;
                    this.game.dialogContainer.visible = true;
                    this.hermit.isSpeaking = true;
                    this.inDialog = true;
                    if(!this.hermit.hasMet && !this.player.hasRamen) {
                        this.game.hermitD1.visible = true;
                        this.hermit.hasMet = true;
                        this.autoSave();
                    } else if(this.hermit.hasMet && this.player.hasRamen){
                        this.game.hermitD2.visible = true;
                        this.player.hasHermit = true;
                        this.autoSave();
                    } else if(!this.hermit.hasMet && this.player.hasRamen){
                        this.game.hermitD3.visible = true;
                        this.hermit.hasMet = true;
                        this.player.hasHermit = true;
                        this.autoSave();
                    } else if(this.hermit.hasMet && !this.player.hasRamen){
                        this.game.hermitD4.visible = true;
                        console.log(true);
                    }
                }
                break;
        //******************** puppo ********************\\
            case 'puppo':
            if(this.inDialog){
                this.removeDialog();
            } else {
                this.puppo.isSpeaking = true;
                this.inDialog = true;
                this.game.puppo1.visible = true;
                this.game.puppoFaceset.visible = true;
                this.game.dialogContainer.visible = true;
            }
                break;
        //DEFAULT ********************\\
            default:
                console.log('edge case found'); //used for err handling
                //used to delete dialog on walkoff
                this.removeDialog();
                break;
        }
    },
    autoSave: function (){
        //when the game loads, nobody will be speaking
        const data = {
            ramen: {...GameMachine.ramen, isSpeaking: false},
            market: {...GameMachine.market, isSpeaking: false},
            hermit: {...GameMachine.hermit, isSpeaking: false},
            guard: {...GameMachine.guard, isSpeaking: false},
            player: {...GameMachine.player, isSpeaking: false}
        }
        axios({
            method: 'PUT',
            url: `/api/char/update/autosave${queryString}`,
            data: {data}
        }).then(res => {
            console.log(res);
        }).catch(res => console.error(err));
    },
    loadGame: function(game){
        this.game = game;
        axios({
            method: 'GET',
            url: `/api/char/load-game${queryString}`,
        }).then(dbres => {
            if(dbres.data.game_state){ //if not new game, load game
                res = dbres.data.game_state
                console.log(res);
                this.guard = res.guard;
                this.hermit = res.hermit;
                this.market = res.market;
                this.player = res.player;
                this.ramen = res.ramen;
                if(this.hermit.isReady){
                    game.hermit.x = 495
                    game.hermit.y = 45
                }
                console.log('****LOADED GAME****');
            }
        }).catch(err => {
            console.log('err in loadgame', err);
        });
    },
    removeDialog: function() {
        //universal
        this.inDialog = false;
        this.speaker = null;
        this.game.dialogContainer.visible = false;
        //for puppo
        this.game.puppoFaceset.visible = false;
        this.game.puppo1.visible = false;
        //for ramen
        this.game.ramenFaceset.visible = false;
        this.game.ramenD1.visible = false;
        this.game.ramenD2.visible = false;
        this.game.ramenD3.visible = false;
        //market
        this.game.marketFaceset.visible = false;
        this.game.marketD1.visible = false;
        this.game.marketD2.visible = false;
        this.game.marketD3.visible = false;
        this.game.marketD4.visible = false;
        //guard
        this.game.guardFaceset.visible = false;
        this.game.guardD1.visible = false;
        this.game.guardD2.visible = false;
        //hermit
        this.game.hermitFaceset.visible = false;
        this.game.hermitD1.visible = false;
        this.game.hermitD2.visible = false;
        this.game.hermitD3.visible = false;
        this.game.hermitD4.visible = false;
    },
    speakBubble: function(npc){
        this.game.speak.y = npc.y - 18
        this.game.speak.x = npc.x
        this.game.speak.active && this.game.speak.anims.play('think', true);
        this.game.speak.visible = true;
    },
    sceneTransition: function(evt){
        this.game.scene.stop();
        BhutVille.scene.start("Title");
    }
}