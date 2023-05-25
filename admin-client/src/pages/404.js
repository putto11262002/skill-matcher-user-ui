import Loader from "@/components/common/Loader"
import { useRouter } from "next/router"
import { useEffect } from "react";

const NotFoundPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/')
    }, [])
    return <Loader/>
}
export default NotFoundPage