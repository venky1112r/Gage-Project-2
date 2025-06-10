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
const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
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
export async function fetchDashboardSummaryMetrics() {
  const response = await fetch(`${API_BASE}/dashboard/summary-metrics`, {
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
// Dashboard API
export async function fetchDashboardContractsCi() {
  const response = await fetch(`${API_BASE}/dashboard/contract-ci-score-level`, {
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

export async function fetchDashboardPlantsCi() {
  const response = await fetch(`${API_BASE}/dashboard/plants-ci-score-level`, {
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
export async function fetchDashboardTopBar() {
  const response = await fetch(`${API_BASE}/dashboard/topBar`, {
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

// my sourcing table
export async function fetchSourcingMysources() {
  const response = await fetch(`${API_BASE}/sourcing/sources`, {
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
export async function fetchSourcingOpportunitesMap() {
  const response = await fetch(`${API_BASE}/sourcing/opportunites-map`, {
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

// Business Rules API 
export async function fetchBusinessRules() {
  const response = await fetch(`${API_BASE}/setting/business-rules`, {
    method: "GET",
    credentials: "include", // include cookies for auth
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to load business rules");
  const data = await response.json();
  console.log("data api ", data);
  return data;
}

// Business Rules save API

export async function saveBusinessRules(data) {
  const response = await fetch(`${API_BASE}/setting/business-rules`, {
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

// Reset password request API

export async function resetPassword(data) {
  const response = await fetch(`${API_BASE}/api/reset-password-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ customerId: data }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to reset password");
  }

  return response.json();
} 

// Reset password store DB api

// Reset Password - Actual update
export async function resetPasswordStoreDB({ token, newPassword }) {
  const response = await fetch(`${API_BASE}/api/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // only if your backend expects cookies
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to reset password");
  }

  return response.json();
}