function gettingDate(){
const fileInput = document.querySelector('.fileInput');
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    for(let file of files){
    const date = new.Date(event.target.files[0].lastModified);
    console.log('${file.name} has last modified date of ${date}');
    return date;
    }
});
};