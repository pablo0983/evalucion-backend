const Sequelize = require("sequelize");

const sequelize = new Sequelize("to_do_list_ibec", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const connectToDB = async () => {
  try{
     await sequelize.authenticate();
     await sequelize.sync({ force: false });
     console.log('Conectado a la base de datos correctamente');
    
  }catch(err){
    console.error(err);
  }
}


module.exports = {
  connectToDB,
  sequelize
};
