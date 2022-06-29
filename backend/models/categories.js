module.exports = (sequelize,DataTypes) => {
    const Categories = sequelize.define (
        "Categories",
        {

            name:{
                type:DataTypes.STRING,
                allowNull:false

            },
            icon:{
                type:DataTypes.STRING,
                
            },
            color:{
                type:DataTypes.STRING
            }
        },
        {
            freezeTableName:true
        }


    )

    return Categories;
}