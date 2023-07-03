const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon"); //middleware serve favicon
const bodyParser = require("body-parser"); //import middleware bodyParser
const { Sequelize, DataTypes } = require("sequelize"); //import module sequelize ORM
const { success, getUniqueId } = require("./helper.js");
let pokemons = require("./mock-pokemon");
const PokemonModel = require("./src/models/pokemon"); //importé pokemon dans la bd

const app = express();
const port = 3000;
//configuration instance sequelize represente la connection à la BD le constructeur
const sequelize = new Sequelize("pokedex", "root", "root", {
  //BD pokedex, root identifiant pr accès BD? "" mp
  host: "localhost", //ou se trouve la BD dans notre machine
  dialect: "mysql", //driver pr interagir avec la BD
  dialectOptions: {
    timezone: "Etc/GMT-2", //avec logging  evite d'afficher des message d'erreur
  },
  logging: false,
});

sequelize
  .authenticate()
  .then((_) =>
    console.log("la connexion à la base de données a bien été établie.")
  )
  .catch((error) =>
    console.error(`impossible de se connecter à la base de donnée ${error}`)
  );

const Pokemon = PokemonModel(sequelize, DataTypes);

sequelize.sync({ force: true }).then((_) => {
  console.log('La base de données "Pokedex" a bien été synchronisée.');
  //créons les données pour notre pokemon pour notre BD
  pokemons.map((pokemon) => {
    Pokemon.create({
      name: pokemon.name, //la méthode map permet de boucler sur la liste des pokemons
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.types.join(), //affiche les éléments du tableau
    }).then((bulbizzare) => console.log(bulbizzare.toJSON())); //methode toJSON affiche les valeurs
  });
});
app.use(favicon(__dirname + "/favicon.ico"));
app.use(morgan("dev")); //use création middleware en fonction du détail de log qu'on souhaite afficher
app.use(bodyParser.json()); //application point de terminaison grace à la méthode use

app.get("/", (req, res) => res.send("Hello again, Express  !")); //on défini notre de terminaison le endpoint qui est le coeur d'Express
//on retourne la liste des pokemons au format Json, avec un message :
app.get("/api/pokemons", (req, res) => {
  const message = "La liste des pokemons a bien été récupérée.";
  res.json(success(message, pokemons));
});

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokemon a bien trouvé."; //définir les données
  res.json(success(message.pokemon)); //utilisation methode success, afin de retourner une reponse structurée
  //   res.send(`Vous avez demandé le pokemon n°${pokemon.name}.`);
});

app.post("/api/pokemons", (req, res) => {
  //definir l'action post ainsi que l'url associé
  const id = getUniqueId(pokemons); //seule la BD peut générer 1 identifiant unique
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }; //fusionne la data des pokemons reçu via la requete Http entrant avec l'identifiant unique qu'on a généré + la date de création
  pokemons.push(pokemonCreated); //ajout du pokemon
  const message = `Le pokemon ${pokemonCreated.name} a bien été crée.`; //generé un message de confirmation
  res.json(success(message, pokemonCreated)); //retour de l'ensemble réponse json
});

app.put("/api/pokemons/:id", (req, res) => {
  //put modifier 1 pokemon en passant par l'api rest
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    //grace à la méthode map native de js
    return pokemon.id === id ? pokemonUpdated : pokemom;
  });

  const message = `Le pokemon ${pokemonUpdated} a bien été modifié.`;
  res.json(success(message.pokemonUpdated));
});
app.listen(port, () =>
  console.log(
    "Notre application Node est terminé sur : http://localhost:${port" //on démarre l'API Rest sur un port 3000 et on affiche un message de confirmation dans le terminal de commande grâce à la methode listen fournie par Express
  )
);

// npm install morgan --save-devinstallation module morgan dans le terminal
//npm install serve-favicon --save installation du favicon dans le terminal
