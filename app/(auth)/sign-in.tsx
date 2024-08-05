import FormField from "@/components/FormField";
import { images } from "@/constants";
import React, { useState } from "react";
import { View , Text, SafeAreaView, ScrollView, Image} from "react-native";

function SignIn() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    return (
       <SafeAreaView className="bg-primary h-full">
          <ScrollView>
            <View className="w-full justify-center h-full px-4 my-6">
              <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
              <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">Login in to Aora</Text>
              <FormField title="Email" value={form.email} handleChange={(email: any) => setForm({...form, email})}
                styles='mt-7'
                keyBoardType='email-address'
                />

                 <FormField title="Password" value={form.email} handleChange={(password: any) => setForm({...form, password})}
                styles='mt-7'
                keyBoardType='email-address'
                />
            </View>
          </ScrollView>
       </SafeAreaView>
    )
}

export default SignIn