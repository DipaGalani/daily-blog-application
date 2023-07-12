const express = require("express");
const bodyParser = require("body-parser");

const truncate = require("./truncate.js");
const title = require("./title.js");

const app = express();

const diaryArray = [
  {
    title: "Diary 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deleniti sunt quisquam reiciendis voluptatibus nihil, architecto debitisconsectetur repudiandae, vel, natus in doloremque provident quos? Nullasimilique tempore ratione temporibus?",
  },
  {
    title: "Diary 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deleniti sunt quisquam reiciendis voluptatibus nihil, architecto debitisconsectetur repudiandae, vel, natus in doloremque provident quos? Nullasimilique tempore ratione temporibus?",
  },
  {
    title: "Diary 3",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deleniti sunt quisquam reiciendis voluptatibus nihil, architecto debitisconsectetur repudiandae, vel, natus in doloremque provident quos? Nullasimilique tempore ratione temporibus?",
  },
  {
    title: "Diary 4",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deleniti sunt quisquam reiciendis voluptatibus nihil, architecto debitisconsectetur repudiandae, vel, natus in doloremque provident quos? Nullasimilique tempore ratione temporibus?",
  },
];

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const diaryData = [];
  for (let i = 0; i < diaryArray.length; i++) {
    const newDataObj = {
      id: title(diaryArray[i].title),
      title: diaryArray[i].title,
      content: truncate(diaryArray[i].content),
    };
    diaryData.push(newDataObj);
    console.log(newDataObj);
  }
  res.render("home", { diaryData });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const { title, content } = req.body;
  diaryArray.push({ title, content });
  res.redirect("/");
});

app.get("/diary/:diaryId", (req, res) => {
  const { diaryId } = req.params;
  const singleDiary = diaryArray.filter((diary) => {
    return title(diary.title) === diaryId;
  });
  res.render("diary", { diary: singleDiary[0] });
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
