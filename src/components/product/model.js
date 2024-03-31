const fetchProducts = async (category) => {
  try {
    const response = await fetch(
      `https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=${category}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default fetchProducts;
