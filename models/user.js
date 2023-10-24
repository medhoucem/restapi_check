const mongoose = require ('mongoose')

const user_shcema = mongoose.Schema(
    {
         name : {
            type : String,
            require : true,
         }
    },
    {
        collection : "users"
    }
);

const user_model = mongoose.model("user",user_shcema);
module.exports = user_model;
