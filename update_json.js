const fs = require("fs");
const games = require("./games.json");

// Helper to check if property exists, if not add it as empty string
const updatedGames = games.map((game) => {
  if (!game.description) game.description = "";
  if (!game.trailer) game.trailer = "";
  return game;
});

fs.writeFileSync("./games.json", JSON.stringify(updatedGames, null, 2));
console.log(
  `Updated ${updatedGames.length} games with description and trailer fields.`,
);
