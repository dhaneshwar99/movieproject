/**
 * Controller for file Routes
 */

const API_URL = process.env.API_URL
class FileController{
    static uploadFile(req,res,next){
        const uploadedFile = req.file
        if(uploadedFile===null ||uploadedFile===undefined){
         return res.json({
                error:true ,
                msg:"Image upload failed, image not found" ,
            }).status(400)
        }
        const imageUrl =API_URL +"uploads/"+ uploadedFile.filename
        return res.json({error:false  , msg:"OK" , url:imageUrl});
    }
    // static  async upload
}

module.exports = FileController
