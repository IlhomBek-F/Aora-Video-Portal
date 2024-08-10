import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useUser } from "@/lib/context/userContext";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { View , Text, SafeAreaView, ScrollView, Image, Alert} from "react-native";

function SignIn() {
  const {user, setUser} = useUser() as any;
  const [submiting, setSubmiting] = useState(false)
  const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async () => {
      if(!form.email || !form.password) {
        Alert.alert('Error', 'Please enter your email and password');
        return;
      }
      
      setSubmiting(true);

      try {
         await signIn(form);
         const currentUser = await getCurrentUser();
         setUser({isLoggedIn: true, currentUser, loading: false});

         Alert.alert('Success', 'User signed in successfully')
         router.replace('/home');
      } catch (error: any) {
        Alert.alert('Error', error.message)
      }
    }

    return (
       <SafeAreaView className="bg-primary h-full">
          <ScrollView>
            <View className="w-full justify-center  px-4 my-6">
              <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
              <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">Login in to Aora</Text>
              <FormField title="Email" value={form.email} handleChange={(email: any) => setForm({...form, email})}
                styles='mt-7'
                keyBoardType='email-address'
                placeholder="email"
                />

                 <FormField title="Password" value={form.password} handleChange={(password: any) => setForm({...form, password})}
                styles='mt-7'
                keyBoardType='visible-password'
                placeholder="password"
                />

                <Button title="Sign In" handlePress={handleSubmit} containerStyle="mt-7" loading={submiting}/>
            </View>

            <View className="justify-center  flex-row gap-2">
                <Text className="text-gray-100 font-pregular">Don't have account</Text>
                <Link href='/sign-up' className="text-secondary  font-semibold">Sign Up</Link>
            </View>
          </ScrollView>
       </SafeAreaView>
    )
}

export default SignIn