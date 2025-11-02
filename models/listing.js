const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema=new Schema({
   title:{
      type:String,
      required:true,
   },
   description:String,
   image:{
      filename:String,
      url:{
      type:String,
      default:"https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      set:(v)=> v===""?"https://images.unsplash.com/photo-1501785888041-af3ef285b470":v,
   }},
   price: {
    type: Number,
    required: true, 
    default: 0,
},
   location:String,
   country:String,
   reviews: [
      {      
         type: Schema.Types.ObjectId,
         ref:"Review",
      }
   ]
});

listingSchema.post("findOneAndDelete", async (listing)=>{
   if(listing ){
      await Review.deleteMany({_id : {$in:listing.reviews}});
   };
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;