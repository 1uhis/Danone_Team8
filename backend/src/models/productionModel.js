import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const productionSchema = mongoose.Schema(

    /*SKU number,Production Order,Production Spec Sheet,Shopping Layout,BOM*/

    {
        skuNumber: {
            type: String,
            required: true,
        },
        skuNumberPDF: {
            type: String,
            required: true,
        },
        productionOrder:{
            type: String,
            required: true,
        },
        productionOrderPDF:{
            type: String,
            required: true,
        },
        productionSpecSheet:{
            type: String,
            required: true,
        },
        productionSpecSheetPDF:{
            type: String,
            required: true,
        },
        shoppingLayout:{
            type: String,
            required: true,
        },
        bom:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Production = mongoose.model('Production', productionSchema)

export default Production
