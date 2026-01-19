import { Card, Row, Col, Button, Typography, Select } from "antd";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useCategoriesStore } from "../store/categoryStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const Products = () => {
  const { isLoading, products, getProducts } = useProductStore();
  const { categories, getCategories } = useCategoriesStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getProducts();
    getCategories(); 
  }, []);

  if (isLoading) return <p>Loading...</p>;

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categories?.id === selectedCategory)
    : products;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Title level={2} style={{ marginBottom: 20 }}>Products</Title>

      <Select
        placeholder="Filter by category"
        allowClear
        style={{ width: 300, marginBottom: 20 }}
        onChange={setSelectedCategory}
        options={categories.map((cat) => ({
          label: cat.title,
          value: cat.id,
        }))}
      />

      <Row gutter={[16, 16]}>
        {filteredProducts.map((prod) => (
          <Col key={prod.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              onClick={() => navigate(`/products/${prod.id}`)}
              cover={
                <img
                  alt={prod.title}
                  src={prod.image || "https://via.placeholder.com/300x200"}
                  style={{ objectFit: "cover", height: 200 }}
                />
              }
              bodyStyle={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 180,
              }}
            >
              <div>
                <Text strong>{prod.title}</Text>
                <br />
                <Text type="secondary">{prod.categories?.title}</Text>
              </div>

              <Button
                type="primary"
                block
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(prod.id);
                }}
              >
                Add To Cart
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
