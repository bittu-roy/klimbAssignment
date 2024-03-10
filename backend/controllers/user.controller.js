const User = require('../models/user.model.js');
const csv = require('csvtojson');
const async = require('async');

const importUser = async (req, res) => {
    try {
        const rows = await csv().fromFile(req.file.path);

        // Create an array to store unique rows
        const uniqueRows = [];

        // Loop through each row
        await async.eachSeries(rows, async (row) => {
            try {
                // Check if the current row has a duplicate name in the database
                const existingUser = await User.findOne({ "name": row["Name of the Candidate"] });

                if (!existingUser) {
                    uniqueRows.push(row);
                }
            } catch (error) {
                console.error(`Error processing candidate: ${row["Name of the Candidate"]}`, error);
                throw error; // Throw error to exit the loop
            }
        });

        // Remove duplicates based on "Name of the Candidate" field
        const filteredRows = [];
        for (const row of uniqueRows) {
            let isDuplicate = false;
            for (const filteredRow of filteredRows) {
                if (row["Name of the Candidate"] === filteredRow["Name of the Candidate"]) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                filteredRows.push(row);
            }
        }

        // Loop through filteredRows and add each row to the database
        for (const row of filteredRows) {
            try {
                const user = new User({
                    name: row["Name of the Candidate"],
                    mobile: row["Mobile No."],
                    email: row["Email"],
                    dob: row["Date of Birth"],
                    workExp: row["Work Experience"],
                    resumeTitle: row["Resume Title"],
                    currentLocation: row["Current Location"],
                    postalAddress: row["Postal Address"],
                    currentEmployer: row["Current Employer"],
                    currentDesignation: row["Current Designation"],
                    // Add other fields from Excel here
                });
                await user.save();
                console.log(`Added candidate: ${row["Name of the Candidate"]}`);
            } catch (error) {
                console.error(`Error processing candidate: ${row["Name of the Candidate"]}`, error);
            }
            
        }

        res.send({ status: 200, success: true, msg: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ status: 400, success: false, msg: error.message });
    }
}

module.exports = {
    importUser
}
