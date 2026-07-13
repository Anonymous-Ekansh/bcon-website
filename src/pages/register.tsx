"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/utils/api";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Link as ChakraLink,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { signIn } from "next-auth/react"; // Import signIn from next-auth
import Layout from "~/components/layout"; // Ensure the correct path

const RegisterPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // Add media query hook

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = data;

  const signupMutation = api.auth.signup.useMutation({
    onSuccess: async () => {
      toast({
        title: "User Registered",
        description: "You have been registered successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        toast({
          title: "Login Failed",
          description: "Unable to log you in after registration.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }

      setData({ name: "", email: "", password: "" });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registerUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast({
        title: "All fields are required",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    signupMutation.mutate({ name, email, password });
  };

  const registerWithSNUEmail = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: "/dashboard", // Redirect to dashboard upon success
      });

      if (!result?.ok) {
        toast({
          title: "SNU Registration Failed",
          description: "Could not register with SNU Email.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "Something went wrong with SNU registration.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout title="Register">
      <Flex
        maxW="1200px"
        mx="auto"
        py={12}
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Text fontSize="4xl" fontWeight="bold" textAlign="center" mb={8}>
          Register
        </Text>

        <Flex
          w="100%"
          maxW="1000px"
          justifyContent="space-between"
          flexDir={isMobile ? "column" : "row"} // Stack vertically on mobile
          gap={isMobile ? 12 : 0} // Add spacing on mobile
        >
          {/* Left Side: Register Form */}
          <Box
            as="form"
            onSubmit={registerUser}
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={8}
          >
            <VStack spacing={6} w="100%" maxW="400px">
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </FormControl>

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
                isLoading={signupMutation.status === "pending"}
              >
                Submit
              </Button>

              <Box textAlign="center">
                <Text>
                  Already have an account?{" "}
                  <ChakraLink as={Link} href="/login" color="orange.400">
                    Login
                  </ChakraLink>
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Right Side: SNU Student Registration */}
          <Flex flex="1" alignItems="center" justifyContent="center" px={8}>
            <VStack spacing={6} w="100%" maxW="400px" textAlign="center">
              <Text fontSize="xl" fontWeight="bold" color="white">
                SNU Student?{" "}
                <Text as="span" color="orange.400">
                  Register with your SNU Email
                </Text>{" "}
                for special offers and discounts!
              </Text>
              <Button
                bg="#ED8936"
                color="white"
                _hover={{ bg: "#DE6B1F" }}
                size="lg"
                onClick={registerWithSNUEmail}
              >
                Register with SNU Email
              </Button>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default RegisterPage;
