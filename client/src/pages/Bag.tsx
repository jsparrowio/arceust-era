import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { QUERY_ME } from "../utils/queries"

// Function found at https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

export const Bag = () => {
    const { loading, data, refetch } = useQuery(QUERY_ME);
    const [reloading, setReloading] = useState(true);
    const [inventory, setInventory] = useState([{ name: "loading...", sprite: "undefined" }]);
    useEffect(() => {
        setReloading(true);
        !loading ? setInventory(data?.Me?.inventory) : setInventory([{ name: "loading...", sprite: "undefined" }]);
        refetch();
    }, [data]);
    useEffect(() => {
        console.log(inventory);
        setInventory(data?.Me?.inventory);
        setReloading(false);
    }, [inventory]);

    return (
        <>
            <div>
                <h1>Bag</h1>
            </div>
            <div className='party-container'>
                {!loading && inventory && reloading === false &&
                    <div className='bagdiv'>
                        {inventory.map((item: any) =>
                            <div className='inventory-item' key={item.name}>
                                <img src={item.sprite} />
                                <p>{toTitleCase(item.name.replace("-", " "))}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        )}
                    </div>
                }
            </div>
        </>
    )

}
