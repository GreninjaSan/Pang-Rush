var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
    preload: preload, create: 
        create, update: update
}); 
var cursors;
var J1;
var vitesse = 300;
function preload(){ 
game.load.image('pangolin-vie','asset/pangolin-vie.png'); 
} 

function create() {
    //initialisation des moteurs de jeu
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 700;

    //assignement des touches
    J1 = game.input.keyboard.addKeys({ 'haut': Phaser.KeyCode.Z, 'bas': Phaser.KeyCode.S, 'gauche': Phaser.KeyCode.Q, 'droite': Phaser.KeyCode.D, 'A': Phaser.KeyCode.I, 'B': Phaser.KeyCode.O, 'C': Phaser.KeyCode.P });
    J2 = game.input.keyboard.addKeys({ 'haut': Phaser.KeyCode.UP, 'bas': Phaser.KeyCode.DOWN, 'gauche': Phaser.KeyCode.LEFT, 'droite': Phaser.KeyCode.RIGHT, 'A': Phaser.KeyCode.NUMPAD_1, 'B': Phaser.KeyCode.NUMPAD_2, 'C': Phaser.KeyCode.NUMPAD_3 });
    cursors = game.input.keyboard.createCursorKeys();

    //assignement des sprites
    monSprite = game.add.sprite(0, 200, 'pangolin-vie');

    //allocation du moteur de jeu
    game.physics.enable(monSprite, Phaser.Physics.ARCADE);
    monSprite.body.collideWorldBounds = true;
    //monSprite.body.bounce.y = 0.8;

} 

function update() { 
    monSprite.body.velocity.x *= 0.90;
    //mouvements
    if (J1.gauche.isDown) {
        monSprite.body.velocity.x = -vitesse
    } 
    if (J1.droite.isDown) {
        monSprite.body.velocity.x = vitesse
    }
    if (J1.bas.isDown) {
        monSprite.body.velocity.y = vitesse
    }
    if (J1.haut.isDown && monSprite.body.velocity.y <= 10 && monSprite.body.velocity.y >= -10) {
        monSprite.body.velocity.y = -1.5*vitesse
    }
}