import { Card,Flex, Button } from "antd"
import { useProductStore } from "../store/productStore"
import { useEffect } from "react"
import { useCartStore } from "../store/cartStore"

export const Products = () => {
    const { isLoading, products, getProducts } = useProductStore()
    const { addToCart } = useCartStore()

    useEffect(() => {
        getProducts()
    },[])
    console.log(products);

    if(isLoading) return <p>Loading...</p>
  return (
    <>
        <h2>
            Products
        </h2>
        <Flex wrap gap="middle">
            {products.map((prod) => (
                <Card title={prod.title}
                    key={prod.id}
                >
                    <p>
                        {prod.description}
                    </p>
                    <p> <b>Category:</b>{prod.categories?.title}</p>
                    <Button variant="primary" onClick={() => addToCart(prod.id)}>Add To Cart</Button>
                </Card>
            ))}
        </Flex>
    </>
  )
}
