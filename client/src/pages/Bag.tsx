import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { QUERY_ME } from "../utils/queries"

export const Bag = () => {
    const {loading, data, refetch} = useQuery(QUERY_ME)
        useEffect(() => {
          refetch()
        }, [data] )
    return (
        <>
            <div className='menudiv'>
                <h1>Bag</h1>
            </div>
            <div className='biomediv'>
                <div className='bagdiv'>
                    {!loading && data?.Me?.inventory?.map((item: any) =>
                        <div className='item'>
                            <img src={item.sprite} />
                            <p>{item.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}
