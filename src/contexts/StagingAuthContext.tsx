import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const ALLOWED_DOMAIN = "@totofinance.co";
const STORAGE_KEY = "staging_auth";

interface AuthUser {
  email: string;
  name: string;
  picture: string;
}

interface StagingAuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginWithToken: (accessToken: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const StagingAuthContext = createContext<StagingAuthContextValue | null>(null);

export function StagingAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // On mount, restore session from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as AuthUser & { expiresAt: number };

      // Check expiry
      if (parsed.expiresAt < Date.now()) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      // Check domain
      if (!parsed.email.toLowerCase().endsWith(ALLOWED_DOMAIN)) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      setUser({ email: parsed.email, name: parsed.name, picture: parsed.picture });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const loginWithToken = async (
    accessToken: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Fetch user info from Google using the access token
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        return { success: false, error: "Failed to fetch user info from Google." };
      }

      const info = (await res.json()) as {
        email: string;
        name: string;
        picture: string;
      };

      if (!info.email.toLowerCase().endsWith(ALLOWED_DOMAIN)) {
        return {
          success: false,
          error: `Access restricted to ${ALLOWED_DOMAIN} accounts.`,
        };
      }

      const session = {
        email: info.email,
        name: info.name,
        picture: info.picture,
        expiresAt: Date.now() + 3600 * 1000, // 1 hour
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      setUser({ email: info.email, name: info.name, picture: info.picture });
      return { success: true };
    } catch {
      return { success: false, error: "Authentication failed. Please try again." };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <StagingAuthContext.Provider
      value={{ user, isAuthenticated: !!user, loginWithToken, logout }}
    >
      {children}
    </StagingAuthContext.Provider>
  );
}

export function useStagingAuth() {
  const ctx = useContext(StagingAuthContext);
  if (!ctx) {
    throw new Error("useStagingAuth must be used within StagingAuthProvider");
  }
  return ctx;
}
