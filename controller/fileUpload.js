exports.index = async (req, resp) => {
    if (!req.files) {
        resp.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        let file = req.files.file;
        let path = 'uploads/' + Math.random().toString(36).substring(7) + file.name;
        file.mv(path, (err) => {
            if (err)
                resp.status(413).send(err);
            resp.send(
                {
                    name: req.body.name,
                    path: path
                }
            );
        });
    }
}