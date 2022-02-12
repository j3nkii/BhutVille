//grabs query string
const queryString = window.location.search;
const GameMachine = {
    ramen: {isSpeaking: false, hasMet: false},
    market: {isSpeaking: false, hasMet: false},
    hermit: {isSpeaking: false, hasMet: false},
    guard: {isSpeaking: false, hasMet: false},
    player: {hasNote: false, hasSupplies: false, hasRamen:false, hasHermit: false},
    speaker: null,
    inDialog: false,
    Dialog: function(game){
        console.log(game);
        switch (this.speaker) {
            //******************** RAMEN ********************\\
            case 'ramen':
                if(this.ramen.isSpeaking){
                    this.dialog.destroy();
                    this.ramen.isSpeaking = false;
                    this.inDialog = false;
                    this.speaker = null;
                } else {
                    this.ramen.isSpeaking = true;
                    this.inDialog = true;
                    if(!this.ramen.hasMet) {
                        this.dialog = game.add.text(0, 0, 
`Welcome! What can i get for you? Oh! no money! 
Take this note to the market and bring me back the supplies
and i'll feed ya!`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                        this.ramen.hasMet = true;
                        this.player.hasNote = true;
                        this.autoSave();
                    }else if(this.ramen.hasMet && this.player.hasSupplies){
                        this.dialog = game.add.text(0, 0, 
`You're the actual best! Here's some Ramen!
Hey you mind running this bowl over to my 
old friend over there!? Thanks!`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                        this.player.hasRamen = true;
                        this.autoSave();
                    } else if(this.ramen.hasMet && this.player.hasNote){
                        console.log(true);
                        this.dialog = game.add.text(0, 0, 
`The market is just east of here, you literally cannot miss it...`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                    }
                }
                break;
            //******************** MARKET ********************\\
            case 'market':
                if(this.market.isSpeaking){
                    this.dialog.destroy();
                    this.market.isSpeaking = false;
                    this.inDialog = false;
                    this.speaker = null
                } else {
                    this.market.isSpeaking = true;
                    this.inDialog = true;
                    if(!this.market.hasMet && !this.player.hasNote) {
                        this.dialog = game.add.text(0, 0, 
`Ah yes! 'nother travler come through, eh? 
bet you could use some supplies! 
What?! No Money?! this aint a charity kid.`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                        this.market.hasMet = true;
                        this.autoSave();
                    } else if(this.market.hasMet && this.player.hasNote){
                        this.dialog = game.add.text(0, 0, 
`Ah, look like you've made use of yourself. 
Here's everything on the list, good luck out there...
                            `,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                        this.player.hasSupplies = true;
                        this.autoSave();
                    } else if(!this.market.hasMet && this.player.hasNote){
                        this.dialog = game.add.text(0, 0, 
`Ah yes! 'nother travler come through, eh? 
bet you could use some supplies!
Oh, whats that note you have there? 
Goodness! Quick take these!`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                        this.market.hasMet = true;
                        this.player.hasSupplies = true;
                        this.autoSave();
                    } else if(this.market.hasMet && !this.player.hasNote){
                        console.log(true);
                        this.dialog = game.add.text(0, 0, 
`who raised you? I said beat it.`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                    }
                }
                break;
            //******************** GUARD ********************\\
            case 'guard':
                if(this.guard.isSpeaking){
                    this.dialog.destroy();
                    this.guard.isSpeaking = false;
                    this.inDialog = false;
                    this.speaker = null
                } else {
                    this.guard.isSpeaking = true;
                    this.inDialog = true;
                    if(!this.player.hasHermit) {
                        this.dialog = game.add.text(0, 0, 
`kick rocks mister`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                        this.guard.hasMet = true;
                        this.autoSave();
                    } else if(this.player.hasHermit){
                        this.dialog = game.add.text(0, 0, 
`Oh! We've been expecting you Hermit! 
He's with you? Fine, go ahead.`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                        this.player.hasSupplies = true;
                        this.guard.hasMet = true;
                        this.autoSave();
                    }
                }
                break;
            //******************** HERMIT ********************\\
            case 'hermit':
                if(this.hermit.isSpeaking){
                    this.dialog.destroy();
                    this.hermit.isSpeaking = false;
                    this.inDialog = false;
                    this.speaker = null
                } else {
                    this.hermit.isSpeaking = true;
                    this.inDialog = true;
                    if(!this.hermit.hasMet && !this.player.hasRamen) {
                        this.dialog = game.add.text(0, 0, 
`trying to see the king huh? 
Tell ya what, get me some food and i'll get ya in.`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                        this.hermit.hasMet = true;
                        this.autoSave();
                    } else if(this.hermit.hasMet && this.player.hasRamen){
                        this.dialog = game.add.text(0, 0, 
`ah yes, the best Ramen in all of BhutVille!
NomNomNomNomNom... sLUUURRRRPPP, ah yes, follow me.`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                        this.player.hasHermit = true;
                        this.autoSave();
                    } else if(!this.hermit.hasMet && this.player.hasRamen){
                        this.dialog = game.add.text(0, 0, 
`Ah he's got a heart of gold that one. You looking to get in those gates?
I've been on the road for a long time, i could use the company`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                        this.hermit.hasMet = true;
                        this.player.hasHermit = true;
                        this.autoSave();
                    } else if(this.hermit.hasMet && !this.player.hasRamen){
                        console.log(true);
                        this.dialog = game.add.text(0, 0, 
                            `Get me that Ramen and I'll get you through those gates.`,
                            { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                    }
                }
                break;
            default:
                console.log('edge case found'); //used for err handling
                break;
        }
    },
    autoSave: function (){
        //when the game loads, nobody will be speaking

                    /////add game.dialog?

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
        })
    },
    loadGame: function(){
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
                console.log('****LOADED GAME****');
            }
        }).catch(err => {
            console.log('err in loadgame', err);
        })
    }
}