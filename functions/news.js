const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const filePath = path.join(__dirname, 'news.json'); // Adjust the path to point to the correct location

    if (event.httpMethod === 'GET') {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            console.log('Data read successfully:', data); // Log the data read
            return {
                statusCode: 200,
                body: data,
            };
        } catch (err) {
            console.error('Error reading news file:', err); // Log the error
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error reading news file' }),
            };
        }
    } else if (event.httpMethod === 'POST') {
        try {
            const newData = JSON.parse(event.body);
            fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
            console.log('Data written successfully:', newData); // Log the data written
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'News updated successfully' }),
            };
        } catch (err) {
            console.error('Error writing news file:', err); // Log the error
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error writing news file' }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }
};