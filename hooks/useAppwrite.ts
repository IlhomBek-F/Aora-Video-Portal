import { useEffect, useState } from "react";
import { Alert } from "react-native";


function useAppwrite(fn) {
    const [data, setData] = useState({ data: [], loading: false })

    const fetchData = async () => {
        setData({ ...data, loading: true });

        try {
            const resp = await fn();
            setData({ data: resp, loading: false })
        } catch (error: any) {
            Alert.alert('Error', error.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => fetchData()

    return { data: data.data, loading: data.loading, refetch }
}

export default useAppwrite;