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

exports.handler = async (event) => {
  const record = event.Records[0]
  if (record.eventName === "INSERT") {
    const image = record.dynamodb.NewImage

    try {
      await ddb
        .update({
          TableName: process.env.API_NOTETAKERAMPLIFY_COUNTSTABLE_NAME,
          Key: {
            id: image.owner.S,
          },
          UpdateExpression: "set #count = #count + :num",
          ExpressionAttributeNames: {
            "#count": "count",
          },
          ExpressionAttributeValues: {
            ":num": 1,
          },
        })
        .promise()
    } catch (err) {
      await ddb
        .put({
          TableName: process.env.API_NOTETAKERAMPLIFY_COUNTSTABLE_NAME,
          Item: {
            id: image.owner.S,
            owner: image.owner.S,
            count: 1,
          },
        })
        .promise()
    }
  }
  return Promise.resolve("Successfully processed DynamoDB record")
}
