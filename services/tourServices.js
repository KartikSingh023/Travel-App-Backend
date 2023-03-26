const {Package} = require('../models/Package')

class TourService {
    tourRequests = async (limit, skip, search) => {
        if (search === '') {
            const resultData = await TOUR_DATA.findAndCount({
                where: {
                    status: false,
                },
                take: limit,
                skip: skip,
            })
            if (resultData[1] > 0) {
                return resultData
            }
            return null
        }
        const resultData = await TOUR_DATA.createQueryBuilder('tour')
            .innerJoinAndSelect('tour.user', 'user')
            .innerJoinAndSelect('user.role', 'role')
            .where('tour.package_name ILIKE :q or user.name ILIKE :q', {
                q: `%${search}%`,
            })
            .where('tour.status =:status', { status: false })
            .getMany()
        if (resultData.length > 0) {
            return resultData
        }
        return null
    }

    updateTourData = async (id, query) => {
        const resultData = await TOUR_DATA.update(id, query)
        return resultData
    }

    getTours = async (query) => {
        const resultData = await TOUR_DATA.find(query)
        return resultData
    }

    addNewTour = async (tourData) => {
        let _package = new Pacakge({...tourData})
        // tour.package_name = tourData.package_name
        // tour.from = tourData.from
        // tour.to = tourData.to
        // tour.tour_image = tourData.tour_image
        // tour.provider_license = tourData.provider_license
        // tour.description = tourData.description
        // tour.availablity = true
        // tour.status = false
        // tour.startDate = tourData.startDate
        // tour.endDate = tourData.endDate
        // tour.total_days = tourData.total_days
        // tour.max_person = 100
        // tour.cost = tourData.cost
        // tour.user = tourData.user
        const response = await Package.save(_package)
        console.log({response})
    }

    getTourById = async (query) => {
        const resultData = await Pacakge.findOne(query)
        return resultData
    }

    deletePackage = async (id) => {
        const tourData = await TOUR_DATA.findOne({
            tour_id: id,
        })
        const bannerData = await BANNER_DATA.findOne({
            tour: {
                tour_id: id,
            },
        })
        const removeBanner = await BANNER_DATA.remove(bannerData)
        const response = await TOUR_DATA.remove(tourData)
        return response
    }
}

module.exports = { TourService }
