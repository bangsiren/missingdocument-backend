var cloudinary = require('cloudinary');
const formidable = require('formidable')
cloudinary.config({
    cloud_name: 'b-tec',
    api_key: '544984634748171',
    api_secret: 'n0HBlW9nrGMqhIArZi9f6Q8qiIA'
});
let cloudinaryv2 = cloudinary.v2
let fileUploader = (filePath) => {
    return cloudinaryv2.uploader.upload(filePath, { folder: `files/images` });
}
// formidable
exports.uploadFile = (req, res) => {
    // console.log('HYYEYUYEEYEYYEY');
    const form = new formidable.IncomingForm()
    // res.send('Sending')
    form.on('file', (field, file) => {
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path
        fileUploader(file.path).then(val => {
            console.log('Runningg')
            res.json({
                success: true,
                name: req.body.name,
                path: val.secure_url
            });
        }).catch(er => {
            res.json({ success: false })
        });
    });

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