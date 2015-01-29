var express = require('express');
var router = express.Router();
var PromotionController = require('../controllers/PromotionController');

router.get('/', PromotionController.getWithId);
router.put('/add', PromotionController.add);
router.put('/addBanner', PromotionController.addBanner);

router.get('/autoInputPromotions', PromotionController.autoInputPromotion);
router.get('/autoInputPromotionBanner', PromotionController.autoInputPromotionBanner);

module.exports = router;
