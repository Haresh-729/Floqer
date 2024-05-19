const express = require('express');
const SalaryData = require("../Models/salariesModel.js");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const data = await SalaryData.find();
      // res.json(data);
      res.status(200).json({success:true, message: 'Success', alldata: data });
    } catch (err) {
      console.error(err);
      res.status(500).json({success:false, message: 'Server Error'});
    }
  });
router.get('/count', async (req, res) => {
    try {
      const count = await SalaryData.countDocuments();
      // res.json(data);
      res.status(200).json({success:true, message: 'Success', count });
    } catch (err) {
      console.error(err);
      res.status(500).json({success:false, message: 'Server Error'});
    }
  });
router.get('/mainTabledata', async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: "$work_year",
                    no_of_jobs: { $sum: 1 },
                    avg_salary_in_usd: { $avg: "$salary_in_usd" }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id",
                    no_of_jobs: 1,
                    avg_salary_in_usd: 1
                }
            },
            {
                $sort: {
                    year: 1
                }
            },
            
        ];

        const result = await SalaryData.aggregate(pipeline);
        return res.status(200).send({ success:true, message: "Main table data Fetched.", mainTableData: result});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
  router.get('/yearStats/:year', async (req, res) => {
    try {
        const year = parseInt(req.params.year); // Get the year from URL parameter
        const stats = await SalaryData.aggregate([
            {
                $match: { work_year: year } // Match documents for the given year
            },
            {
                $group: {
                    _id: null,
                    titles: { $addToSet: '$job_title' }, // Get unique job titles
                    jobCount: { $sum: 1 }, // Count total number of jobs
                    avgSalaryUSD: { $avg: '$salary_in_usd' }, // Calculate average salary in USD
                    avgSalary: { $avg: '$salary' }, // Calculate average salary
                    locations: { $addToSet: '$company_location' } // Get unique company locations
                }
            },
            {
                $project: {
                    _id: 0,
                    titleCount: { $size: '$titles' }, // Count of unique job titles
                    jobCount: 1,
                    avgSalaryUSD: 1,
                    avgSalary: 1,
                    locationCount: { $size: '$locations' } // Count of unique company locations
                }
            }
        ]);
        const tableData = await SalaryData.aggregate([
            {
                $match: { work_year: year } // Match documents for the given year
            },
            {
                $group: {
                    _id: '$job_title', // Group by job title
                    count: { $sum: 1 } // Count the occurrences of each job title
                }
            },
            {
                $project: {
                    _id: 0,
                    job_title: '$_id', // Rename _id to job_title
                    count: 1
                }
            }
        ]);
        return res.status(200).send({ success:true, message: "Main table data Fetched.", yeardata: {stats, tableData}});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});


  module.exports = router;