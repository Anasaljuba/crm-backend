const express = require("express");
const { ErrorReporting } = require("@google-cloud/error-reporting");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { authenticate, authorize } = require("./middleware/auth");
const userRoutes = require("./routes/userRoutes");
const customColumnRoutes = require("./routes/customColumnRoutes");
const clientRoutes = require("./routes/clients");
const ticketRoutes = require("./routes/tickets");
const announcementRoutes = require("./routes/announcements");
const schoolRoutes = require("./routes/schools");
const knowledgeBaseRoutes = require("./routes/knowledgeBase");
const CustomColumn = require("./models/customColumnSchema");
const upload = require("./middleware/multer");
const excelRoutes = require("./routes/excelRoutes");
const seasonRoutes = require("./routes/seasonRoutes");
const messageRoutes = require("./routes/messageRoutes");
const taskRoutes = require("./routes/taskRoutes");
const translationRoutes = require("./routes/translationRoutes");
const resizeRoutes = require("./routes/resizeRouter");
const bodyParser = require("body-parser"); // Import body-parser

dotenv.config();

const app = express();
app.use(bodyParser.json()); // Use body-parser middleware

// Instantiate the ErrorReporting object
const errors = new ErrorReporting({
  projectId: "crm-backend-388313", // replace with your project id
  keyFilename: "./keyfile.json", // replace with the path to your service account key file
  reportMode: "always", // Always report errors
  logLevel: 2, // or any other value between 0 and 5, depending on your desired logging level
  serviceContext: {
    service: "crm-backend", // replace with your service name
    version: "crm-backend-1", // replace with your service version
  },
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log("User routes:");
app.use("/api/users", userRoutes);
console.log("Custom Column routes:");
app.use("/api/custom-columns", customColumnRoutes);
console.log("Client routes:");
app.use("/api/clients", clientRoutes);
console.log("Ticket routes:");
app.use("/api/tickets", authenticate, ticketRoutes);
console.log("Announcement routes:");
app.use("/api/announcements", authenticate, announcementRoutes);
console.log("School routes:");
app.use("/api/schools", authenticate, schoolRoutes);
console.log("Knowledge Base routes:");
app.use("/api/knowledge-base", authenticate, knowledgeBaseRoutes);
console.log("Edit History routes:");
const editHistoryRouter = require("./routes/editHistory");
app.use("/api/edit-history", editHistoryRouter);
const categoriesRouter = require("./routes/categories");
app.use("/api/categories", categoriesRouter);
// Routes
app.use("/api/tasks", taskRoutes);
app.use("/seasons", seasonRoutes);
app.use("/messages", messageRoutes);
app.use("/excel", excelRoutes);
app.use("/translation", translationRoutes);
app.use("/api/resize", resizeRoutes);

const PORT = process.env.PORT || 3001;

app.use("/uploads", express.static("uploads"));
app.post("/api/upload", upload.single("image"), async (req, res, next) => {
  try {
    res.send(req.file.path);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file");
    next(error); // Pass the error to the error handling middleware
  }
});
app.get("/", (req, res) => {
  res.send("Hello from App Engine!");
});
app.use(errors.express);
const errorHandler = require("./utils/errorHandler")(errors);
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
