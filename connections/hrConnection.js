const mongoose = require('mongoose')

const hrConnect = (url)=>{mongoose.connect(url)
    .then(
        ()=>console.log("Connected To Database")
    )
    .catch(error=>console.log(error))
}


module.exports = {hrConnect}
