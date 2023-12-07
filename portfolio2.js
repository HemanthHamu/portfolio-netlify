const imageContainer = document.querySelector('.image-container');
const myImage = document.querySelector('.image-adjustment');
const border = document.querySelector('.my-image')
// var col1 = '#0E1226'
// var col2 = '#251B4F'
// var col3 = '#fff'
// var col4 = '#000'

function changecolor(){
        if( myImage.style.width === '200px' & myImage.style.height === '200px'){
            myImage.style.width = '205px';
            myImage.style.height = '205px';
            border.style.width = '205px';
            border.style.height = '205px'
        }
        else{
            myImage.style.width = '200px';
            myImage.style.height = '200px';
            border.style.width = '200px';
            border.style.height = '200px'
        }
}
changecolor()

setInterval(changecolor,1000)

 