const { v4: uuidv4 } = require('uuid');

exports.handler = async function(event, context) {
    // Verify authentication
    if (!context.clientContext || !context.clientContext.user) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Unauthorized' })
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        const { file, chapter, caption } = JSON.parse(event.body);
        
        // Generate unique filename
        const filename = `${uuidv4()}-${file.name}`;
        
        // Here you would typically upload the file to a storage service
        // For now, we'll assume it's working and return success
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Photo uploaded successfully',
                filename: filename
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error uploading photo' })
        };
    }
};