import { useRouter } from "next/navigation";
import { useEffect } from "react";
export function usePolling(ms:number=6000 ,searchParam:string |null){
    const router = useRouter();
useEffect(()=>{
    const intervalId=setInterval(() => {
        console.log('interval running');
router.refresh()
    }, ms);

return()=>clearInterval(intervalId)
},[searchParam , ms])
}