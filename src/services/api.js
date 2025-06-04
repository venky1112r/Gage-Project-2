const API_BASE =
  import.meta.env.VITE_BACKEND_VM_API_BASE_URL || "http://localhost:3000";

// Login API
export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}

// Protected API

export async function checkAuth(token) {
  const response = await fetch(`${API_BASE}/api/protected`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return response.ok;
}

// Dashboard API
export async function fetchDashboardData() {
  const response = await fetch(`${API_BASE}/api/dashboard-metrics`, {
    method: "GET",
    credentials: "include", // include cookies for auth
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load dashboard data");
  }
  return response.json();
}

// Users List API (optional example)
export async function fetchUsers() {
  const response = await fetch(`${API_BASE}/users`);
  if (!response.ok) throw new Error("Failed to load users");
  return response.json();
}

// manual inputs API
export async function fetchManualInputs() {
  const response = await fetch(`${API_BASE}/setting/manual-input`, {
    method: "GET",
    credentials: "include", // include cookies for auth
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to load manual inputs");
  return response.json();
}

// Save Manual Input API
export async function saveManualInput(data) {
  console.log("data", data);
  const response = await fetch(`${API_BASE}/setting/manual-input`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to save input");
  }

  return response.json();
}

