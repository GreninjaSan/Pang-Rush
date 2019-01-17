var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'content', {
    preload: preload, create: 
        create, update: update
}); 

function preload(){ 
    game.load.image('test', 'asset/pangolin-mort.png', 1024, 768);
}

function create(){
    test = game.add.sprite(0,0,'test');
}

function update(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.O)==true){ 
        document.location.href='index.html'
    }
}