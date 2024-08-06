import { Account, Client } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    project: '66b1ba59003205ab3377',
    databaseId: '66b1c3d70011c0a61e4a',
    userCollectionId: '66b1c3f800266cbcb37d',
    videoCollection: '66b1c410003888554f7c',
    storageId: '66b1c5780033e02fea03'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.project) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.;

export const account = new Account(client);
