import React from "react"
import { FlatList , Text} from "react-native"

function Trending({posts}) {

    return (
         <FlatList data={posts} keyExtractor={(item) => item.$id}
         key={1}
         horizontal 
          renderItem={({item}) => {
            return <Text className="text-3xl text-white">{item.id}</Text>
          }}
         />
    )
}

export default Trending