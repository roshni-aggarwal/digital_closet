import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

// conmponents
import Header from "./Components/Header";
import Table from "./Components/Table";

axios.defaults.baseURL = "https://fakestoreapi.com";
axios.defaults.params = {};

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sliderValue, setSliderValue] = useState(20);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  let all = "All";

  // get all products data
  useEffect(() => {
    const requestProductsData = async () => {
      const getProductsData = await axios.get("/products");

      setProducts(getProductsData.data);
      setFilteredProducts(getProductsData.data);
    };

    requestProductsData();
  }, []);

  // sort the products
  useEffect(() => {
    const findSortedData = async () => {
      const getSortedData = await axios.get(`/products?sort=${sortOrder}`);

      setFilteredProducts(getSortedData.data);
    };

    findSortedData();
  }, [sortOrder]);

  // limit the display of products
  useEffect(() => {
    const requestLimitDisplay = async () => {
      const getLimitedData = await axios.get(`/products?limit=${sliderValue}`);

      setFilteredProducts(getLimitedData.data);
    };

    requestLimitDisplay();
  }, [sliderValue]);

  // get all categories
  useEffect(() => {
    const requestCategories = async () => {
      const getCategories = await axios.get("/products/categories");

      setCategories(getCategories.data);
    };

    requestCategories();
  });

  // get products based on category
  useEffect(() => {
    const requestProductsOnCategory = async () => {
      const getProductsOnCatgeory = await axios.get(
        `/products/category/${selectedCategory}`
      );

      setFilteredProducts(getProductsOnCatgeory.data);
    };

    requestProductsOnCategory();
  }, [selectedCategory]);

  const handleSearch = (searchText) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const toggleSortOrder = (sortOrderValue) => {
    setSortOrder(sortOrderValue);
  };

  const setSlider = (value) => {
    setSliderValue(value);
  };

  const setCategoryOnFilter = (category) => {
    if (category === all) {
      setFilteredProducts(products);
    } else {
      setSelectedCategory(category);
    }
  };

  // update product data
  const handleUpdate = async (updatedProduct) => {
    try {
      const response = await axios.put(
        `products/${updatedProduct.id}`,
        updatedProduct
      );
      const updatedProductData = response.data;

      const updatedProducts = products.map((product) =>
        product.id === updatedProductData.id ? updatedProductData : product
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);

      alert("Product is updated succesfully");
      console.log("Product updated:", response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // delete product
  const handleDelete = async (productId) => {
    try {
      const deletedProduct = await axios.delete(`products/${productId}`);

      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);

      alert("Product is deleted successfully");
      console.log("Product deleted: ", deletedProduct.data);
      
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className=" px-4 md:px-24 bg-gray-50">
      <Header
        onSearch={handleSearch}
        onToggleSort={toggleSortOrder}
        onSliderChange={setSlider}
        categories={categories}
        category={selectedCategory}
        onCategoryFilter={setCategoryOnFilter}
      />
      <Table
        productsData={filteredProducts}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
