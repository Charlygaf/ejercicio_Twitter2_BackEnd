const db = require("./schemas/User");

module.exports = async () => {
  // Crear tablas:
  console.log("[Database] ¡Las tablas fueron creadas!");

  // Ejecutar seeders (datos de prueba):\

  await require("./seeders/userSeeder")();
  await require("./seeders/followSeeder")();
  await require("./seeders/tweetSeeder")();
  await require("./seeders/likeSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
};
