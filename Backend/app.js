const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

app.use(cors());
app.use(express.json());
const mongoUrl = process.env.MONGODB_URI || "mongodb+srv://vamsikeshwaran:admin@cluster0.mvz2ydo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.error("Error connecting to database:", e);
    });

app.post('/register', async (req, res) => {
    const {
        identifier, userType, entityName, addressName, password,
        entitytype, aadhar, authperson, desig,
        connum, email, agreeTerms, image
    } = req.body;

    const collectionName = `user_${authperson}`;
    try {
        const UserCollection = mongoose.connection.collection(collectionName);

        const oldUser = await UserCollection.findOne({ email: email });
        if (oldUser) {
            return res.send({ data: "User already exists" });
        }

        await UserCollection.insertOne({
            identifier, userType, entityName, addressName, password,
            entitytype, aadhar, authperson, desig,
            connum, email, agreeTerms, image
        });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.get('/userdetails/:collectionName', async (req, res) => {
    const { collectionName } = req.params;

    try {
        const UserCollection = mongoose.connection.collection(collectionName);
        const users = await UserCollection.find({}).toArray();

        if (!users || users.length === 0) {
            return res.status(404).send({ status: "error", data: "No users found" });
        }

        res.send({ status: "ok", data: users });
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.get('/productdetails/:collectionName', async (req, res) => {
    const { collectionName } = req.params;

    try {
        const UserCollection = mongoose.connection.collection(collectionName);
        const users = await UserCollection.find({ identifier: "Product" }).toArray();

        if (!users || users.length === 0) {
            return res.status(404).send({ status: "error", data: "No users found" });
        }

        res.send({ status: "ok", data: users });
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.post('/createapplication', async (req, res) => {
    const {
        identifier, applicantName, dateOfFiling, projectDescription, creditAmount, applicationStatus, approvalDate, issuingAuthority, remarks
    } = req.body;

    const collectionName = `user_${applicantName}`;

    try {
        const UserCollection = mongoose.connection.collection(collectionName);

        await UserCollection.insertOne({
            identifier, applicantName, dateOfFiling, projectDescription, creditAmount, applicationStatus, approvalDate, issuingAuthority, remarks
        });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.get('/userproductdetails', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.collections();

        let allProducts = [];

        for (let collection of collections) {
            const products = await collection.find({ identifier: "Product" }).toArray();
            allProducts = allProducts.concat(products);
        }

        if (allProducts.length === 0) {
            return res.status(404).send({ status: "error", data: "No products found" });
        }

        res.send({ status: "ok", data: allProducts });
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.put('/updateApplicationStatus', async (req, res) => {
    const { objectId, applicantName, applicationStatus, approvalDate, issuingAuthority, remarks } = req.body;

    if (!objectId || !applicantName || !applicationStatus) {
        return res.status(400).send({ status: "error", data: "Object ID, applicant name, and application status are required" });
    }

    const collectionName = `user_${applicantName}`;
    try {
        const UserCollection = mongoose.connection.collection(collectionName);

        const updateData = {
            applicationStatus: applicationStatus,
            approvalDate: applicationStatus === "Approved" ? approvalDate : null,
            issuingAuthority: issuingAuthority || null,
            remarks: remarks || null,
        };

        const result = await UserCollection.updateOne(
            { _id: new mongoose.Types.ObjectId(objectId) },
            { $set: updateData }
        );

        if (result.matchedCount > 0) {
            res.send({ status: "ok", data: "Application status updated successfully" });
        } else {
            res.status(404).send({ status: "error", data: "No application found for the provided object ID" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.post('/registeradmin', async (req, res) => {
    const { userId, departmentCode, password } = req.body;

    const collectionName = `admin_${userId}`;

    try {
        const AdminCollection = mongoose.connection.collection(collectionName);

        const oldAdmin = await AdminCollection.findOne({ userId: userId });
        if (oldAdmin) {
            return res.send({ data: "Admin already exists" });
        }

        await AdminCollection.insertOne({
            userId,
            departmentCode,
            password
        });

        res.send({ status: "ok", data: "Admin Created" });
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.get('/adminlogin', async (req, res) => {
    const { userId, departmentCode, password } = req.query;

    try {
        const collectionName = `admin_${userId}`;
        const AdminCollection = mongoose.connection.collection(collectionName);

        const admin = await AdminCollection.findOne({ userId });

        if (admin && admin.password === password) {
            res.send({ status: 'ok' });
        } else {
            res.send({ status: 'error', data: 'Invalid login' });
        }
    } catch (error) {
        res.status(500).send({ status: 'error', data: error.message });
    }
});

app.post('/addpost', async (req, res) => {
    const {
        identifier, title, name, date, description, image
    } = req.body;

    const collectionName = `user_${name}`;
    try {
        const UserCollection = mongoose.connection.collection(collectionName);
        await UserCollection.insertOne({
            identifier, title, name, date, description, image
        });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.get('/blogdetails/:collectionName', async (req, res) => {
    const { collectionName } = req.params;

    try {
        const UserCollection = mongoose.connection.collection(collectionName);
        const users = await UserCollection.find({ identifier: "Blog" }).toArray();

        if (!users || users.length === 0) {
            return res.status(404).send({ status: "error", data: "No users found" });
        }

        res.send({ status: "ok", data: users });
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.get('/blogproductdetails', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.collections();

        let allProducts = [];

        for (let collection of collections) {
            const products = await collection.find({ identifier: "Blog" }).toArray();
            allProducts = allProducts.concat(products);
        }

        if (allProducts.length === 0) {
            return res.status(404).send({ status: "error", data: "No products found" });
        }

        res.send({ status: "ok", data: allProducts });
    } catch (error) {
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.listen(5001, () => {
    console.log("Server Running");
});
