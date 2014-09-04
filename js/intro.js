var introState = {
    create: function() {
        //game.add.image(0, 0, 'backgroundMenu');
        var background = game.add.tileSprite(0, 0, 600, 400, 'backgroundMenu');

        //TESTE DE INTRODUÇÂO
        // Nome Do jogo
        var teste = game.add.text(game.world.centerX, -10, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n Aliquam vel venenatis nisl. Sed vehicula nunc in faucibus lacinia ' ,
            { font: '20px Arial', fill: '#ffffff', align:'center'});
        teste.anchor.setTo(0.5, 0.5);
        var tween = game.add.tween(teste);
        game.add.tween(teste).to({ y: 300 }, 13000).start();


        //START LABEL
        var startLabel = game.add.text(game.world.centerX, 380, 'press enter to skip',{ font: '20px Arial', fill: '#ffffff' });
//        game.add.tween(startLabel).to({ angle: -2 }, 500).to({ angle: 2 }, 500).loop().start();
        startLabel.anchor.setTo(0.5, 0.5);

        var enterKey = game.input.keyboard.addKey(13);
        enterKey.onDown.addOnce(this.start, this);
    },
    start: function () {
        // Start the actual game
        game.state.start('fase01');
    }   
};