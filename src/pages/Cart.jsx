import { List, Card, Button, Typography } from "antd";
import { useCartStore } from "../store/cartStore";
import { useEffect } from "react";

const { Title, Text } = Typography;

export const Cart = () => {
  const { cart, removeFromCart, getCart } = useCartStore();
  useEffect(() => {
    getCart()
  },[])
  console.log(cart);
  if (!cart) return <p>Cart is empty...</p>
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <Title level={2}>Cart</Title>

      <List
        dataSource={cart}
        renderItem={(item) => (
          <Card style={{ marginBottom: 10 }} key={item.product.id}>
            <Text strong>{item.product.title}</Text>
            <br />
            <Text>Price: ${item.product.price}</Text>
            <br />
            <Button danger onClick={() => removeFromCart(item.product.id)}>
              Remove
            </Button>
          </Card>
        )}
      />
    </div>
  );
};
