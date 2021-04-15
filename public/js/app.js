

// To print the result on web
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')



//to get the search provided by the user:
const weatherform = document.querySelector('form')
const search=document.querySelector('input')
weatherform.addEventListener('submit',(e)=>{
    const location=search.value
    e.preventDefault()
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        //console.log(data)
        messageOne.textContent=data.Forecastdata
        messageTwo.textContent="Thank you for using this site"
       
    })
})
})

