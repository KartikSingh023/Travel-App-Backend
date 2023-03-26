const { Banner } = require('../models/Banner')
const { Package } = require('../models/Package')

class BannerService {
    getAllBanner = async (query) => {
        const resultData = await Banner.find(query)
        return resultData
    }

    getBannerById = async (query) => {
        const resultData = await BANNER_DATA.findOne(query)
        return resultData
    }

    updateBanner = async (banner) => {
        const resultData = await BANNER_DATA.save(banner)
        return resultData
    }

    getSequence = async (query, as) => {
        const resultData = await BANNER_DATA.createQueryBuilder('banner')
            .select(query, as)
            .getRawOne()
        return resultData
    }

    getTourBanner = async (query, as) => {
        const resultData = await BANNER_DATA.createQueryBuilder('banner')
            .innerJoinAndSelect(query, as)
            .getMany()
        return resultData
    }

    saveBanner = async (tour, sequence) => {
        const newBanner = BANNER
        ;(newBanner.tour = tour), (newBanner.sequence = sequence)
        const resultData = await BANNER_DATA.save(newBanner)
        return resultData
    }

    getBannerByTourId = async (id) => {
        const resultData = await BANNER_DATA.findOne({
            tour: {
                tour_id: id,
            },
        })
        return resultData
    }

    getAdminBannerData = async (take, skip, search) => {
        if (search !== '') {
            const resultData = await BANNER_DATA.createQueryBuilder('banner')
                .innerJoinAndSelect('banner.tour', 'tour')
                .where('tour.package_name ILIKE :q', {
                    q: `%${search}%`,
                })
                .getMany()
            return resultData
        }
        const resultData = await BANNER_DATA.findAndCount({
            take: take,
            skip: skip,
            order: {
                sequence: 'ASC',
            },
        })
        return resultData
    }
}

module.exports = { BannerService }
