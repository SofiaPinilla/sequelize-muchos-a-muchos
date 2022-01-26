'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenreBook extends Model {
    static associate(models) {
    }
  }
  GenreBook.init({
    GenreId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GenreBook',
  });
  return GenreBook;
};