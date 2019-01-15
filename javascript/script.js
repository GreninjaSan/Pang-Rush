var game = new Phaser.Game(800,600,Phaser.AUTO,'content',{preload: preload, create: 
create,update:update}); 

function preload(){ 
    game.load.image('pangolin-vie','asset/pangolin-vie.png'); 
} 

function create(){ 
    monSprite=game.add.sprite(0,0,'pangolin-vie');
    monSprite.anchor.setTo(0.5,0.5)
    monSprite.x=400
    monSprite.y=300
    monSprite.angle=0
} 

function update(){ 
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)==true){ 
            monSprite.x+=2
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)==true){ 
            monSprite.x-=2
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)==true){ 
            monSprite.y-=2
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)==true){ 
            monSprite.y+=2
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)==true){ 
            monSprite.angle+=5 
    }  
}


