const express = require('express')
const { body, check } = require('express-validator')

const { AdminController } = require('../controllers/AdminController')
const { TourController } = require('../controllers/TourController')

const router = express.Router()

const adminController = new AdminController()
const tourController = new TourController()

// create new packages and add to the database
// router.post('/package', tourController.addTour)

// update a package
// router.patch('/package', tourController.updateTour)

//banner update
// router.delete('/package/:id', tourController.removePackage)

// make new admin
router.patch('/team/new', adminController.addAdmin)

// update the role of an admin
router.patch('/team/update', adminController.updateAdminRole);

// router.patch('/banner', adminController.changeBanner);
router.patch('/team/remove', adminController.removeAdminRights)

router.get('/team', adminController.getAllAdmins);

router.get('/banners', adminController.getAllBanners);

router.patch('/banners', adminController.updateBanner);


// router.post(
//     '/update',
//     [
//         body('tour.tour').isNumeric().withMessage('Must be a Number'),
//         body('tour.category')
//             .isArray({ min: 1 })
//             .withMessage('Category Must be a Array'),
//         body('tour.closedOn').exists().withMessage('Closed on Must be a Date'),
//     ],
//     adminController.updateTourCategory
// )

// router.get("/banner", adminController.viewAllBanner);
// router.patch(
//   "/sequence",
//   [body("sequence").isNumeric().withMessage("Sequence Must be a Number")],
//   adminController.storeSequence
// );
// router.post(
//   "/category",
//   upload.single("file"),
//   [
//     body("category_name")
//       .isAlpha()
//       .withMessage(" Category_name Must be a text"),
//   ],
//   adminController.saveCategory
// );

// router.get("/category", adminController.viewAllCategory);

// router.delete("/delete/:id", adminController.deleteCategory);

module.exports = {
    adminRouter: router,
    adminController,
}

// export default router

// //for testing purpose


// export { adminController }
