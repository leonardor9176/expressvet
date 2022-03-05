const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://leonardor:qwerty1234@cluster0.rmycf.mongodb.net/express_vet?retryWrites=true&w=majority'

const connectDB = async () =>{
    try{
        await mongoose.connect(connectionString).then(()=>{
            console.log("Se ha establecido conexión con la base de datos!")
        })
    }catch(err){
        console.log(err.message)
    }
}

module.exports = {
    connectDB
}
