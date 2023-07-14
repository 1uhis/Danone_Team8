import express from 'express'
import fs from 'fs'
import csv from 'fast-csv'
import Production from "../models/productionModel.js";
import multer from 'multer'
import readline from 'readline'
import PDFDocument from 'pdfkit';

const router = express.Router()
const upload = multer({dest: 'uploads/'});

router.post('/', upload.single('file'), (req, res) => {
    try {

        const filePath = req.file.path;
        const fileStream = fs.createReadStream(filePath)
        let lines = []
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        const processData = async (lines) => {

            let validatePromiseArray = []
            lines.forEach((line) => {
                const [a, b, c, d] = line.split('\t');
                validatePromiseArray.push(Production.findOne({productionOrder: a}))
            })

            let result = await Promise.all(validatePromiseArray)
            result = result.filter(e=>!!e)

            if (result.length) {
                res.status(400).json({message: 'Duplicate Production Order'})
            } else {
                lines.forEach((line) => {
                    const [a, b, c, d] = line.split('\t');
                    saveData(a, b, c, d)
                })
                res.json({message: 'Success'})
            }

        }

        const saveData = (a, b, c, d) => {
            const newProduction = new Production({
                skuNumber: b,
                skuNumberPDF: `/uploads/ShoppingLayout/Shopping Layout ${b}.pdf`,
                productionOrder: a,
                productionOrderPDF: `/uploads/BOM/${a}.pdf`,
                productionSpecSheet: c,
                productionSpecSheetPDF: `/uploads/PackingSpec/Packing Spec ${c}.pdf`,
                shoppingLayout: b,
                bom: a,
                status: d
            });

            const bom_doc = new PDFDocument();

            bom_doc.pipe(fs.createWriteStream(`./uploads/BOM/${a}.pdf`));
            bom_doc.save().fill('black')
                .translate(400, -50)
                .rotate(90)
                .fontSize(80)
                .text('PO' + a, {
                    align: 'center',
                    width: 800,
                    height: 500,
                    valign: 'center',
                    lineBreak: false,
                    font: 'Calibri'
                });
            bom_doc.end();

            const sp_doc = new PDFDocument();

            sp_doc.pipe(fs.createWriteStream(`./uploads/ShoppingLayout/Shopping Layout ${b}.pdf`));
            sp_doc.save().fill('black')
                .translate(450, -50)
                .rotate(90)
                .fontSize(80)
                .text('Shopping Layout\n' + b, {
                    align: 'center',
                    width: 800,
                    height: 500,
                    valign: 'center',
                    lineBreak: false,
                    font: 'Calibri'
                });

            sp_doc.end();


            const ps_doc = new PDFDocument();

            ps_doc.pipe(fs.createWriteStream(`./uploads/PackingSpec/Packing Spec ${c}.pdf`));
            ps_doc.save().fill('black')
                .translate(450, -50)
                .rotate(90)
                .fontSize(80)
                .text('Packing Spec\n' + c, {
                    align: 'center',
                    width: 800,
                    height: 500,
                    valign: 'center',
                    lineBreak: false,
                    font: 'Calibri'
                });
            ps_doc.end();

            // Save the document to the database
            newProduction.save()
                .then(() => {
                    console.log('Saved new production to database');
                })
                .catch(err => console.error(err));
        }

        rl.on('close', () => {
            processData(lines)
        })
        rl.on('line', async (row) => {
            // Create new Production document
            lines.push(row)
            /*
            const product = await Production.findOne({productionOrder: a})

            if (product) {

            } else {
                const newProduction = new Production({
                    skuNumber: b,
                    skuNumberPDF: `/uploads/ShoppingLayout/Shopping Layout ${b}.pdf`,
                    productionOrder: a,
                    productionOrderPDF: `/uploads/BOM/${a}.pdf`,
                    productionSpecSheet: c,
                    productionSpecSheetPDF: `/uploads/PackingSpec/Packing Spec ${c}.pdf`,
                    shoppingLayout: b,
                    bom: a,
                    status: d
                });

                const bom_doc = new PDFDocument();

                bom_doc.pipe(fs.createWriteStream(`./uploads/BOM/${a}.pdf`));
                bom_doc.save().fill('black')
                    .translate(400, -50)
                    .rotate(90)
                    .fontSize(80)
                    .text('PO' + a, {
                        align: 'center',
                        width: 800,
                        height: 500,
                        valign: 'center',
                        lineBreak: false,
                        font: 'Calibri'
                    });
                bom_doc.end();

                const sp_doc = new PDFDocument();

                sp_doc.pipe(fs.createWriteStream(`./uploads/ShoppingLayout/Shopping Layout ${b}.pdf`));
                sp_doc.save().fill('black')
                    .translate(450, -50)
                    .rotate(90)
                    .fontSize(80)
                    .text('Shopping Layout\n' + b, {
                        align: 'center',
                        width: 800,
                        height: 500,
                        valign: 'center',
                        lineBreak: false,
                        font: 'Calibri'
                    });

                sp_doc.end();


                const ps_doc = new PDFDocument();

                ps_doc.pipe(fs.createWriteStream(`./uploads/PackingSpec/Packing Spec ${c}.pdf`));
                ps_doc.save().fill('black')
                    .translate(450, -50)
                    .rotate(90)
                    .fontSize(80)
                    .text('Packing Spec\n' + c, {
                        align: 'center',
                        width: 800,
                        height: 500,
                        valign: 'center',
                        lineBreak: false,
                        font: 'Calibri'
                    });
                ps_doc.end();

                // Save the document to the database
                newProduction.save()
                    .then(() => {
                        console.log('Saved new production to database');
                    })
                    .catch(err => console.error(err));
            }*/
        })
    } catch (err) {
        console.error(err);
        // res.status(500).json({message: 'Server Error'})
    }
});

export default router
