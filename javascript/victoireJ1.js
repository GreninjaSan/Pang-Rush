var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'content', {
    preload: preload, create: 
        create, update: update
}); 

function preload(){ 
    game.load.image('victoireJ1', 'asset/Victoire-J1.png', 1024, 768);
}

function create(){
    victoireJ1 = game.add.sprite(0,0,'victoireJ1');
}

function update(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.I)==true){ 
        document.location.href='jeu.html'
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.O)==true){
        document.location.href='index.html'
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.P)==true){
        document.location.href='commandes.html'
    }
}