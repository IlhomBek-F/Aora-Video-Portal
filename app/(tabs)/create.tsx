import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { createPost } from "@/lib/appwrite";
import { useUser } from "@/lib/context/userContext";

function Create() {
    const [uploading, setUploading] = useState(false);
    const {user: currentUser} = useUser();

    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
    });

    const openPicker = async (type: string) => {
         const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true, 
            aspect: [4,3],
            quality: 1
        });

         if(!result.canceled) {

            if(type === 'image') {
                setForm({...form, thumbnail: result.assets[0]})
             }

            if(type === 'video') {
                setForm({...form, video: result.assets[0]})
             }
         }

       
    }

    const handlePublish = async () => {
        if(!form.prompt || !form.title || !form.thumbnail || !form.video) {
            Alert.alert('Please fill in all the fields');
            return;
        }

        setUploading(true);
        
        try {
            await createPost({...form, userId: currentUser.currentUser.$id})
            router.push('/home');
        } catch (error) {
            Alert.alert('Error', error.message)
        }finally {

            setUploading(false);
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
             <ScrollView className="px-4 mr-6">
               <Text className="text-2xl text-white font-semibold">Upload a video</Text>

               <FormField title="Video Title" value={form.title} placeholder="Give your video a catch title..."
                handleChange={(e) => setForm({...form, title: e})}
                styles="mt-10"
               />

               <View className="mt-7 space-y-2">
                  <Text className="text-base text-gray-100 font-pmedium">
                     Upload video
                  </Text>
                  <TouchableOpacity onPress={() => openPicker('video')}>
                    {form.video ? (
                         <Video 
                            source={{uri: form.video.uri}}
                            className="w-full h-64 rounded-2xl"
                            useNativeControls
                            resizeMode={ResizeMode.COVER}
                            isLooping
                         />
                    ): (
                        <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                            <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                                <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2"/>
                            </View>
                        </View>
                    )}
                  </TouchableOpacity>
               </View>

               <View className="mt-7 space-y-2 mb-3">
                  <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
               </View>

               <TouchableOpacity onPress={() => openPicker('image')}>
                    {form.thumbnail ? (
                        <Image source={{uri: form.thumbnail.uri}} resizeMode="cover" className="w-full h-64 rounded"/>
                    ): (
                        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2
                         border-black-200 flex-row space-x-2">
                                <Image source={icons.upload} resizeMode="contain" className="w-5 h-5"/>
                                <Text className="text-sm text-gray-100 font-medium">Choose a file</Text>
                        </View>
                    )}
                  </TouchableOpacity>

                  <FormField title="AI prompt" value={form.prompt} placeholder="The prompt you used to create this video"
                    handleChange={(e) => setForm({...form, prompt: e})}
                   styles="mt-7"
               />

               <Button 
                   title="Publish"
                   handlePress={handlePublish}
                   containerStyle="mt-7"
                   loading={uploading}
               />
             </ScrollView>
        </SafeAreaView>
    )
}

export default Create