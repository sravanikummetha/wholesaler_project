const API_BASE_URL = "http://localhost:5000/wholesaler";

export const getAllWholesalers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error("Failed to fetch wholesalers");

    const result = await response.json();
    return result.data || []; // Ensure it returns an array
  } catch (error) {
    console.error("Error fetching wholesalers:", error);
    return [];
  }
};
