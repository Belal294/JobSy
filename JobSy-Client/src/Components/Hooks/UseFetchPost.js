
import { useState, useEffect } from "react";
import apiClient from "../FetchingApi/api-client";


const useFetchProduct = (currentPage, priceRange, selectedCategory, searchQuery, sortOrder) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setErrorMessage("");

      const queryParams = new URLSearchParams({
        price__gte: priceRange[0],
        price__lte: priceRange[1],
        page: currentPage,
        search: searchQuery,
        ordering: sortOrder,
      });

      if (selectedCategory) {
        queryParams.append("category", selectedCategory); 
      }

      try {
        const response = await apiClient.get(`/posts/?${queryParams}`);
        const data = response.data;

        if (data.results.length === 0) {
          setErrorMessage("No products found for the selected filters.");
        }

        setProducts(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        setErrorMessage("Error fetching products.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, priceRange, selectedCategory, searchQuery, sortOrder]);

  return { products, loading, totalPages, errorMessage };
};

export default useFetchProduct;
