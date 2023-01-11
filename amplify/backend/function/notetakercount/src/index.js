/* Amplify Params - DO NOT EDIT
	API_NOTETAKERAMPLIFY_COUNTSTABLE_ARN
	API_NOTETAKERAMPLIFY_COUNTSTABLE_NAME
	API_NOTETAKERAMPLIFY_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDB } = require("aws-sdk")

const ddb = new DynamoDB.DocumentClient()

async function incrementCount(owner, count) {
  try {
    await ddb
      .update({
        TableName: process.env.API_NOTETAKERAMPLIFY_COUNTSTABLE_NAME,
        Key: {
          id: owner,
        },
        UpdateExpression: "set #count = #count + :num",
        ExpressionAttributeNames: {
          "#count": "count",
        },
        ExpressionAttributeValues: {
          ":num": count,
        },
      })
      .promise()
  } catch (err) {
    await ddb
      .put({
        TableName: process.env.API_NOTETAKERAMPLIFY_COUNTSTABLE_NAME,
        Item: {
          id: owner,
          owner: owner,
          count: 1,
        },
      })
      .promise()
  }
}

exports.handler = async (event) => {
  const record = event.Records[0]
  const image = record.dynamodb

  if (record.eventName === "REMOVE") {
    await incrementCount(image.OldImage.owner.S, -1)
  } else if (record.eventName === "INSERT") {
    await incrementCount(image.NewImage.owner.S, 1)
  }
  return Promise.resolve("Successfully processed DynamoDB record")
}
