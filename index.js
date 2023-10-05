import CustomExpress from "./CustomExpress.js";

const app = new CustomExpress();

app.get("/", (req, res) => {
  res.write("this is home page");
});

app.get("/contact", (req, res) => {
  res.write("this is contact page");
});

app.get("/aboutUs", (req, res) => {
    res.write("this is about us page");
  });

// app.listen(8000, () => console.log("app is listening on 8000"));
