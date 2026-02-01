const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'games.json');

try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const games = JSON.parse(rawData);

    const updatedGames = games.map(game => {
        if (!game.hasOwnProperty('description')) {
            game.description = "";
        }
        if (!game.hasOwnProperty('trailer')) {
            game.trailer = "";
        }
        return game;
    });

    fs.writeFileSync(filePath, JSON.stringify(updatedGames, null, 2), 'utf8');
    console.log('Successfully updated games.json with description and trailer fields.');
} catch (err) {
    console.error('Error processing games.json:', err);
}
