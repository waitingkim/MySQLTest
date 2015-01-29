/**
 * Created by kingdaeki on 2015-01-27.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("promotionBanner", {
        images: DataTypes.TEXT,
        targetType: DataTypes.STRING,
        targetId: DataTypes.STRING
    })
};