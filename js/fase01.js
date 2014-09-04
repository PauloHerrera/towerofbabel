var fase01State = {
    // Removed the preload function
    create: function () {
        //this.game.world.setBounds(0, 0, 1600, 600);
        
        //Adiciona o Mapa
        this.map = game.add.tilemap('map01');                
        this.map.addTilesetImage('tileset_teste', 'tileset');
        this.map.addTilesetImage('spine', 'spine');
        this.layer = this.map.createLayer('Camada de Tiles 1');        
        this.layer.resizeWorld();

        this.layerCollision = this.map.createLayer('Camada de Tiles 2');
        this.layerCollision.resizeWorld();               
        this.map.setCollision(9,true, this.layerCollision);
        
        this.layerKillPlayer = this.map.createLayer('Camada de Tiles 3');
        this.layerKillPlayer.resizeWorld();
        
        this.map.setTileIndexCallback(12, this.losingLife, this, this.layerKillPlayer);

        // Adiciona os Sons
        this.deadSound = game.add.audio('dead');

        // Adiciona o teclado
        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);

        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
        };

        //Add o personagem
        this.player = game.add.sprite(110, game.world.height - 120, 'personagem');
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        //this.player.body.collideWorldBounds = true;

        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    
        game.camera.follow(this.player);

        //Se quiser criar uma camada que fique na frente do personagem
        //this.layerObjects = this.map.createLayer('Camada de Tiles 4');
        //this.layerObjects.resizeWorld();


        // Particulas para quando ele morrer
        this.emitter = game.add.emitter(0, 0, 15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150, 150);
        this.emitter.gravity = 0;

        //Add os corações com a saúde do personagem
        this.life = new Array();
        this.lifeCount = 3;
        for (j = 0; j < 3; j++) {
            this.life[j] = this.add.image(10 + j * 20, 10, 'health');
            this.life[j].fixedToCamera = true;
        }
        
        //this.hp.fixedToCamera = true;
        //Add pontuação
        //SCORE
    },
    update: function () {

        game.physics.arcade.collide(this.player, this.layerCollision);
        game.physics.arcade.collide(this.player, this.layerKillPlayer);
        

        this.movePlayer();

        if (this.player.position.y >= game.world.height) {
            this.playerDie();
        }

        //Ele morre se cair de muito alto
        if (this.player.body.onFloor()) {           

            if (((this.player.position.y - game.global.fallControl) > 400) && game.global.fallControl != 0) {                
                this.playerDie();             
            } 
            
            game.global.fallControl = this.player.position.y;
                       
        }
    },
    losingLife: function (a,b) {
        //console.log(this.lifeCount);
        this.lifeCount--;
        this.life[this.lifeCount].kill();
        
        var teste = 0;

        if (this.cursor.left.isDown || this.wasd.left.isDown) {
            teste = 30;
        }
        else if (this.cursor.right.isDown || this.wasd.right.isDown) {
            teste = -30;
        }
                
        //console.log(b);
        //console.log(teste);        
        var teste2 = a.body.position.x + teste
        //console.log(teste2);
        a.body.position.x = teste2;
        
        if (this.lifeCount == 0) {
            this.playerDie();
        } else {
            console.log(this.player.position.x);
            //this.player.position.x = this.player.position.x - 10;
        }

    },
    playerDie: function () {
        
        if (!this.player.alive) {
            return;
        }

        game.global.fallControl = 0;
        this.player.kill();
        this.deadSound.play();
        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;
        this.emitter.start(true, 600, null, 15);
        
        // Call the 'startMenu' function in 1000ms
        game.time.events.add(1000, this.startMenu, this);
    },
    startMenu: function () {
        game.state.start('menu');
    },
    movePlayer: function() {
        if (this.cursor.left.isDown || this.wasd.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        }
        else if (this.cursor.right.isDown || this.wasd.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop(); 
            this.player.frame = 4; 
        }
        if ((this.cursor.up.isDown || this.wasd.up.isDown) && this.player.body.onFloor()) {// this.player.body.touching.down
            
            this.player.body.velocity.y = -320;
        }
    },
};