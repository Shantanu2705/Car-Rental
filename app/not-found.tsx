import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background flex-col gap-4">
      <h2 className="text-3xl font-bold">404 - Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link href="/" className="text-primary hover:underline">
        Return Home
      </Link>
    </div>
  )
}
