const request=require('request')

const forecast=(lat,long,callback)=>{
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=3723a18726465f1e6eb8db98b9654678&units=metric";
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect ot the server!",undefined)
        }else if(response.body.error){
            callback('unable to find the location !, try another location',undefined)
        }
        else{
            callback(undefined,response.body.main.temp)
        }
    })
}
module.exports=forecast