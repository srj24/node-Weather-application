const request=require('request')



const geocode=(address,callback)=>{
    const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hpdnJhai0yNCIsImEiOiJja20yZG5kdWYxcHdyMnZxZXlmbGo1M2V4In0.P3VWkRABuIwM_eg_OkkgVw&limit=1'
    
    request({url:geocodeurl,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect ot the server!",undefined)
        }
        else if(response.body.features.length === 0){
            callback('unable to find the location !, try another location',undefined)
        }
        else{
            callback(undefined,{ 
                lat:response.body.features[0].center[1],
                long:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })


        }
    })
}
    
module.exports=geocode
