import AWS from "aws-sdk"

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const s3 = new AWS.S3()

export const uploadImageToS3 = async (buffer: Buffer, key: string) => {
  try {
    if (!process.env.AWS_S3_BUCKET_NAME) {
      throw new Error('AWS_S3_BUCKET_NAME is not set in the environment variables');
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: 'image/jpeg', // Or use a more specific MIME type based on the image format
    };

    console.log("Prepare for upload to S3")

    await s3.upload(params).promise();

    console.log("Upload complete")

    const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`
    console.log("Image uploaded successfully:", publicUrl)
    return publicUrl
  } catch (error) {
    console.error("Error uploading image to S3:", error)
    throw new Error("Error uploading image to S3")
  }
};

export const uploadJSONToS3 = async (json: string, key: string) => {
  try {
    if (!process.env.AWS_S3_BUCKET_NAME) {
      throw new Error('AWS_S3_BUCKET_NAME is not set in the environment variables');
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: json,
      ContentType: 'application/json',
    };

    console.log("Prepare for upload to S3")

    await s3.upload(params).promise();

    console.log("Upload complete")

    const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`
    console.log("JSON uploaded successfully:", publicUrl)
    return publicUrl
  } catch (error) {
    console.error("Error uploading json to S3:", error)
    throw new Error("Error uploading json to S3")
  }
};

export const transferImageToS3 = async (
  imageUrl: string,
  key: string
): Promise<string> => {

  if (!process.env.AWS_S3_BUCKET_NAME) {
    throw new Error('S3_BUCKET_NAME is not set in the environment variables');
  }

  try {
    // Download the image from the URL
    console.log("Downloading image from URL:", imageUrl)
    const response = await fetch(imageUrl)
    console.log("Image downloaded successfully")
    const arrayBuffer = await response.arrayBuffer()

    // Prepare the parameters for uploading to S3
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType:
        response.headers.get("content-type") || "application/octet-stream",
      ContentLength: parseInt(
        response.headers.get("content-length") || "0",
        10
      ),
    }

    console.log("Prepare for upload to S3")

    // Upload the image to the S3 bucket
    await s3.upload(params).promise()

    console.log("Upload complete")

    // Construct the public URL for the image
    const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`
    console.log("Image uploaded successfully:", publicUrl)
    return publicUrl
  } catch (error) {
    console.error("Error uploading image to S3:", error)
    throw new Error("Error uploading image to S3")
  }
}