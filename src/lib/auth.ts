export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export function getUserRole(): "user" | "admin" | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
}