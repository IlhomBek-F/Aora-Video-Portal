import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { signUp } from "@/lib/appwrite";
import { useUser } from "@/lib/context/userContext";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, Image , Alert} from "react-native";

function SignUp() {
  const [submitting, setSubmitting] = useState(false);
  const {user, setUser} = useUser();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });


  const handleSignUp = async () => {
    if(!form.email || !form.name || !form.password) {
       Alert.alert('Error', 'Please fill in all the fields');
       return;
    }

    setSubmitting(true);

    try {
      const result = await signUp(form);
      setUser({...user, currentUser: result});

      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center px-4 my-6">
                <Image
                   source={images.logo} 
                   resizeMode='contain' 
                   className="w-[115px] h-[35px]"/>
                 <Text className="text-white text-2xl text-semibold mt-5 font-semibold">Sign Up to Aora</Text>
                 <FormField title="Username" 
                             value={form.name}
                             styles="mt-10"
                             placeholder="user name" 
                             handleChange={(name: string) => setForm({...form, name})}/>
                  <FormField title="Email" 
                             value={form.email}
                             styles="mt-7"
                             keyBoardType="email-address"
                             placeholder="email" 
                             handleChange={(email: string) => setForm({...form, email})}/>
                  <FormField title="Password"
                             placeholder="password"
                             keyBoardType="visible-password"
                             styles="mt-7"
                             value={form.password}
                             handleChange={(password) => setForm({...form, password})}
                             />
                    <Button title="Sign Up"
                            loading={submitting}
                            handlePress={handleSignUp}
                            containerStyle="mt-7"
                    />
                </View>

                <View className="justify-center flex-row gap-2">
                    <Text className="text-gray-100 font-pregular">Have an account already ?</Text>
                    <Link href="/sign-in" className="text-secondary font-semibold">Sign In</Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp