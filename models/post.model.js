const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    device:{type:String,require:true},
    userID:{type:String,require:true}
})
// title ==> String
// body ==> String
// device ==> String
const Postmodel=mongoose.model("post",postSchema);

module.exports={
    Postmodel
}