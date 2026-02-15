import { useState, useCallback, ReactNode } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useStagingAuth } from "@/contexts/StagingAuthContext";
import { Shield, AlertCircle } from "lucide-react";

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { isAuthenticated, loginWithToken } = useStagingAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: useCallback(
      async (tokenResponse: { access_token: string }) => {
        setLoading(true);
        setError(null);
        const result = await loginWithToken(tokenResponse.access_token);
        if (!result.success) {
          setError(result.error ?? "Authentication failed.");
        }
        setLoading(false);
      },
      [loginWithToken],
    ),
    onError: useCallback(() => {
      setError("Google Sign-In failed. Please try again.");
    }, []),
    flow: "implicit",
  });

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-8">
          {/* Logo & Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img
                src="/toto%20finance.svg"
                alt="TOTO Finance Logo"
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-light tracking-tight text-gray-900">
                Staging Access
              </h1>
              <p className="text-sm text-gray-500">
                Sign in with your company Google account to continue
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Google Sign-In */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Shield className="h-3.5 w-3.5" />
              <span>Restricted to @totofinance.co accounts</span>
            </div>

            <button
              onClick={() => googleLogin()}
              disabled={loading}
              className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {loading ? "Signing in..." : "Sign in with Google"}
              </span>
            </button>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 w-full animate-fade-in">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-center text-gray-400">
              This is a protected staging environment. Only authorized team
              members with a @totofinance.co email can access this site.
            </p>
          </div>
        </div>

        {/* Bottom branding */}
        <p className="text-xs text-center text-gray-300 mt-6">
          TOTO Finance &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
