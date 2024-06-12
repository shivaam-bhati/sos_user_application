import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { S3 } from 'aws-sdk';

const S3_BUCKET_NAME = 'sos-alert';
const S3_ACCESS_KEY = 'AKIA4S2IOCKDC2XVG6EC';
const S3_SECRET_KEY = 'yuc/1LMLsyhGrHvlIt3+8svxvZx6zI7YhqHiKBZW';
const S3_REGION = 'your-s3-bucket-region';

const s3 = new S3({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  region: 'ap-south-1',
});

const Test = () => {
  const [imageURI, setImageURI] = useState(null);

  const pickImage = () => {
    ImagePicker.showImagePicker({}, (response:any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        setImageURI(uri);
        uploadImageToS3(uri);
      }
    });
  };

  const uploadImageToS3 = async (uri:any) => {
    const file = {
      uri,
      name: uri.split('/').pop(),
      type: 'image/jpeg', // Change the mime type if necessary
    };

    const options = {
      keyPrefix: 'uploads/',
      bucket: S3_BUCKET_NAME,
      region: S3_REGION,
      accessKey: S3_ACCESS_KEY,
      secretKey: S3_SECRET_KEY,
      successActionStatus: 201,
    };

    try {
      const response = await s3.putObject({
        ...options,
        body: file,
      }).promise();

      console.log('Image uploaded successfully!', response);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  return (
    <View>
      {imageURI && <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick an image" onPress={pickImage} />
    </View>
  );
};

export default Test;
