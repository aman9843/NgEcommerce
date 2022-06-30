module.exports = (sequelize,DataTypes) => {
    const Orders = sequelize.define(
        "Orders",
        {

            shippingAddress1:{

                type:DataTypes.STRING,
                allowNull:false

            },
            shippingAddress2:{

                type:DataTypes.STRING,
                

            },
            city:{

                type:DataTypes.STRING,
                allowNull:false

            },
            zip:{
                type:DataTypes.INTEGER,
                allowNull:false
            },

            country:{
                type:DataTypes.STRING,
                allowNull:false
            },
            phone :{

                type:DataTypes.STRING,
                allowNull:false
            },
            status :{
                type:DataTypes.STRING,
                allowNull:false,
                default:"pending"
            },
            totalPrice:{
                type:DataTypes.INTEGER,
                
            },
            datedOrder:{
                type:DataTypes.DATE,
                default:Date.now,
            },


             
        }
    )

    return Orders;
} 