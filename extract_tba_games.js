const fs = require('fs');

try {
    const games = JSON.parse(fs.readFileSync('games.json', 'utf8'));
    
    // Filter games where releaseDate contains '-00-00' indicating both month and day are missing
    const tbaGames = games
        .filter(g => g.releaseDate && g.releaseDate.includes('-00-00'))
        .map(g => g.title);

    fs.writeFileSync('games_without_date.json', JSON.stringify(tbaGames, null, 2));
    console.log(`Successfully created games_without_date.json with ${tbaGames.length} games.`);
} catch (err) {
    console.error("Error processing files:", err);
}
