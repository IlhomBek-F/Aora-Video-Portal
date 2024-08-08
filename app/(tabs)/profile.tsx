import Button from "@/components/Button";
import { logOut } from "@/lib/appwrite";
import { useUser } from "@/lib/context/userContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Profile() {
    const da = useUser();

    const handlelogOut = async () => {
        console.log(da)
        // logOut(cu)
    }

    return (
      <Button title="Log out" handlePress={handlelogOut} containerStyle="mt-7" />
    )
}

export default Profile;