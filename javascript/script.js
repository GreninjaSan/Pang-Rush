sol = function (index, game, x,y) {

    var x = x;
    var y = y;

    this.game = game;

    this.sol = game.add.sprite(x, y, 'plateforme', 'sol');
    this.sol.anchor.set(0.5);

    this.sol.name = index.toString();
    game.physics.enable(this.sol, Phaser.Physics.ARCADE);
    this.sol.body.immovable = false;
    this.sol.body.immovable=true
    game.physics.arcade.collide(this.sol, Perso1)
    game.physics.arcade.collide(this.sol, Perso2)
    

};







var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'content', {
    preload: preload, create: 
        create, update: update
}); 
var cursors;
var cam_memory=0;
var J1;
var J2;
var vitesse = 330;
var test_desc;
var aerial1 = 2;
var aerial2 = 2;

function preload(){ 
    game.load.spritesheet('J1_spr', 'asset/Sprites Joueur1.png', 78, 76);
    game.load.spritesheet('J2_spr', 'asset/Sprites Joueur2.png', 78, 76);
    game.load.image('sol', 'asset/Sol.png');
    game.load.image('plateforme', 'asset/plateforme.png');
    game.load.image('boule_de_feu', 'asset/Objet-BouleFeu.png');
    game.load.image('potion_lenteur', 'asset/Objet-PotionLenteur.png');
    game.load.image('potion_speed', 'asset/Objet-PotionSpeed.png');
    game.load.image('pics', 'asset/Obstacle-pics.png');
    game.load.image('virevoltant', 'asset/Obstacle-Virevoltant.png');
} 

function create() {
    groupe_sol = game.add.group();
    virevoltants = game.add.group();


    //layer 1
    for (var i = 0; i < 1000; i++) {
        if (Math.random() * 100 > 10) {
            s = groupe_sol.create(106 * i, 700, 'sol');
            game.physics.enable(s, Phaser.Physics.ARCADE);
            s.body.immovable = true;
            s.body.allowGravity = false;
        }
    }

    //layer 2
    for (var i = 0; i < 1000; i++) {
        if (Math.random() * 100 > 70) {
            s = groupe_sol.create(106 * i, 540, 'plateforme');
            game.physics.enable(s, Phaser.Physics.ARCADE);
            s.body.immovable = true;
            s.body.allowGravity = false;
        }
    }

    //layer 3
    for (var i = 0; i < 1000; i++) {
        if (Math.random() * 100 > 90) {
            s = groupe_sol.create(106 * i, 380, 'plateforme');
            game.physics.enable(s, Phaser.Physics.ARCADE);
            s.body.immovable = true;
            s.body.allowGravity = false;
        }
    }

    game.world.setBounds(0, 0, 40000, 768);
    game.world.resize(3000, 768);

    //initialisation du fond
    game.stage.backgroundColor = '#FFF000';

    //initialisation des moteurs de jeu
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 700;

    //assignement des touches
    J1 = game.input.keyboard.addKeys({ 'haut': Phaser.KeyCode.Z, 'bas': Phaser.KeyCode.S, 'gauche': Phaser.KeyCode.Q, 'droite': Phaser.KeyCode.D, 'A': Phaser.KeyCode.I, 'B': Phaser.KeyCode.O, 'C': Phaser.KeyCode.P });
    J2 = game.input.keyboard.addKeys({ 'haut': Phaser.KeyCode.UP, 'bas': Phaser.KeyCode.DOWN, 'gauche': Phaser.KeyCode.LEFT, 'droite': Phaser.KeyCode.RIGHT, 'A': Phaser.KeyCode.NUMPAD_1, 'B': Phaser.KeyCode.NUMPAD_2, 'C': Phaser.KeyCode.NUMPAD_3 });
    cursors = game.input.keyboard.createCursorKeys();

    //assignement des sprites
    Perso1 = game.add.sprite(200, 100, 'J1_spr');
    Perso1.anchor.setTo(0.5, 0.5);
    Perso1.animations.add('marche_d', [1,3], 5, true);
    Perso1.animations.add('marche_g', [0, 2], 5, true);
    Perso1.animations.add('acc_g', [8], 5, true);
    Perso1.animations.add('acc_d', [9], 5, true);
    Perso1.animations.add('still_d', [7], 5, true);
    Perso1.animations.add('still_g', [6], 5, true);
    
    Perso2 = game.add.sprite(200, 200, 'J2_spr');
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
    Perso1.body.setSize(30, 56,24,10);

    game.physics.enable(Perso2, Phaser.Physics.ARCADE);
    Perso2.body.collideWorldBounds = true;
    Perso2.body.setSize(30, 56,24,10);

    
} 

function update() {
    //mouvements
    game.physics.arcade.collide(Perso1, Perso2)

    game.physics.arcade.collide(groupe_sol, Perso2)
    game.physics.arcade.collide(groupe_sol, Perso1)

    function move(Perso, joueur, aerial, ae = 1, t1 = 0, t2 = 0) {
        
        t2 = t1
        t1 = Perso.body.velocity.y
        Perso.body.velocity.x *= 0.90;
        if (joueur.droite.isDown) {
            Perso.body.velocity.x += 0.08 * vitesse
            Perso.play('marche_d');
        }
        else if (joueur.gauche.isDown) {
            Perso.body.velocity.x -= 0.08 * vitesse
            Perso.play('marche_g');
        }
        else if (Perso.body.velocity.x < 40 && Perso.body.velocity.x > -40) {
            if (Perso.body.velocity.x<0) {
                Perso.play('still_g')
            }
            else {
                Perso.play('still_d')
            }
        }
        if (joueur.bas.isDown) {
            Perso.body.velocity.y = vitesse
        }
        if (aerial > 0 && joueur.haut.isDown && Perso.body.velocity.y >= -50) {
            Perso.body.velocity.y = -1.3 * vitesse
            aerial-=1
        }
        if (t1 == t2) {
            aerial = ae
        }
        return aerial
    }

    function jeu(){
        aerial1 = move(Perso1, J1, aerial1);
        aerial2 = move(Perso2, J2, aerial2);
    }

    jeu()
    //if (Perso1.body.velocity.y < 10)
    
    if (Perso1.body.x > Perso2.body.x) {
        game.camera.x = Perso1.body.x - 700
            cam_memory = game.camera.x;
    }
    else {
        game.camera.x = Perso2.body.x - 700
        cam_memory = game.camera.x;
    }

    //condition de victoire par dépassement
    if (Perso1.body.x > Perso2.body.x + 730) {
        //joueur 1 gagne
        document.location.href = 'commandes.html'
    }
    if (Perso2.body.x > Perso1.body.x + 730) {
        //joueur 2 gagne
        document.location.href = 'commandes.html'
    }
}
