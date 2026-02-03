const fs = require('fs');

// Paths
const gamesJsonPath = 'c:\\Users\\User\\Desktop\\gamecountdown\\games.json';
const txtPath = 'c:\\Users\\User\\Desktop\\gamecountdown\\game_list_alphabetical.txt';

// Read files
const games = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
const txtContent = fs.readFileSync(txtPath, 'utf8');

// Identify games with SPECIFIC dates (Month and Day present)
// We assume "00-00" or "-00" indicates missing month/day.
const titlesWithDates = new Set();

games.forEach(game => {
    if (game.releaseDate) {
        // Check if date is specific. 
        // If it looks like "YYYY-00-00" or similar, it's NOT specific.
        // Valid date: "2026-01-07..."
        // Invalid/Vague: "2026-00-00..."
        
        // Simple check: does it contain "-00-"?
        // Note: Check for "-00-" (month 00) or "-00T" (day 00) or similar.
        // The pattern found was "2026-00-00T...".
        // Also possibly "2026-XX-00".
        // Let's being strict: if month is '00' OR day is '00', it's vague.
        
        const dateStr = game.releaseDate;
        // Parse YYYY-MM-DD
        const parts = dateStr.split('T')[0].split('-');
        if (parts.length === 3) {
            const year = parts[0];
            const month = parts[1];
            const day = parts[2];
            
            if (month !== '00' && day !== '00') {
                titlesWithDates.add(game.title.trim().toLowerCase());
            }
        }
    }
});

console.log(`Found ${titlesWithDates.size} games with specific dates in games.json.`);

// Filter text file
const lines = txtContent.split(/\r?\n/);
const filteredLines = lines.filter(line => {
    const title = line.trim();
    if (!title) return false; // Skip empty lines
    return !titlesWithDates.has(title.toLowerCase());
});

console.log(`Original lines: ${lines.length}`);
console.log(`Filtered lines: ${filteredLines.length}`);

// Write back
fs.writeFileSync(txtPath, filteredLines.join('\n') + '\n');
console.log('Successfully updated game_list_alphabetical.txt');
