const { Buffer } = require('buffer');
var cloudinary = require('cloudinary');
const formidable = require('formidable');
const axios = require('axios');
cloudinary.config({
    cloud_name: 'b-tec',
    api_key: '544984634748171',
    api_secret: 'n0HBlW9nrGMqhIArZi9f6Q8qiIA'
});
let cloudinaryv2 = cloudinary.v2
let fileUploader = (filePath) => {
    return cloudinaryv2.uploader.upload(filePath, { folder: `files/images` });
}
// let deleteFile  = cloudinaryv2.uploader.destroy(filePath, function(result){
//     console.log(result)
// })
// formidable
exports.uploadFile = (req, res) => {
    // console.log('HYYEYUYEEYEYYEY');
    const form = new formidable.IncomingForm()
    // res.send('Sending')
    form.on('file', (field, file) => {
        // console.log(file);
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path
        // convert file to base64 to use in model
        var fs = require('fs');

// function to encode file data to base64 encoded string
// function base64_encode(path) {
//     // read binary data
//     var bitmap = fs.readFileSync(file);
//     // convert binary data to base64 encoded string
//     return new Buffer(bitmap).toString('base64');
// }
// console.log(base64_encode(file.path+""));
var bitmap = fs.readFileSync(file.path);
let ss = bitmap.toString('base64');


const data = {
    image: ss,
};

axios.post('http://127.0.0.1:5000/predict', data)
    .then((response) => {
  let sorted = response.data.predictions.sort((a,b)=>{
            return a.confidence - b.confidence;
        });
        if(sorted[0].label == "Others"){
            console.log("correct document");
                   fileUploader(file.path).then(val => {
            console.log('Runningg')
            res.json({
                success: true,
                name: req.body.name,
                message:"Correct Document",
                path: val.secure_url
            });
        }).catch(er => {
            res.json({ success: false })
        });
        }
        else{
            res.json({ success: false , message:"wrong document"})
        }

    }).catch((err) => {
        console.error(err);
        res.json({ success: false })
    });
     


    });

    // exports.deletingFile = (req, res) =>{
    //  let detele  = 
    // }

    form.on('end', () => {
        console.log("done")
    })

    form.parse(req)
};


// exports.index = async (req, resp) => {
//     if (!req.files) {
//         resp.send({
//             status: false,
//             message: 'No file uploaded'
//         });
//     } else {
//         let file = req.files.file;
//         let path = 'uploads/' + Math.random().toString(36).substring(7) + file.name;
//         file.mv(path, (err) => {
//             if (err)
//                 resp.status(413).send(err);
//             resp.send(
//                 {
//                     name: req.body.name,
//                     path: path
//                 }
//             );
//         });
//     }
// }
