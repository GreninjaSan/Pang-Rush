function tir (obj){
    obj.body.x=pangolin.x+83
    obj.body.y=pangolin.y+128
    obj.body.velocity.y=-1
    obj.body.velocity.x=-40
}
function tirFB (obj,i){
    obj.body.x=pangolin.x+63
    obj.body.y=pangolin.y+88
    obj.body.velocity.y=300
    obj.body.velocity.x=40-(80*i)
}

function P1win () {
    document.location.href = 'victoireJ1.html'
}
function P2win () {
    document.location.href = 'victoireJ2.html'
}
function P1stop () {
    Perso1.body.velocity.x=-700
    Perso1.body.velocity.y=0
}
function P2stop () {
    Perso2.body.velocity.x=-700
    Perso2.body.velocity.y=0
}

function virevoltant_tir() {

    if (game.time.now > nextFire && groupe_virevoltants.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var projectile = groupe_virevoltants.getFirstDead();

        projectile.reset(pangolin.x - 8, pangolin.y - 8);
        
        game.physics.arcade.moveToPointer(projectile, 300);
    }

}


var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'content', {
    preload: preload, create:
        create, update: update
}); 

var timer1 =0;
var timer2 =0;
var nextFire = 0;
var fireRate = 100;
var cursors;
var cam_memory=0;
var J1;
var J2;
var vitesseJ1 = 330;
var vitesseJ2 = 330;
var test_desc;
var aerial1 = 2;
var aerial2 = 2;
var nb_pla = 200;
var z=0;
var count =3;




var duréePot = 600;






function preload(){ 
    //spritesheets
    game.load.spritesheet('J1_spr', 'asset/Sprites Joueur1.png', 78, 76);
    game.load.spritesheet('J2_spr', 'asset/Sprites Joueur2.png', 78, 76);
    game.load.spritesheet('background', 'asset/Fond-course.png',1024,768);
    game.load.spritesheet('pangolin', 'asset/pangolin-mechant.png',166,256);
    

    //sprites
    game.load.image('caisse_feu', 'asset/Obstacle-CaisseFeu.png',32,32);
    game.load.image('sol', 'asset/Sol.png');
    game.load.image('sol_pics', 'asset/Sol-pics.png');
    game.load.image('plateforme', 'asset/plateforme.png');
    game.load.image('boule_de_feu', 'asset/Objet-BouleFeu.png');
    game.load.image('potion_lenteur', 'asset/Objet-PotionLenteur.png');
    game.load.image('potion_speed', 'asset/Objet-PotionSpeed.png');
    game.load.image('pics', 'asset/Obstacle-pics.png');
    game.load.image('virevoltant', 'asset/Obstacle-Virevoltant.png');

    //musiques
    game.load.audio('raceTheme', 'asset/Music/true_race_theme.ogg')

} 

function create() {

    //mise en route de la musique
    music = game.add.audio('raceTheme');
    music.loop = true;
    music.play();

    //animation de fond
    fond = game.add.sprite(0, 0, "background");
    fond.animations.add("basic", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 0.1, true);


    
    potionS=game.add.sprite(0,0,'potion_speed');
    game.physics.enable(potionS, Phaser.Physics.ARCADE);
    potionS.body.bounce.set(0.4);
    potionS.body.allowGravity = true;



    pangolin= game.add.sprite(1024-530,-20,'pangolin');
    pangolin.animations.add("voler",[0,1,2,3,4,5],6,true);

    virevol = game.add.sprite(100,100,'virevoltant');
    game.physics.enable(virevol, Phaser.Physics.ARCADE);
    virevol.body.bounce.set(0.8);
    virevol.body.allowGravity = true;

    virevol2 = game.add.sprite(100,100,'virevoltant');
    game.physics.enable(virevol2, Phaser.Physics.ARCADE);
    virevol2.body.bounce.set(0.8);
    virevol2.body.allowGravity = true;

    virevol3 = game.add.sprite(100,100,'virevoltant');
    game.physics.enable(virevol3, Phaser.Physics.ARCADE);
    virevol3.body.bounce.set(0.8);
    virevol3.body.allowGravity = true;




    fireball = game.add.sprite(100,100,'boule_de_feu');
    game.physics.enable(fireball, Phaser.Physics.ARCADE);
    fireball.body.allowGravity = false;
    fireball.scale.setTo(0.5, 0.5);

    fireball2 = game.add.sprite(100,100,'boule_de_feu');
    game.physics.enable(fireball2, Phaser.Physics.ARCADE);
    fireball2.body.allowGravity = false;
    fireball2.scale.setTo(0.5, 0.5);

    fireball3 = game.add.sprite(100,100,'boule_de_feu');
    game.physics.enable(fireball3, Phaser.Physics.ARCADE);
    fireball3.body.allowGravity = false;
    fireball3.scale.setTo(0.5, 0.5);


    /*
    groupe_virevoltants = game.add.group();
    groupe_virevoltants.enableBody = true;
    groupe_virevoltants.physicsBodyType = Phaser.Physics.ARCADE;

    groupe_virevoltants.createMultiple(50, 'virevoltant');
    groupe_virevoltants.setAll('checkWorldBounds', true);
    groupe_virevoltants.setAll('outOfBoundsKill', true);
    */


    //creation des groupes
    groupe_sol = game.add.group();
    groupe_virevoltants = game.add.group();
    groupe_caisses = game.add.group();
    groupe_OS = game.add.group();

    //creation du monde
    {
    //layer 1
    for (var i = 0; i < nb_pla; i++) {
        if (Math.random() * 100 < 60 &&i>10 || (8<i && i<16)) {
            s = groupe_sol.create(106 * i, 700, 'sol');
            if (Math.random() * 100 < 20) {
                if (Math.random() * 100 < 50) {
                    g = groupe_OS.create(106 * i, 693, 'pics');
                    game.physics.enable(g, Phaser.Physics.ARCADE);
                    g.body.immovable = true;
                    g.body.allowGravity = false;
                }
                else {
                    g = groupe_OS.create(106 * i, 639, 'caisse_feu');
                    g.scale.setTo(2, 2);
                    game.physics.enable(g, Phaser.Physics.ARCADE);
                    g.body.immovable = true;
                    g.body.allowGravity = false;
                }
            }
            game.physics.enable(s, Phaser.Physics.ARCADE);
            s.body.immovable = true;
            s.body.allowGravity = false;
        }
    }

    //layer 2
    for (var i = 0; i < nb_pla; i++) {
        if (Math.random() * 100 < 10 && 8<i) {
            s = groupe_sol.create(106 * i, 540, 'plateforme');
            game.physics.enable(s, Phaser.Physics.ARCADE);
            s.body.immovable = true;
            s.body.allowGravity = false;
        }
    }

    //layer 3
    for (var i = 0; i < nb_pla; i++) {
        if (Math.random() * 100 < 4 && 8<i) {
            //if Math.random
            s = groupe_sol.create(106 * i, 380, 'plateforme');
            game.physics.enable(s, Phaser.Physics.ARCADE);
            s.body.immovable = true;
            s.body.allowGravity = false;
        }
    }
    }
    game.world.setBounds(0, 0, 40000, 768);
    game.world.resize(3000, 768);

    //initialisation des moteurs de jeu
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 700;

    //assignement des touches
    {
        J1 = game.input.keyboard.addKeys({ 'haut': Phaser.KeyCode.Z, 'bas': Phaser.KeyCode.S, 'gauche': Phaser.KeyCode.Q, 'droite': Phaser.KeyCode.D, 'A': Phaser.KeyCode.I, 'B': Phaser.KeyCode.O, 'C': Phaser.KeyCode.P });
        J2 = game.input.keyboard.addKeys({ 'haut': Phaser.KeyCode.UP, 'bas': Phaser.KeyCode.DOWN, 'gauche': Phaser.KeyCode.LEFT, 'droite': Phaser.KeyCode.RIGHT, 'A': Phaser.KeyCode.NUMPAD_1, 'B': Phaser.KeyCode.NUMPAD_2, 'C': Phaser.KeyCode.NUMPAD_3 });
        cursors = game.input.keyboard.createCursorKeys();
    }

    
    //assignement des sprites et des emplacements (des #persos)
    {
        Perso1 = game.add.sprite(1200, 100, 'J1_spr');
        Perso1.anchor.setTo(0.5, 0.5);
        Perso1.animations.add('marche_d', [1, 3], 5, true);
        Perso1.animations.add('marche_g', [0, 2], 5, true);
        Perso1.animations.add('acc_g', [8], 5, true);
        Perso1.animations.add('acc_d', [9], 5, true);
        Perso1.animations.add('still_d', [7], 5, true);
        Perso1.animations.add('still_g', [6], 5, true);

        Perso2 = game.add.sprite(1200, 200, 'J2_spr');
        Perso2.anchor.setTo(0.5, 0.5);
        Perso2.animations.add('marche_d', [1, 3], 5, true);
        Perso2.animations.add('marche_g', [0, 2], 5, true);
        Perso2.animations.add('acc_g', [8], 5, true);
        Perso2.animations.add('acc_d', [9], 5, true);
        Perso2.animations.add('still_d', [7], 5, true);
        Perso2.animations.add('still_g', [6], 5, true);
    }

    //allocation du moteur de jeu
    game.physics.enable(Perso1, Phaser.Physics.ARCADE);
    Perso1.body.collideWorldBounds = false;
    Perso1.body.setSize(30, 56,24,10);

    game.physics.enable(Perso2, Phaser.Physics.ARCADE);
    Perso2.body.collideWorldBounds = false;
    Perso2.body.setSize(30, 56,24,10);

    
} 






function update() {
    timer2--
    timer1--
    z++
    if (z>300){
        if (count<3) {
            tir ([virevol,virevol2,virevol3][count])
        }
        else if (count==3) {
            tirFB(fireball,1)
            tirFB(fireball2,2)
            tirFB(fireball3,3)
        }
        else {
            tir(potionS)
        }
        z=0
        count++
        if (count>4) {
            count=0;
        }
    }

    //fond.x = game.camera.x
    pangolin.play('voler');
    fond.play('basic');
    
    //mouvements

    game.physics.arcade.collide(Perso1, Perso2)
    game.physics.arcade.collide(groupe_sol, Perso2)
    game.physics.arcade.collide(groupe_sol, Perso1)
    game.physics.arcade.collide(groupe_sol, virevol)
    game.physics.arcade.collide(groupe_sol, virevol2)
    game.physics.arcade.collide(groupe_sol, virevol3)
    game.physics.arcade.collide(groupe_sol, potionS)

    //projectiles
    {
    if (game.physics.arcade.collide(Perso1,groupe_OS)) {
        P2win()
      }
    if (game.physics.arcade.collide(Perso2,groupe_OS)) {
        P1win()
    }
    if (game.physics.arcade.collide(Perso1,virevol)) {
        P1stop()
        virevol.x=0
        virevol.y=0
      }
      if (game.physics.arcade.collide(Perso1,virevol2)) {
        P1stop()
        virevol2.x=0
        virevol2.y=0
      }
      if (game.physics.arcade.collide(Perso1,virevol3)) {
        P1stop()
        virevol3.x=0
        virevol3.y=0
      }

      if (game.physics.arcade.collide(Perso2,virevol)) {
        P2stop()
        virevol.x=0
        virevol.y=0
      }
      if (game.physics.arcade.collide(Perso2,virevol2)) {
        P2stop()
        virevol2.x=0
        virevol2.y=0
      }
      if (game.physics.arcade.collide(Perso2,virevol3)) {
        P2stop()
        virevol3.x=0
        virevol3.y=0
      }



      if (game.physics.arcade.collide(Perso2,fireball)) {
        P1win()
      }
      if (game.physics.arcade.collide(Perso2,fireball2)) {
        P1win()
      }
      if (game.physics.arcade.collide(Perso2,fireball3)) {
        P1win()
      }

      if (game.physics.arcade.collide(Perso1,fireball)) {
        P2win()
      }
      if (game.physics.arcade.collide(Perso1,fireball2)) {
        P2win()
      }
      if (game.physics.arcade.collide(Perso1,fireball3)) {
        P2win()
      }


      if (game.physics.arcade.collide(Perso1,potionS)) {
        timer1 = duréePot
        potionS.x=0
      }
      if (game.physics.arcade.collide(Perso2,potionS)) {
        timer2 = duréePot
        potionS.x=0
      }


    }

    function move(Perso, joueur, aerial, vitesse, timer, ae = 1, t1 = 0, t2 = 0) {
        if (timer<0) {
            speed = vitesse
        }
        else {
            speed = 1.3*vitesse
        }
        t2 = t1
        t1 = Perso.body.velocity.y
        Perso.body.velocity.x *= 0.90;
        if (joueur.droite.isDown) {
            Perso.body.velocity.x += 0.08 * speed
            Perso.play('marche_d');
        }
        else if (joueur.gauche.isDown) {
            Perso.body.velocity.x -= 0.08 * speed
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
            Perso.body.velocity.y = speed
        }
        if (aerial > 0 && joueur.haut.isDown && Perso.body.velocity.y >= -50) {
            Perso.body.velocity.y = -1.3 * speed
            aerial-=1
        }
        if (t1 == t2) {
            aerial = ae
        }
        return aerial
    }

    function jeu(){
        aerial1 = move(Perso1, J1, aerial1,vitesseJ1,timer1);
        aerial2 = move(Perso2, J2, aerial2,vitesseJ2,timer2);
    }

    jeu()

    //if (Perso1.body.velocity.y < 10)


    //gestion de caméra


    if (Perso1.body.x > Perso2.body.x) {
        game.camera.x = Perso1.body.x - 700
        pangolin.x = Perso1.body.x + 180
        fond.x = Perso1.body.x - 700
    }
    else {
        game.camera.x = Perso2.body.x - 700
        pangolin.x = Perso2.body.x + 180
        fond.x = Perso2.body.x - 700
    }

    //condition de victoire par depassement
    if (Perso1.body.x > Perso2.body.x + 730 || Perso2.body.y > 770) {
        //joueur 1 gagne
        P1win()
    }
    if (Perso2.body.x > Perso1.body.x + 730 || Perso1.body.y>770) {
        //joueur 2 gagne
        P2win()
    }
}

