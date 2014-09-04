var menuState = {
    create: function() {
        //game.add.image(0, 0, 'backgroundMenu');
        var background = game.add.tileSprite(0, 0, 600, 400, 'backgroundMenu');

        // NAME LABEL
        var nameLabel = game.add.text(game.world.centerX, 270, 'Thower of Babel', { font: '70px Geo', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        //nameLabel.alpha = 0;
        //game.add.tween(nameLabel).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //START LABEL
        var startLabel = game.add.text(game.world.centerX, 320, 'press the enter key to start',{ font: '25px Arial', fill: '#ffffff' });
        game.add.tween(startLabel).to({ angle: -2 }, 500).to({ angle: 2 }, 500).loop().start();
        startLabel.anchor.setTo(0.5, 0.5);

        var enterKey = game.input.keyboard.addKey(13);
        enterKey.onDown.addOnce(this.start, this);
    },
    start: function () {
        // Start the actual game
        game.state.start('intro');
    }   
};