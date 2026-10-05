import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const SignOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        // Await the signOut promise and handle the result properly
        const result = await signOut({ redirect: false });
        if (result?.url) {
          router.push(result.url).catch(console.error); // Redirect to the URL returned by signOut if present
        } else {
          router.push("/").catch(console.error); // Default to home page if no URL is provided
        }
      } catch (error) {
        console.error("Error during sign out:", error);
      }
    };

    // Invoke the async function and properly handle the promise
    void performSignOut();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Signing Out...</h1>
        <p>Please wait while we sign you out.</p>
      </div>
    </div>
  );
};

export default SignOutPage;
