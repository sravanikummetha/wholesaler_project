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



// Update Wholesaler (PATCH Request)
export const updateWholesaler = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) throw new Error("Failed to update wholesaler");
      return await response.json();
    } catch (error) {
      console.error("Error updating wholesaler:", error);
      return null;
    }
  };
  
  // Delete Wholesaler (Optional)
  export const deleteWholesaler = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/wholesaler/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) throw new Error("Failed to delete wholesaler");
      return true;
    } catch (error) {
      console.error("Error deleting wholesaler:", error);
      return false;
    }
  };
   