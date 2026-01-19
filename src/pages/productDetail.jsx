import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // <-- useParams для react-router
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { Card, Typography, Button, Spin } from 'antd';

const { Title, Text } = Typography;

export const ProductDetail = () => {
  const { id } = useParams(); 
  const { products, getProducts, isLoading } = useProductStore();
  const { addToCart } = useCartStore();

  const product = products.find((p) => p.id ===(id));

  useEffect(() => {
     getProducts(id);
  }, []);

  if (isLoading || !product) {
    return <Spin tip="Loading..." style={{ display: 'block', margin: '50px auto' }} />;
  }

  return (
    <div style={{ maxWidth: 800, margin: '50px auto', padding: 20 }}>
      <Card
        hoverable
        cover={
          <img
            alt={product.title}
            src={product.image || 'https://via.placeholder.com/600x400'}
            style={{ objectFit: 'cover', height: 400 }}
          />
        }
      >
        <Title level={3}>{product.title}</Title>
        <Text type="secondary">{product.categories?.title}</Text>
        <p style={{ marginTop: 10 }}>{product.description}</p>
        <Text strong style={{ display: 'block', marginBottom: 10 }}>
          Price: ${product.price}
        </Text>
        <Button type="primary" onClick={() => addToCart(product.id)}>
          Add To Cart
        </Button>
      </Card>
    </div>
  );
};
