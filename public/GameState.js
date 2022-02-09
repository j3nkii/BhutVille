const GameMachine = {
    save: {inventory: null, progress: null,},
    ramen: {isSpeaking: false, hasMet: false, hasSupplies:false},
    player: {hasNote: false, hasSupplies: false, hasRamen:false},
    inDialog: false,
    Dialog: function(game){
        if(this.ramen.isSpeaking){
            console.log('in destroy');
            this.dialog.destroy();
            this.ramen.isSpeaking = false;
            this.inDialog = false;
            this.player.hasNote = true;
            this.speaker = null
        } else {
            if(!this.ramen.hasMet && !this.ramen.isSpeaking) {
                this.dialog = game.add.text(0, 0, `
                    Welcome! What can i get for you? Oh! no money! 
                    Take this note to the market and bring me back the supplies
                    and i'll feed ya!`,
                    { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                this.ramen.isSpeaking = true;
                console.log(this.ramen.isSpeaking);
                this.ramen.hasMet = true;
                this.inDialog = true;
                console.log('hitting line');
            }else if(this.ramen.hasMet && this.player.hasSupplies){
                this.dialog = game.add.text(0, 0, 
                    `You're the actual best! Here's some Ramen!
                    Hey you mind running this bowl over to my olf friend over there!? Thanks!`,
                    { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                this.inDialog = true;
                this.player.hasRamen = true;
                this.ramen.isSpeaking = true;
                console.log('hitting else2');
            } else if(this.ramen.hasMet && this.player.hasNote){
                console.log(true);
                this.dialog = game.add.text(0, 0, 
                    `The market is just west of here, you literally cannot miss it...`,
                    { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '20px'});
                this.inDialog = true;
                this.ramen.isSpeaking = true;
            } else if(this.ramen.isSpeaking){
                console.log('in destroy');
                this.dialog.destroy();
                this.ramen.isSpeaking = false;
                this.inDialog = false;
                this.player.hasNote = true;
                this.speaker = null
            }
        }
        console.log(this.ramen.isSpeaking);
    },
}