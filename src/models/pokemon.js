module.exports = (sequelize, DataTypes) => {
  //export fonction qui prend 2 paramètres Sequilize represente la connexion BD, l'interet de cet objet c'est qu'il possede défined
  return sequelize.define(
    //que nous utilisons cette methode, elle est prend elle-meme 3 parametre(le nom, la description de notre modèle et le type)
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, //modifier le comportement proposé la méthode Sequelize
      createdAt: "created",
      updatedAt: false,
    }
  );
};
