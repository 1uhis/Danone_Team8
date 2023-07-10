
import dotenv from 'dotenv'
import User from '../src/models/userModel.js'
import Production from '../src/models/productionModel.js'

import connectDB from '../config/db.js'

import users from './users.js'
import path from "path";


let envPath;

if (process.env.NODE_ENV === "development") {
    envPath = path.resolve(process.cwd(), ".env.development");
} else if (process.env.NODE_ENV === "production") {
    envPath = path.resolve(process.cwd(), ".env.production");
} else {
    envPath = path.resolve(process.cwd(), ".env.development");
}

console.log('envPath',envPath)
dotenv.config({
    path: envPath,
});


connectDB()

const importData = async () => {
    try {

        await User.deleteMany()
         await User.insertMany(users)


        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Production.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
