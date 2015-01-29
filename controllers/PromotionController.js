/**
 * Created by 아연 on 2014-12-22.
 */
var SequelizeController = require('../controllers/SequelizeController');
var Promotion = SequelizeController.import('../../../models/Promotion');
var PromotionBanner = SequelizeController.import('../../../models/PromotionBanner');

Promotion.hasMany(PromotionBanner, {foreignKey: 'promotionId'});
PromotionBanner.belongsTo(Promotion, {foreignKey: 'promotionId'});

var PromotionController = function () {
};

PromotionController.getWithId = function (req, res, next) {
    //  id에 해당하는 프로모션을 가져온다.

    var categoryId = req.query.categoryId;

    if (categoryId != undefined) {
        // ID로 조회
        Promotion.findAll({
            where: {externalMappingId: categoryId},
            include: [PromotionBanner]
        }).success(function (projects) {
            res.send(projects);
        });
    } else {
        // 전체 목록
        Promotion.findAll({
            include: [PromotionBanner]
        }).success(function (projects) {
            res.send(projects);
        });
    }
};

PromotionController.add = function (req, res, next) {
    //  프로모션을 추가한다.
    var params = req.body;

    Promotion.sync();

    var Promotion_Task = Promotion.build({
        name: params.name,
        promotionBannerSize: params.promotionBannerSize,
        externalMappingId: params.externalMappingId
    });

    Promotion_Task.save().success(function () {
    });

    res.send(params);
};

PromotionController.addBanner = function (req, res, next) {
    //  프로모션 배너를 추가한다.

    var params = req.body;
    var imageList = params.images.split(",");

    PromotionBanner.sync();
    var PromotionBanner_Task = PromotionBanner.build({
        images: JSON.stringify(imageList),
        targetType: params.targetType,
        targetId: params.targetId,
        promotionId: params.promotionId
    });
    PromotionBanner_Task.save();

    res.send('Promotion addbanner');
};

PromotionController.deleteWithId = function (req, res, next) {
    //  프로모션을 삭제한다.
    //console.log('Promotion deleteWithId');
};

PromotionController.updateWithId = function (req, res, next) {
    //  프로모션을 업데이트(수정) 한다.
};

PromotionController.autoInputPromotion = function (req, res, next) {
    //  프로모션을 자동으로 등록한다.
    Promotion.sync();

    var name;
    var promotionBannerSize;
    var externalMappingId;

    var Promotion_Task;

    for (var i = 1; i <= 10000; i++) {
        name = '프로모션 자동등록' + String(i);
        promotionBannerSize = (i % 3) + 'x1';
        externalMappingId = String(i);

        //console.log(' i : ' + i + ' / name : ' + name + ' / promotionBannerSize : ' + promotionBannerSize + ' / externalMappingId : ' + externalMappingId);

        Promotion_Task = Promotion.build({
            name: name,
            promotionBannerSize: promotionBannerSize,
            externalMappingId: externalMappingId
        });

        Promotion_Task.save().success(function () {
        });
    }
    res.send('Promotion addbanner');
};


PromotionController.autoInputPromotionBanner = function (req, res, next) {
    //  프로모션을 자동으로 등록한다.
    //console.log('Promotion autoInputPromotion');
    PromotionBanner.sync();

    var imageList;
    var targetType;
    var targetId;
    var promotionId;
    var PromotionBanner_Task;


    for (var i = 1; i <= 1000; i++) {

        imageList = [String(i) + '.png', String(i + 1) + '.png', String(i + 2) + '.png', String(i + 3) + '.png', String(i + 4) + '.png'];

        for (var j = 1; j <= 5; j++) {

            if ((i % 3) == 0) {
                targetType = 'category';
                targetId = '11' + j;
            } else if ((i % 3) == 1) {
                targetType = 'theme';
                targetId = '22' + j;
            } else {
                targetType = 'asset';
                targetId = 'cjc|M00000000000000000' + j;
            }

            promotionId = i;

            PromotionBanner_Task = PromotionBanner.build({
                images: JSON.stringify(imageList),
                targetType: targetType,
                targetId: targetId,
                promotionId: promotionId
            });

            PromotionBanner_Task.save();

        }
    }
    res.send('Promotion addbanner');
};

module.exports = PromotionController;