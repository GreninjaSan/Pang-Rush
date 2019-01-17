var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'content', {
    preload: preload, create: 
        create, update: update
}); 

function preload(){ 
    game.load.image('Credits1', 'asset/Credits1.png', 1024, 768);
    game.load.image('Credits2', 'asset/Credits2.png', 1024, 768);
    game.load.image('Credits3', 'asset/Credits3.png', 1024, 768);
    game.load.audio('endTheme', 'asset/Music/end_theme.ogg');
}

function create(){
    Credits1 = game.add.sprite(0,0,'Credits1');
    music = game.add.audio('endTheme');
    music.loop = true;
    music.play();
}

function update(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.P)==true){ 
        Credits2 = game.add.sprite(0,0,'Credits2');
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.I)==true){ 
        Credits2 = game.add.sprite(0,0,'Credits3');
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.O)==true){ 
        document.location.href='index.html'
    }
}