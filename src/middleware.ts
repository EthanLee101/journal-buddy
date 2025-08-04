import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware() {
    // Optional: Add custom middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/entries/:path*", 
    "/api/entries/:path*",
    "/api/mood/:path*"
  ]
}