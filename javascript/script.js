var game = new Phaser.Game(800,600,Phaser.AUTO,'content',{preload: preload, create: 
create,update:update}); 

function preload(){ 
game.load.image('pangolin-vie','asset/pangolin-vie.png'); 
} 

function create(){ 
monSprite=game.add.sprite(0,0,'pangolin-vie');
} 

function update(){ 
}