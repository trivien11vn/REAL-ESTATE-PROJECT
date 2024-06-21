'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Property.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    listingType: {
      type: DataTypes.ENUM,
      values: ['SALE','RENTAL']
    },
    price: DataTypes.FLOAT,
    propertyTypeId: DataTypes.UUID,
    status: {
      type: DataTypes.ENUM,
      values: ['PENDING', 'CANCELED', 'APPROVED'],
    },
    isAvailable: DataTypes.BOOLEAN,
    images: {
      type: DataTypes.TEXT,
      get(){
        const rawValue = this.getDataValue('images')
        return rawValue ? JSON.parse(rawValue) : []
      },
      set(arrayImages){
        this.setDataValue('images', JSON.stringify(arrayImages))
      }
    },
    featuredImage: DataTypes.STRING,
    postedBy: DataTypes.UUID,
    bedRoom: DataTypes.INTEGER,
    bathRoom: DataTypes.INTEGER,
    size: DataTypes.FLOAT,
    yearBuilt: DataTypes.INTEGER,
    owner: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};