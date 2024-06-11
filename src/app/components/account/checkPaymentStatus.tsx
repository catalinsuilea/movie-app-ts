export const checkPaymentStatus = async (
  id: string | undefined,
  getUserInformation?: any
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/user/check-payment-status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`${response.statusText} ${response.status}`);
    }
    const data = await response.json();
    if (data) {
      getUserInformation(id);
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
  }
};
