const fs = require('fs');

const data = JSON.parse(fs.readFileSync('games.json', 'utf8'));

const genreCounts = {};
const gamesByGenre = {};

data.forEach(game => {
    if (game.genres) {
        game.genres.forEach(g => {
            if (!genreCounts[g]) {
                genreCounts[g] = 0;
                gamesByGenre[g] = [];
            }
            genreCounts[g]++;
            gamesByGenre[g].push(game.title);
        });
    }
});

console.log('--- Genre Counts ---');
Object.keys(genreCounts).sort().forEach(g => {
    console.log(`${g}: ${genreCounts[g]}`);
    if (genreCounts[g] <= 2) {
        console.log(`   Games: ${gamesByGenre[g].join(', ')}`);
    }
});
