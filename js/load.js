var loadState = {
    preload: function () {
        var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...',
        { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);        
        var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');

        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
                

        game.load.spritesheet('personagem', 'assets/images/personagem.png', 32, 48);
        game.load.image('pixel', 'assets/images/pixel.png');
        game.load.image('health', 'assets/images/health.png');

        //MAPA
        game.load.image("backgroundMenu", "assets/images/babel_bg_01.jpg");
        game.load.image('tileset', 'assets/images/tileset_teste.jpg');
        game.load.image('spine', 'assets/images/spine.png');
        game.load.tilemap('map01', 'assets/images/tilemap.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.audio('dead', ['assets/sound/dead.ogg', 'assets/sound/dead.mp3']);

    },
    create: function () {
        // Go to the menu state
        game.state.start('menu');
    }
};