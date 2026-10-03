const API_BASE_URL = "http://localhost:8000/api";

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "API request failed");
    }
    return await res.json();
  } catch (error: any) {
    console.warn(`API call ${endpoint} failed, falling back to client demo mode:`, error.message);
    throw error;
  }
}
