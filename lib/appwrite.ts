import { Account, Avatars, Client, Databases, ID, ImageGravity, Models, Query, Storage, UploadProgress } from 'react-native-appwrite';

const { endpoint, platform, project, databaseId, userCollectionId, videoCollection, storageId, likedVideoCollection } = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    project: '66b1ba59003205ab3377',
    databaseId: '66b1c3d70011c0a61e4a',
    userCollectionId: '66b1c3f800266cbcb37d',
    videoCollection: '66b1c410003888554f7c',
    likedVideoCollection: '66b5fcc20001043be8f0',
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
const storage = new Storage(client);


export const signUp = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(name);

        await signIn({ email, password });

        const newUser = database.createDocument(databaseId, userCollectionId, ID.unique(), {
            accountId: newAccount?.$id,
            email,
            username: name,
            avatar: avatarUrl
        })

        return newUser
    } catch (error: any) {
        throw error
    }
}

export const signIn = async ({ email, password }: { email: string, password: string }) => {
    try {
        // await account.deleteSessions();
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error: any) {
        throw error
    }
}

export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        if (!user) throw Error;

        const currentUser: any = await database.listDocuments(databaseId, userCollectionId, [Query.equal('accountId', user?.$id)]);

        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error: any) {
        throw error
    }
}

export const createPost = async (form) => {
    try {
        const [thumbnailUlr, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image', form.title),
            uploadFile(form.video, 'video', form.title)
        ]);

        const newPost = await database.createDocument(databaseId, videoCollection, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailUlr,
            video: videoUrl,
            prompt: form.prompt,
            users: form.userId
        })

        return newPost;
    } catch (error) {
        throw error
    }
}

export const uploadFile = async (file, type, name) => {
    if (!file) return;

    const { mimytype, ...rest } = file;
    const asset = { name, type: rest.mimeType, size: rest.fileSize, uri: rest.uri };

    try {
        const uploadedFile = await storage.createFile(storageId, ID.unique(), asset, [], (progress: UploadProgress) => console.log(progress.progress));

        const fileUrl = await getFilePreview(uploadedFile?.$id, type);

        return fileUrl
    } catch (error) {
        throw error
    }
}

export const getFilePreview = async (fieldId, type) => {
    let fileUrl;

    try {
        fileUrl = type === 'video' ? storage.getFileView(storageId, fieldId) : storage.getFilePreview(storageId, fieldId,
            2000, 2000, ImageGravity.Top, 100);

        return fileUrl
    } catch (error) {
        throw error
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await database.listDocuments(databaseId, videoCollection, [Query.orderDesc('$createdAt')]);

        return posts.documents
    } catch (error: any) {
        throw error
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await database.listDocuments(databaseId, videoCollection, [Query.orderDesc('$createdAt'), Query.limit(7)]);
        return posts.documents
    } catch (error: any) {
        throw error
    }
}

export const searchPost = async (query: string) => {
    try {
        const posts = await database.listDocuments(databaseId, videoCollection, [Query.search('title', query)]);

        return posts.documents;
    } catch (error: any) {
        throw error
    }
}

export const getPostsByUserId = async (userId: string) => {
    try {
        const userPosts = await database.listDocuments(databaseId, videoCollection, [Query.equal('users', userId)]);
        return userPosts.documents
    } catch (error: any) {
        throw error
    }
};

export const addToFavorite = async (userId: string, videoId: string) => {
    try {
        const liked = await database.createDocument(databaseId, likedVideoCollection, ID.unique(), {
            userId,
            videoId
        });

        return liked;
    } catch (error) {
        throw error;
    }
}

export const deletePost = async (documentId: string, videoId: string, thumbnailId: string) => {
    try {
        const deleted = await Promise.all([
            database.deleteDocument(databaseId, videoCollection, documentId),
            storage.deleteFile(storageId, videoId),
            storage.deleteFile(storageId, thumbnailId)
        ])

        return deleted;
    } catch (error) {
        throw error;
    }
}

export const logOut = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error: any) {
        throw error
    }
}
