// ALl business logic goes here
const Users = require('../model/users_model');

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'b-tec',
    api_key: '544984634748171',
    api_secret: 'n0HBlW9nrGMqhIArZi9f6Q8qiIA'
});
let cloudinaryv2 = cloudinary.v2


// this method is to create the User
exports.create = (req, res) => {

  const user = new Users({
    f_email: req.body.f_email,
    f_name: req.body.f_name,
    f_number: req.body.f_number,
    files: req.body.files,
    name: req.body.name,
    number: req.body.number,
    address: req.body.address,
    dateTime: req.body.dateTime,
    createdTime: req.body.createdTime,
    updatedTime: req.body.updatedTime,
    // isActive: req.body.isActive,
    type: req.body.type,
  });


  user.save().then((data) => {
    res.send(data);
  }).catch((er) => {
    console.log(er)
    res.status(500).send({

      message: "Some Errors While Creating This User"
    })
  })
}
 
// Find ALl Users


exports.findAllUsers = async (req, res) => {

  if (!req.query.search) {
    Users.find()
      .sort({ updatedAt: -1 })
      .then((user) => {
        res.status(200).send(user)
      })

      .catch((er) => {
        res.status(500).send({
          message: er.message || "Error Occured"
        })

      })
  } else {
    try {

      const users = await Users.fuzzySearch(req.query.search);

      res.status(200).send(users);

    } catch (e) {
      console.error(e);
    }
  }
}


// Find One 

exports.findOne = (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'Task Not Found with id' + req.params.id
        })
      }
      res.status(200).send(user)
      console.log(user)
    })
    .catch((er) => {
      return res.status(500).send({
        message: 'Error retrieving user with id' + req.params.id
      });
    });
}


// Deleting A User With A Specific Id
exports.delete = (req, res) => {
  console.log('I am deleting')
  Users.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'user Not Found with id' + req.params.id
        })
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((er) => {
      return res.status(500).send({
        message: 'Could Not Delete A User'
      });
    });
}

// Update a user with the specified id in the request

exports.updateUser = (req, res) => {

  Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "No Users Found"
        });
      }
      res.status(200).send(user);
    })
    .catch((er) => {
      return res.status(404).send({
        message: "error while updating the post",
      });
    })
}

exports.claim = (req, res) => {
  Users.findByIdAndUpdate(req.params.id, {
    claimAt: Date.now()
  }, { new: false }).then(user => {
    res.send(user)
  })
}