exports.success = (message, data) => {
  return { message, data };
};

exports.getUniqueId = (pokemons) => {
  //la fonction map fonctionne comme la boucle for en retournant un []
  const pokemonsId = pokemons.map((pokemon) => pokemon.id); //transformer le[]des pokemons en 1 []d'identifiant des pokemons contenu dans la const pokemonsId
  const maxId = pokemonsId.reduce((a, b) => Math.max(a, b)); //calcule l'identifiant le + grand parmi la liste des identifiants existant"reduce" permet de comparer les éléments 2 à 2
  const uniqueId = maxId + 1; //const retourne la valeur en incrémentant maxId de 1
  return uniqueId;
};
