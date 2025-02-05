const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const filePath = path.resolve(__dirname, '../news.json'); // Adjust the path to point to the correct location

    if (event.httpMethod === 'GET') {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            return {
                statusCode: 200,
                body: data,
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: 'Error reading news file',
            };
        }
    } else if (event.httpMethod === 'POST') {
        try {
            const newData = JSON.parse(event.body);
            fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
            return {
                statusCode: 200,
                body: 'News updated successfully',
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: 'Error writing news file',
            };
        }
    } else {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }
};