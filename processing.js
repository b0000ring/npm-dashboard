exports.handler = async (event, context) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Your code here

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success'
      })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error'
      })
    };
  }
};