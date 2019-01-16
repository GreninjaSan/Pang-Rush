var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
    preload: preload, create: 
        create, update: update
}); 
var cursors;
var J1;
var J2;
var vitesse = 300;
var test_desc;
var aerial1;
var aerial2;

function preload(){ 
    game.load.spritesheet('J1_spr', 'asset/Sprites Joueur1.png', 78, 76);
    game.load.spritesheet('J2_spr', 'asset/Sprites Joueur2.png', 78, 76);
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
    Perso1.animations.add('marche_d', [1,3], 5, true);
    Perso1.animations.add('marche_g', [0, 2], 5, true);
    Perso1.animations.add('acc_g', [8], 5, true);
    Perso1.animations.add('acc_d', [9], 5, true);
    Perso1.animations.add('still_d', [7], 5, true);
    Perso1.animations.add('still_g', [6], 5, true);

    Perso2 = game.add.sprite(0, 200, 'J2_spr');
    Perso2.anchor.setTo(0.5, 0.5);
    Perso2.animations.add('marche_d', [1, 3], 5, true);
    Perso2.animations.add('marche_g', [0, 2], 5, true);
    Perso2.animations.add('acc_g', [8], 5, true);
    Perso2.animations.add('acc_d', [9], 5, true);
    Perso2.animations.add('still_d', [7], 5, true);
    Perso2.animations.add('still_g', [6], 5, true);

    //allocation du moteur de jeu
    game.physics.enable(Perso1, Phaser.Physics.ARCADE);
    Perso1.body.collideWorldBounds = true;

    game.physics.enable(Perso2, Phaser.Physics.ARCADE);
    Perso2.body.collideWorldBounds = true;
} 

function update() {
    //mouvements

    function move(Perso, joueur) {
        Perso.body.velocity.x *= 0.90;
        if (joueur.droite.isDown) {
            Perso.body.velocity.x += 0.08 * vitesse
            Perso.play('marche_d');
        }
        else if (joueur.gauche.isDown) {
            Perso.body.velocity.x -= 0.08 * vitesse
            Perso.play('marche_g');
        }
        else if (Perso.body.velocity.x) {

        }
        if (joueur.bas.isDown) {
            Perso.body.velocity.y = vitesse
        }
        if (joueur.haut.isDown && Perso.body.velocity.y <= 10 && Perso.body.velocity.y >= -10) {
            Perso.body.velocity.y = -1.3 * vitesse
        }
        if (Perso.body.velocity.y < 0) {

        }
    }
    move(Perso1, J1);
    move(Perso2, J2);
    //if (Perso1.body.velocity.y < 10)
}
