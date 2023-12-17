function sendmail(){
    var params = {
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        message:document.getElementById('message').value
    }
    if(params.name==="" && params.email===""){
        alert('please fill every field...')
    }
    else{
        const serviceId = 'service_h2gubkn';
        const templateId = 'template_ialmcmd'
        emailjs.send(serviceId,templateId,params)
        .then(function (res){
            alert('Form submitted successfully...' + res.status)
        })
    } 
}