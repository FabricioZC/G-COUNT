const fs = require('fs');

// Read the games.json file
const gamesData = fs.readFileSync('games.json', 'utf8');
const games = JSON.parse(gamesData);

// Extract titles
const titles = games.map(game => game.title);

// Sort titles alphabetically
titles.sort((a, b) => a.localeCompare(b));

// Write to text file
const fileContent = titles.join('\n');
fs.writeFileSync('game_list_alphabetical.txt', fileContent);
console.log(`Successfully wrote ${titles.length} game titles to game_list_alphabetical.txt`);
