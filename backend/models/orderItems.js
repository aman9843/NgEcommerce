module.exports = (sequelize,DataTypes) => {
    const OrderItems = sequelize.define(
        "OrderItems",
        {
          name:{

            type:DataTypes.STRING,
            allowNull:false

          },

          quantity:{
            type:DataTypes.INTEGER,
            allowNull:false
          },

          image:{
            type:DataTypes.STRING
          },

          price:{
            type:DataTypes.INTEGER,
            allowNull:false
          }



          

        }
    )

    return OrderItems;
}