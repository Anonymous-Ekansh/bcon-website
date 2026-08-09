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
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import Layout from "~/components/layout";
import PageHero from "~/components/page-hero";

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
      <PageHero eyebrow="Welcome Back" heading="Login" />
      <Flex
        maxW="1200px"
        mx="auto"
        pb={24}
        px={6}
        alignItems="center"
        justifyContent="center"
        direction="column"
        position="relative"
        zIndex={10}
      >
        <Flex
          w="100%"
          maxW="900px"
          direction={{ base: "column", md: "row" }}
          bg="rgba(255, 255, 255, 0.05)"
          backdropFilter="blur(15px)"
          border="1px solid rgba(255,255,255,0.1)"
          borderRadius="20px"
          boxShadow="0px 20px 40px rgba(0, 0, 0, 0.4)"
          overflow="hidden"
        >
          {/* Left Side: Login Form */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            flex="1"
            p={{ base: 8, md: 12 }}
          >
            <Text
              fontFamily="'Tan Vivre Libre', 'Playfair Display', serif"
              fontSize="28px"
              color="#FFFFFF"
              mb={6}
              textAlign="center"
            >
              Sign In
            </Text>
            <VStack spacing={5} w="100%">
              <FormControl id="email" isRequired>
                <FormLabel fontFamily="'Proxima Nova', 'Inter', sans-serif" color="rgba(255,255,255,0.8)" fontWeight="300" fontSize="14px">Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="john.doe@company.com"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  color="#FFFFFF"
                  fontFamily="'Proxima Nova', 'Inter', sans-serif"
                  _placeholder={{ color: "rgba(255,255,255,0.3)" }}
                  _focus={{ borderColor: "#CFAF89", boxShadow: "0 0 0 1px #CFAF89" }}
                  _hover={{ borderColor: "rgba(255,255,255,0.2)" }}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel fontFamily="'Proxima Nova', 'Inter', sans-serif" color="rgba(255,255,255,0.8)" fontWeight="300" fontSize="14px">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="•••••••••"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1px solid rgba(255, 255, 255, 0.1)"
                  color="#FFFFFF"
                  fontFamily="'Proxima Nova', 'Inter', sans-serif"
                  _placeholder={{ color: "rgba(255,255,255,0.3)" }}
                  _focus={{ borderColor: "#CFAF89", boxShadow: "0 0 0 1px #CFAF89" }}
                  _hover={{ borderColor: "rgba(255,255,255,0.2)" }}
                />
              </FormControl>

              {error && (
                <Text color="red.400" textAlign="center" fontSize="14px" fontFamily="'Proxima Nova', 'Inter', sans-serif">
                  {error}
                </Text>
              )}

              <Button
                type="submit"
                fontFamily="'Proxima Nova', 'Inter', sans-serif"
                bg="#CFAF89"
                color="#000000"
                _hover={{ bg: "#b89a74", transform: "translateY(-2px)", boxShadow: "0px 4px 15px rgba(207, 175, 137, 0.3)" }}
                transition="all 0.3s"
                borderRadius="full"
                fontWeight="500"
                width="100%"
                mt={4}
              >
                Log In
              </Button>

              <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" color="rgba(255,255,255,0.6)" fontSize="14px" mt={2}>
                Don&apos;t have an account?{" "}
                <ChakraLink as={Link} href="/register" color="#CFAF89" fontWeight="500" _hover={{ textDecoration: "none", color: "#b89a74" }}>
                  Register
                </ChakraLink>
              </Text>
            </VStack>
          </Box>

          {/* Divider for Desktop / Mobile */}
          <Flex align="center" justify="center" display={{ base: "none", md: "flex" }}>
            <Divider orientation="vertical" borderColor="rgba(255,255,255,0.1)" h="70%" />
          </Flex>
          <Flex align="center" justify="center" display={{ base: "flex", md: "none" }} w="100%" px={8}>
            <Divider orientation="horizontal" borderColor="rgba(255,255,255,0.1)" />
          </Flex>

          {/* Right Side: SNU Student Login */}
          <Flex
            flex="1"
            alignItems="center"
            justifyContent="center"
            p={{ base: 8, md: 12 }}
            bg="rgba(0, 0, 0, 0.2)"
          >
            <VStack spacing={6} w="100%" textAlign="center">
              <Text fontFamily="'Tan Vivre Libre', 'Playfair Display', serif" fontSize="24px" color="#FFFFFF">
                SNU Student?
              </Text>
              <Text fontFamily="'Proxima Nova', 'Inter', sans-serif" fontSize="16px" color="rgba(255,255,255,0.7)" fontWeight="300" lineHeight="1.6">
                Sign in with your SNU Email for exclusive access, special offers, and discounts!
              </Text>
              <Button
                fontFamily="'Proxima Nova', 'Inter', sans-serif"
                bg="transparent"
                color="#CFAF89"
                border="1px solid #CFAF89"
                _hover={{ bg: "rgba(207, 175, 137, 0.15)", transform: "translateY(-2px)", boxShadow: "0px 4px 15px rgba(207, 175, 137, 0.2)" }}
                transition="all 0.3s"
                borderRadius="full"
                fontWeight="500"
                size="lg"
                width="100%"
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
