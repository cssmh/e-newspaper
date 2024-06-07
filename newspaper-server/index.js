const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(
  "sk_test_51OdCcTKaNbqbkdEJNxn4MurcIaccE63SrYF2zoha0cROMRPSfajo7j8fAsVVkSIbES5oNCh1hahtd3lLaOA3wapH00DvLPhBQt"
);

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

// mongodb config
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gwyyl9m.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Database and collection
    const articleCollection = client.db("newspaper").collection("articles");
    const userCollection = client.db("newspaper").collection("users");
    const publisherCollection = client.db("newspaper").collection("publishers");

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      console.log("I need a new jwt", user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // save user in db
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };
      const isExist = await userCollection.findOne(query);
      console.log("User found?----->", isExist);
      if (isExist) return res.send(isExist);
      const result = await userCollection.updateOne(
        query,
        {
          $set: { ...user, createAt: Date.now() },
        },
        options
      );
      res.send(result);
    });

    // update user
    app.put("/user/:id", async (req, res) => {
      const userData = req.body;
      console.log(req.params.id);
      const filter = { _id: new ObjectId(req.params.id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: userData,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    app.put("/userPremium/:email", async (req, res) => {
      const { time } = req.body;
      const { expiryDate } = await userCollection.findOne({
        email: req.params.email,
      });
      if (time > expiryDate) {
        const filter = { email: req.params.email };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            isPremium: false,
          },
        };
        const result = await userCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        res.send(result);
      }
    });

    // get user data and role
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      let user = await userCollection.findOne({ email });
      if (Date.now() > user.premiumTaken) {
        const filter = { email: user.email };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            premiumTaken: null,
            isPremium: false,
          },
        };
        const result = await userCollection.updateOne(
          filter,
          updateDoc,
          options
        );
      }
      user = await userCollection.findOne({ email });
      res.send(user);
    });

    // get all users
    app.get("/users", async (req, res) => {
      let sort = {
        createAt: "desc",
      };
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skip = (page - 1) * limit;
      const cursor = userCollection.find().skip(skip).limit(limit).sort(sort);
      const result = await cursor.toArray();

      //  count data
      const total = await userCollection.countDocuments();
      res.send({
        total,
        result,
      });
    });

    // count user:
    app.get("/count-user", async (req, res) => {
      const totalUser = await userCollection.countDocuments({ role: "user" });
      const normalUser = await userCollection.countDocuments({
        role: "user",
        isPremium: false,
      });
      const premiumUser = totalUser - normalUser;
      res.send({ totalUser, normalUser, premiumUser });
    });

    // get all publishers:
    app.get("/publishers", async (req, res) => {
      const result = await publisherCollection.find().toArray();
      res.send(result);
    });

    // add publisher
    app.post("/publishers", async (req, res) => {
      const publisher = req.body;
      const publisherData = { ...publisher, createAt: Date.now() };
      const result = await publisherCollection.insertOne(publisherData);
      res.send(result);
    });

    // add article
    app.post("/articles", async (req, res) => {
      const article = req.body;
      const articleData = { ...article, createAt: Date.now() };
      const result = await articleCollection.insertOne(articleData);
      res.send(result);
    });

    // all articles:
    // app.get("/articles", async (req, res) => {
    //   let query = {};
    //   const page = parseInt(req.query.page);
    //   const limit = parseInt(req.query.limit);
    //   let status = req.query.status;
    //   let isPremium = req.query.isPremium;
    //   let searchTerm = req.query.searchTerm;
    //   let publisher = req.query.publisher;
    //   let tags = req.query.tags;
    //   const email = req.query.email;
    //   // query.isPremium = isPremium;
    //   if (status === "null") {
    //     status = "";
    //   }
    //   if (status) {
    //     query.status = status;
    //   }

    //   if (publisher === "All") {
    //     publisher = "";
    //   }
    //   if (publisher !== 'All') {
    //     query.publisher = publisher;
    //   }
    //   if (tags) {
    //     const tagsArray = req.query.tags.split(",");
    //     query.tags = { $all: [...tagsArray] };
    //   }
    //   if (searchTerm) {
    //     query.name = { $regex: new RegExp(searchTerm, "i") };
    //   }
    //   if (email) {
    //     query.email = email;
    //   }

    //   const skip = (page - 1) * limit;
    //   const result = await articleCollection
    //     .find(query)
    //     .sort({ createAt: -1 })
    //     .skip(skip)
    //     .limit(limit)
    //     .toArray();
    //   const total = await articleCollection.countDocuments(query);
    //   res.send({
    //     total,
    //     result,
    //   });
    // });

    // all article:
    app.get("/articles", async (req, res) => {
      let query = {};
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skip = (page - 1) * limit;
      let email = req.query.email;
      let status = req.query.status;
      let tags = req.query.tags;
      let searchTerm = req.query.searchTerm;
      let publisher = req.query.publisher;
      let isPremium = req.query.isPremium;
      if (email) {
        query.email = email;
      }
      if (status) {
        query.status = status;
      }
      if (tags) {
        const tagsArray = req.query.tags.split(",");
        query.tags = { $all: [...tagsArray] };
      }

      if (searchTerm) {
        query.name = { $regex: new RegExp(searchTerm, "i") };
      }

      if (publisher === "All") {
        publisher = "";
      }
      if (publisher) {
        query.publisher = publisher;
      }
      if (isPremium) {
        query.isPremium = isPremium;
      }

      const result = await articleCollection
        .find(query)
        .sort({ createAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      const total = await articleCollection.countDocuments(query);
      res.send({
        total,
        result,
      });
    });

    app.get("/article/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result1 = await articleCollection.findOne(filter);
      const result2 = await articleCollection.updateOne(filter, {
        $set: {
          viewCount: result1.viewCount + 1,
        },
      });
      const result = await articleCollection.findOne(filter);
      res.send(result);
    });

    app.get("/updatearticle/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await articleCollection.findOne(filter);
      res.send(result);
    });

    app.get("/article", async (req, res) => {
      const result = await articleCollection
        .find({ status: "approved" })
        .sort({ viewCount: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    // update article
    app.put("/article/:id", async (req, res) => {
      const articleData = req.body;
      const filter = { _id: new ObjectId(req.params.id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: articleData,
      };
      const result = await articleCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // delete article
    app.delete("/article/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await articleCollection.deleteOne(filter);
      res.send(result);
    });

    // create payment intent
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      if (!price || amount < 1) return;
      const { client_secret } = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: client_secret });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// mongo code end

app.get("/", (req, res) => {
  res.send("RUNNING NEWS");
});

app.listen(port, () => {
  console.log(`BREAKING NEWS ON PORT ${port}`);
});
