import { Account, Avatars, Client, Databases, ID, Models, Query } from 'react-native-appwrite';

const { endpoint, platform, project, databaseId, userCollectionId, videoCollection, storageId } = {
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
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(project) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.;

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);


export const signUp = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(name);

        await signIn({ email, password });

        const newUser = database.createDocument(databaseId, userCollectionId, ID.unique(), {
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
        // await account.deleteSessions();
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getCurrentUser = async () => {
    try {
        const user = await account.get();

        if (!user) throw Error;

        const currentUser: any = await database.listDocuments(databaseId, userCollectionId, [Query.equal('accountId', user.$id)]);

        if (!currentUser) throw Error;

        return currentUser[0]
    } catch (error: any) {
        throw Error(error.message)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await database.listDocuments(databaseId, videoCollection);

        return posts.documents
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await database.listDocuments(databaseId, videoCollection, [Query.orderDesc('$createdAt'), Query.limit(7)]);
        return posts.documents
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const searchPost = async (query: string) => {
    try {
        const posts = await database.listDocuments(databaseId, videoCollection, [Query.search('title', query)]);

        return posts.documents;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const logOut = async (sessionId: string) => {
    try {
        await account.deleteSession(sessionId)
    } catch (error: any) {
        throw new Error(error.message)
    }
}
