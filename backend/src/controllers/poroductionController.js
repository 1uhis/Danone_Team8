import asyncHandler from 'express-async-handler'
import Production from "../models/productionModel.js";

// @desc    Get all Production
// @route   GET /api/productions
// @access  Public

const getProductions = asyncHandler(async (req, res) => {

    let pageSize = 10;
    let page = 1;

    let query= {};
    // let conditions: any = {};
    Object.keys(req.query).forEach(function (key) {
        switch (key) {
            case "_id":
                query[key] = req.query[key];
                break;
            case "page":
                page = Number(req.query[key]);
                break;
            case "pageSize":
                pageSize = Number(req.query[key]);
                break;
            case "date":
                const date = new Date(req.query[key]);
                const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
                query[key] = {
                    $gte: date,
                    $lt: nextDate,
                };
                break;
            default:
                query[key] = {
                    $regex: req.query[key],
                    $options: "i",
                };
        }
    });

    try {
        const count = await Production.countDocuments({ ...query });
        const productions = await Production.find({ ...query })
            .sort({ updatedAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({
            data: productions,
            success: true, // Always return success as true
            total: count, // Total count of the data
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch production dailies" });
    }

})


export {
    getProductions,
}
