import app from "./app"
import config from "./config"
import mongoose from 'mongoose'


async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('Connected to MongoDB')
        app.listen(config.port, () => {
            console.log(`App listening on port ${config.port}`)
        })


    } catch (error) {
        console.log(error)
    }
}

main().catch(err => console.log(err));