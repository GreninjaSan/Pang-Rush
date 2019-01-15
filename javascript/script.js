var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
    preload: preload, create: 
        create, update: update
}); 
var cursors;
var J1;
var vitesse = 300;
function preload(){ 
    game.load.spritesheet('J1_spr', 'asset/Sprites Joueur1.png', 39, 38);
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
    Perso1 = game.add.sprite(0, 200, 'J1_spr');
    Perso1.anchor.setTo(0.5, 0.5);
    Perso1.animations.add('marche', [1,3], 5, true);
    

    //allocation du moteur de jeu
    game.physics.enable(Perso1, Phaser.Physics.ARCADE);
    Perso1.body.collideWorldBounds = true;
    //Perso1.body.bounce.y = 0.8;

} 

function update() {
    Perso1.body.velocity.x *= 0.90;
    //mouvements
    if (J1.gauche.isDown) {
        Perso1.body.velocity.x -= 0.08 * vitesse

    } 
    if (J1.droite.isDown) {
        Perso1.body.velocity.x += 0.08 * vitesse
        Perso1.play('marche');
    }
    if (J1.bas.isDown) {
        Perso1.body.velocity.y = vitesse
    }
    if (J1.haut.isDown && Perso1.body.velocity.y <= 10 && Perso1.body.velocity.y >= -10) {
        Perso1.body.velocity.y = -1.3*vitesse
    }

}
