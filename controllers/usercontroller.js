let list = [
  { name: "mamad", id: 1 },
  { name: "meti", id: 2 },
];
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
  postUserList,
};
