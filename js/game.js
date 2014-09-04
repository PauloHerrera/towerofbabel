// Initialise Phaser
var game = new Phaser.Game(600, 400, Phaser.AUTO, 'gameDiv');
// Define our 'global' variable
game.global = {
    score: 0,
    sound: true,
    fallControl: 0
};
// Add all the states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('intro', introState);
game.state.add('fase01', fase01State);
// Start the 'boot' state
game.state.start('boot');