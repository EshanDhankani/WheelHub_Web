const user = require('../models/userModel');
const car = require("../models/public/CarAd");


const getUsedCarsByUser = async (req, res) => {
    try {
      const result = await car.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId', 
            foreignField: '_id', 
            as: 'userDetails',
          },
        },
        {
          $unwind: '$userDetails', 
        },
        {
          $project: {
            
            _id: 1,
            userId: 1,
            city: 1,
            carInfo: 1,
            year: 1,
            registeredIn: 1,
            exteriorColor: 1,
            mileage: 1,
            price: 1,
            adDescription: 1,
            mobileNumber: 1,
            images: 1,
            createdAt: 1,
            updatedAt: 1,
         
            firstname: '$userDetails.firstname',
            lastname: '$userDetails.lastname',
            email: '$userDetails.email',
          },
        },
      ]);
  
      console.log(result);
      res.json(result);
    } catch (err) {
      console.error('Error fetching used cars:', err);
      res.status(500).json({ message: 'Failed to fetch data', error: err.message });
    }
  };
  
  module.exports = {
    getUsedCarsByUser,
  };
  

