/**
 * Created by kingdaeki on 2015-01-27.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("promotion", {
        name: {
            type: DataTypes.STRING
        },
        promotionBannerSize: DataTypes.STRING,
        externalMappingId: DataTypes.STRING
    })
};