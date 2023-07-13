import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log('process.env.MONGO_URI',process.env.MONGO_URI)
    console.error(`Mongo Error: ${error.message}`)
    process.exit(1)
  }
}
export default connectDB
