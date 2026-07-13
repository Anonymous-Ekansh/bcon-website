"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import Layout from "~/components/layout"; // Ensure the correct path

const LoginPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { email, password } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
      toast({
        title: "Login Failed",
        description: result.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/dashboard");
    }
  };

  const handleSNULogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <Layout title="Login">
      <Flex
        maxW="1200px"
        mx="auto"
        py={12}
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Text fontSize="4xl" fontWeight="bold" textAlign="center" mb={8}>
          Login
        </Text>

        {/* Use responsive direction for Flex */}
        <Flex
          w="100%"
          maxW="1000px"
          justifyContent="space-between"
          direction={{ base: "column", md: "row" }} // Vertical on mobile, horizontal on larger screens
          gap={{ base: 8, md: 0 }} // Add spacing between sections on mobile
        >
          {/* Left Side: Login Form */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={8}
          >
            <VStack spacing={6} w="100%" maxW="400px">
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="john.doe@company.com"
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="•••••••••"
                />
              </FormControl>

              <Button
                type="submit"
                bg="#ED8936"
                color="white"
                _hover={{ bg: "#DE6B1F" }}
                width="100%"
              >
                Log In
              </Button>

              {error && (
                <Text color="red.500" textAlign="center">
                  {error}
                </Text>
              )}

              <Text>
                Don&apos;t have an account?{" "}
                <ChakraLink as={Link} href="/register" color="orange.400">
                  Register
                </ChakraLink>
              </Text>
            </VStack>
          </Box>

          {/* Right Side: SNU Student Login */}
          <Flex
            flex="1"
            alignItems="center"
            justifyContent="center"
            px={8}
            mt={{ base: 6, md: 0 }} // Add margin on top for mobile
          >
            <VStack spacing={6} w="100%" maxW="400px" textAlign="center">
              <Text fontSize="xl" fontWeight="bold" color="white">
                SNU Student?{" "}
                <Text as="span" color="orange.400">
                  Sign in with your SNU Email
                </Text>{" "}
                for special offers and discounts!
              </Text>
              <Button
                bg="#ED8936"
                color="white"
                _hover={{ bg: "#DE6B1F" }}
                size="lg"
                onClick={handleSNULogin}
              >
                Sign in with SNU
              </Button>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default LoginPage;
