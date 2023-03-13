const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1', // set your region
  endpoint: 'http://localhost:3001' // set your local DynamoDB endpoint if needed
});

const lambda = new AWS.Lambda({
  endpoint: 'http://localhost:3000' // set your local API Gateway endpoint
});

const event = {
  queryStringParameters: {
    userId: '123'
  }
}; // set your sample event data

const params = {
  FunctionName: 'MyFunction', // replace with your function name
  Payload: JSON.stringify(event)
};

lambda.invoke(params, (err, data) => {
  if (err) console.error(err);
  else console.log(data.Payload);
});