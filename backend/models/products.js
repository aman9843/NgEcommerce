module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define(
        "Products",

        {

            name:{
                type:DataTypes.STRING,
                allowNull:false,

            },
            description:{
                type:DataTypes.STRING,
                allowNull:false
            },
            richDescription:{
                type:DataTypes.STRING,
                
            },
            image:{
                type:DataTypes.STRING
            },

            // images:[
            //     {
            //         type:DataTypes.STRING
            //     }
            // ],
            
            countInStock:{
                type:DataTypes.INTEGER,
                allowNull:false
            },

            brand:{
                type:DataTypes.STRING,
                allowNull:false
            },

            price:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },
            rating:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },

            numReviews:{
                type:DataTypes.INTEGER,
                defaultValue:0
            },

            isFeatured:{
                type:DataTypes.BOOLEAN,
                defaultValue:true
            },



          



            

        },
        {
            freezeTableName:true
        }




    )

    return Products;
}