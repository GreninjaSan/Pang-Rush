var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'content', {
    preload: preload, create: 
        create, update: update
}); 

function preload(){ 
    game.load.image('commandes', 'asset/commandes.png', 1024, 768);
    game.load.audio('menuTheme', 'asset/Music/menu_theme.ogg');
}

function create(){
    commandes = game.add.sprite(0,0,'commandes');
    music = game.add.audio('menuTheme');
    music.loop = true;
    music.play();
}

function update(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.O)==true){ 
        document.location.href='index.html'
    }
}