var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'content', {
    preload: preload, create: 
        create, update: update
}); 

function preload(){ 
    game.load.image('background', 'asset/Ecran-titre.png', 1024, 768);
    game.load.audio('menuTheme', 'asset/Music/menu_theme.ogg');
}

function create(){
    background = game.add.sprite(0,0,'background');
    music = game.add.audio('menuTheme');
    music.loop = true;
    music.play();
}

function update(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.I)==true){ 
        document.location.href='jeu.html'
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.O)==true){
        document.location.href='commandes.html'
    }
}