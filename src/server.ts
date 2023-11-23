import app from "./app"
import config from "./config"
import mongoose from 'mongoose'


async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        app.listen(config.port, () => {
            console.log(`App listening  port ${config.port}`)
        })


    } catch (error) {
        console.log(error)
    }
}

main().catch(err => console.log(err));