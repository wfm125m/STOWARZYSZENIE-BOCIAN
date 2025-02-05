const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
        try {
            const data = fs.readFileSync(path.resolve(__dirname, 'news.json'), 'utf-8');
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
            fs.writeFileSync(path.resolve(__dirname, 'news.json'), JSON.stringify(newData, null, 2));
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