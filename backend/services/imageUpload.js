const axios = require('axios');

const generateName = () => {


     const timestamp = Date.now();
    
  
    const randomString = Math.random().toString(36).substring(2, 15) + 
                         Math.random().toString(36).substring(2, 15);
    
   
    let uniqueName = `${timestamp}_${randomString}`;

    return uniqueName;
}

const uploadImage = async (image) =>
{

    try{
        let imageName = generateName();
        console.log("imageName",imageName);
        let dataToSend = {
            key:process.env.IMAGE_KEY,
            image:image,
            name:imageName
    
        }
    
        const response = await axios.post(`https://api.imgbb.com/1/upload`, null, {
            params: dataToSend,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    //    console.log("res",response);

       if(response.status == '200')
       {
        return response.data.data.url;
       }

       return null;
    }
    catch(e){
        console.log("error",e);
    }
    
      
}

module.exports = {uploadImage}


