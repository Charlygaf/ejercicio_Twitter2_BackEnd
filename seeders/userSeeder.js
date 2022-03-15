const { faker } = require("@faker-js/faker");
const User = require("../schemas/User");

faker.locale = "es";

module.exports = async () => {
  const users = [
    {
      firstname: "Pepe",
      lastname: "Ito",
      photoProfile: "defaultProfile.png",
      email: "a@a.com",
      photoCover: "defaultCoverProfile.png",
      password: "1",
      userName: "pepito",
      biography: "Hola que tal mi nombre es Test te invito a seguirme",
    },
  ];

  for (let i = 0; i < 200; i++) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const username = [firstname, lastname];
    const birth = faker.datatype.number({ min: 631159200666, max: 1166666666623 });
    const number = faker.datatype.number({ min: 1, max: 99 });
    const separator = [".", "-", "_"];
    const userName =
      username[Math.round(Math.random())] +
      separator[Math.round(Math.random() * separator.length - 1)] +
      number;
    users.push({
      firstname: firstname,
      lastname: lastname,
      email: `${firstname}_${lastname}@gmail.com`,
      photoProfile: "defaultProfile.png",
      photoCover: "defaultCoverProfile.png",
      createdAt: faker.date.past(),
      birthDate: new Date(birth),
      password: "1234",
      userName: userName.replace(" ", ""),
    });
  }

  await User.create(users);

  console.log("[Database] Se corrió el seeder de Users.");
};
