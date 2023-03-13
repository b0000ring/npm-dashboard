const AWS = require('aws-sdk');
const uuid = require('uuid');
const cookie = require('cookie');

const dynamodb = new AWS.DynamoDB();
const TABLE_NAME = 'SessionTable';

export async function handler(event, context) {
  try {
    const cookies = event.headers.Cookie.split('; '); // split cookies by semicolon and space
    const cookieObj = cookies.reduce((acc, curr) => {
      const [key, value] = curr.split('=');
      acc[key] = value;
      return acc;
    }, {}); // create an object with cookie key-value pairs
    if(cookieObj.token) {
      // JOB

    } else {
      // AUTH

      const token = uuid.v4(); // generate a unique token
      const cookieOptions = { // set cookie options
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 86400 // expire after 1 day
      };
      const setCookieHeader = cookie.serialize('token', token, cookieOptions); // serialize the cookie
      const putParams = { // create parameters for DynamoDB put operation
        TableName: TABLE_NAME,
        Item: {
          'token': {S: token}
        }
      };
      await dynamodb.putItem(putParams).promise(); // save the token to DynamoDB
      return { // return response with cookie and token
        statusCode: 200,
        headers: {
          'Set-Cookie': setCookieHeader
        },
        body: JSON.stringify({token})
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Internal Server Error'})
    };
  }
};