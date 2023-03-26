const { AdminService } = require('../services/adminService')
const { BannerService } = require('../services/bannerServices')

const { TourService } = require('../services/tourServices')

const adminService = new AdminService()
const bannerService = new BannerService()
const tourService = new TourService()

const {Banner} = require('../models/Banner');

const {User}  = require('../models/User');

class AdminController {
    
    // viewAllTourRequests = async (req, res, next) => {
    //     const limit = req.query.limit ? +req.query.limit : 0
    //     const page = req.query.page ? +req.query.page : 0
    //     const skip = page * limit
    //     const search = req.query.search ? req.query.search : ''
    //     let requests = await adminService.getAllRequests({ status: false })
    //     let role = parseInt(req.headers.role[1])
    //     let tour = await tourService.tourRequests(limit, skip, search)
    //     if (tour) {
    //         return res.status(200).json({ tour })
    //     }
    //     return res.status(400).json('Not Found Any Requests')
    // }

    // viewAllBanner = async (req, res, next) => {
    //     const limit = req.query.limit ? +req.query.limit : 0
    //     const page = req.query.page ? +req.query.page : 0
    //     const skip = page * limit
    //     const search = req.query.search ? req.query.search : ''
    //     let banners = await bannerService.getAdminBannerData(
    //         limit,
    //         skip,
    //         search
    //     )
    //     let role = parseInt(req.headers.role[1])
    //     if (banners) {
    //         return res.status(200).json(banners)
    //     }
    //     return res.status(400).json('Not Found Any Requests')
    // }

    getAllAdmins = async(req, res, next) => {
        try {
            const users = await User.find({"privilege.isAdmin": true}).select('-password');
            console.log('users:\n', users);
            res.status(200).json(users);            
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Error occurred while fetching all admins');
        }
    }

    getAllBanners = async(req, res, next) => {
        try {
            const allBanners = await Banner.find();
            console.log('Banners:\n', allBanners);
            res.status(200).json(allBanners);              
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Error occurred while fetching all admins');
        }
    }

    updateBanner = async(req, res, next) => {
        try {
            const {page, img_link} = req.body;
            console.log('img_link', img_link);
            const banner = await Banner.findOne({page: page});
            const updatedBanner = await Banner.findByIdAndUpdate(banner._id, {img_link: img_link}, {new: true});
            console.log('updated banner', updatedBanner);
            res.status(200).json(updatedBanner);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Error occurred while fetching all admins');
        }
    }

    addAdmin = async (req, res, next) => {
        try {
            const email = req.body.email
            const filter = { email: email }
            const update = { isAdmin: true }
            const options = { new: true }
            const user = await findOne(filter);
            const updatedUser = await User.findByIdAndUpdate(user._id, update, options).select('-password')
            console.log('Admin Added');
            res.status(200).json(updatedUser);
        } catch (err) {
            console.log(err.message);
            res.sendStatus(500);
        }
    }

    updateAdminRole = async (req, res, next) => {
        try {
            const {email, newRole} = req.body;

            if(!email || !newRole) {
                return res.send(400).send('Incomplete information');
            }

            const user = await User.findOne({email});
            
            console.log('user found', user);

            if(!user) {
                return res.send(400).send('No such user exists');
            }
            
            const updatedPrivileges = {isAdmin: user.privilege.isAdmin, role: newRole};

            console.log('dfdsk:', updatedPrivileges);

            const updatedUser = await User.findByIdAndUpdate(user._id, {privilege: updatedPrivileges}, {new: true}).select('-password');

            console.log('updated user:', updatedUser);

            res.status(200).json(updatedUser);

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Error occurred in updateAdminRole controller');
        }
    }

    removeAdminRights = async (req, res, next) => {
        try {
            const {email} = req.body;
            
            if(!email) {
                return res.send(400).send('Incomplete information');
            }

            const user = await User.findOne({email});

            if(!user) {
                return res.send(400).send('No such user exists');
            }

            const updatedPrivilege = {privilege: {isAdmin: false, role: 'visitor'}};

            const updatedUser = await User.findByIdAndUpdate(user._id, updatedPrivilege, {new: true});

            console.log('updated user', updatedUser);

            res.status(200).json(updatedUser);

        } catch (err) {
            console.log(err.message);
            res.status(500).send('An error occurred while removing the admin rights');
        }
    }

    // changeBanner = async (req, res) => {
    //     try {
    //         const {newName} = req.body;
    //         if(!newName) {
    //             throw new Error('Not Found.');
    //             return;
    //         }
    //         const banner = await Banner.find()[0];
    //         const newBanner = await Banner.findByIdAndUpdate(banner._id, {
    //             package_name: newName,
    //         }, {
    //             new: true,
    //         });
    //         res.status(200).json(newBanner);
    //     } catch (err) {
    //         console.log(error.message);
    //         res.sendStatus(500);
    //     }
    // }
}

module.exports = { AdminController }
