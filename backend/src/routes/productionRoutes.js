import express from 'express'

const router = express.Router()
import {
    getProductions
} from '../controllers/poroductionController.js'
import {protect} from '../middleware/authMiddleware.js'

router.route('/').get(getProductions)


export default router
