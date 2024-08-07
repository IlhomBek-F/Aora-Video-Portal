import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

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

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);


export const signUp = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(name);

        await signIn({ email, password });

        const newUser = database.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username: name,
            avatar: avatarUrl
        })

        return newUser
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const signIn = async ({ email, password }: { email: string, password: string }) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        throw new Error();

    }
}
