const user = require('../models/userModel');
const AccessoryAd = require("../models/public/AccessoryAd");


const getAccessoryByUser = async (req, res) => {
    try {
      const result = await AccessoryAd.aggregate([
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
            accessoryInfo: 1,
            condition: 1,
            category:1,
            price: 1,
            accessoryDescription: 1,
            mobileNumber: 1,
            images: 1,
            createdAt: 1,
            updatedAt: 1,
            // Include userDetails fields at the root level
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
    getAccessoryByUser
  };
  

