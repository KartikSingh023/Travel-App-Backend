const express = require("express");
const { validationResult } = require("express-validator");
// const { getAllTourOrders } = require("../services/orderService");
const { TourService } = require("../services/tourServices");

const tourService = new TourService();

class TourController {
  addTour = async (req, res, next) => {
    let userId = req.headers.user;
    const fileType = ["image/jpg", "image/png", "image/jpeg"];
    if (fileType.findIndex((e) => e === req.file.mimetype) === -1) {
      return res
        .status(400)
        .send("Upload a image file with jpg /jpeg/png extensions");
    }
    const validationErr = validationResult(req);
    if (!validationErr.isEmpty()) {
      return res.status(400).json({ errors: validationErr.array() });
    }
    if (userId > 0) {
      let tourExist = await tourService.getTours({
        where: {
          package_name: req.body.name,
          user: {
            id: userId,
          },
        },
      });
      if (tourExist.length > 0) {
        console.log(tourExist);
        return res.status(400).json("Tour Exists");
      }
      let tour = {
        package_name: req.body.name,
        from: req.body.from,
        to: req.body.to,
        tour_image: "http://localhost:8080/uploads/" + req.file.filename,
        provider_license: req.body.license,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        total_days: req.body.days,
        cost: req.body.cost,
        user: userId,
      };
      console.log(tour.user);
      await tourService.addNewTour(tour);
      return res.status(200).json("Saved Tour Data / Awaiting Confirmation");
    }
    return res.status(400).json("No User Exists");
  };

  viewTours = async (req, res, next) => {
    let userId = req.headers.user;
    if (userId > 0) {
      let totalTour = await tourService.getTours({
        where: {
          user: {
            id: userId,
          },
        },
      });
      if (totalTour) {
        return res.status(200).json(totalTour);
      }
      return res.status(400).json("No Tour Available");
    }
    return res.status(400).json("No Tour Available");
  };

  tourPagination = async (req, res, next) => {
    const ITEMS_PER_PAGE = 2;
    const take = ITEMS_PER_PAGE;
    //const skip= (take-1) > 1 ? (take-1):0
    const skip = (parseInt(req.params.take) - 1) * ITEMS_PER_PAGE;
    let userId = req.headers.user;
    console.log(userId);
    let totalTour = await tourService.getTours({
      where: {
        user: {
          id: userId,
        },
      },
      take: take,
      skip: skip,
    });
    if (totalTour) {
      return res.status(200).json(totalTour);
    }
    return res.status(400).json("No Tour Available");
  };

  updateTour = async (req, res, next) => {
    let roleId = parseInt(req.headers.role[0]);
    let name = req.body.name;
    let tourId = req.body.tourId;
    let tourExist = await tourService.getTours({
      package_name: req.body.name,
      user: {
        id: req.body.user,
      },
    });
    const fileType = ["image/jpg", "image/png", "image/jpeg"];
    if (fileType.findIndex((e) => e === req.file.mimetype) === -1) {
      return res
        .status(400)
        .send("Upload a image file with jpg /jpeg/png extensions");
    }
    const validationErr = validationResult(req);
    if (!validationErr.isEmpty()) {
      return res.status(400).json({ errors: validationErr.array() });
    }
    //update Request
    if (tourExist) {
      let myTour = await tourService.updateTourData(tourId, {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        tour_image: "http://localhost:8080/uploads/" + req.file.filename,
        description: req.body.description,
        cost: req.body.cost,
      });
      return res.status(200).json("Tour Data Updated");
    }
    return res.status(400).json("Not Found Tour");
  };

  // getAdminTourOrders = async (req, res, next) => {
  //   const roleId = parseInt(req.headers.role[0]);
  //   //update Request
  //   const myTour = await getAllTourOrders();
  //   if (myTour) {
  //     return res.status(200).json(myTour);
  //   }
  //   return res.status(400).json("Not Found Tour");
  // };

  removePackage = async (req, res, next) => {
    const id = +req.params.id;
    const myTour = await tourService.deletePackage(id);
    if (myTour) {
      return res.status(200).json("Tour Package Deleted");
    }
    return res.status(400).json("Not Found Tour");
  };
}


module.exports = { TourController}