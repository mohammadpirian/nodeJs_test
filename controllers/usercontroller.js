let list = [
  { name: "mamad", id: 1 },
  { name: "meti", id: 2 },
];

const UserModel = require("../models/user");

const registerUser = async (req, res) => {
  try {
    let newUser = new UserModel({
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.status(200).send({
      message: "ok",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      messgae: "ridi",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    let data = await UserModel.find({});
    res.send({
      message: "ok",
      data: data,
    });
  } catch (error) {
    res.send({
      message: "nok",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let { id, email } = req.body;
    const newUser = await UserModel.updateOne({ email: email });
    res.send({ message: "ok" });
  } catch (error) {}
};

const handleGetById = async (req, res) => {
  const user = UserModel.findOne({email: req.body.email})
  res.send({
    user
  })
};

const editUserById = async (req, res, next) => {
	const { id: userId } = req.params;
	const {
		firstname = null,
		lastname = null,
		username = null,
		password = null,
		phoneNumber = null,
		email = null,
		address = null
	} = req.body;

	const user = await UserModel.findById(userId).select('+select');
	if (!user) {
		return next(new AppError(404, `user: ${userId} not found`));
	}

	const duplicateUsername = await UserModel.findOne({ username });
	if (!!duplicateUsername && duplicateUsername.username !== user.username) {
		return next(
			new AppError(
				409,
				'username  is already exists. choose a different username'
			)
		);
	}

	const duplicatePhoneNumber = await UserModel.findOne({ phoneNumber });
	if (
		!!duplicatePhoneNumber &&
		duplicatePhoneNumber.phoneNumber !== user.phoneNumber
	) {
		return next(new AppError(409, 'phoneNumber is already exists.'));
	}

	user.firstname = firstname ?? user.firstname;
	user.email = email ?? user.email;
	user.lastname = lastname ?? user.lastname;
	user.username = username ?? user.username;
	user.password = password ?? user.password;
	user.phoneNumber = phoneNumber ?? user.phoneNumber;
	user.address = address ?? user.address;

	user.save({ validateBeforeSave: true });

	res.status(201).json({
		status: 'success',
		data: { user }
	});
};

const getUserList = (req, res) => {
  res.status(200).send({
    success: true,
    message: "yes",
    data: list,
  });
};

const postUserList = (req, res) => {
  let temp = {
    name: req.body.name,
    id: req.body.id,
  };
  list.push(temp);
  console.log(req.query);

  res.status(200).send({
    data: list,
  });
};

module.exports = {
  getUserList,
  handleGetById,
  postUserList,
  updateUser,
  getAllUser,
  registerUser,
  editUserById
};
