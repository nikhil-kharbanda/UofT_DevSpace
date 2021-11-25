import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import Auth from '../../utils/auth'
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { Link } from 'react-router-dom'

const Login = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleClick = () => setShow(!show);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      username: '',
      password: '',
    });

  };

  return (
    <VStack spacing="5px" color="black">
      {data ? (
              <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
            ) : (
              <form onSubmit={submitHandler}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    value={formState.username}
                    placeholder="Enter Your Name"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      value={formState.password}
                      type={show ? "text" : "password"}
                      placeholder="Enter Your Password"
                      onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  colorScheme="blue"
                  width="100%"
                  style={{ marginTop: 15 }}
                  type="submit"
                >
                  Login
                </Button>
                {/* <Button
                  variant="solid"
                  colorScheme="gray"
                  width="100%"
                  onClick={() => {
                    setName("Anon");
                    setPassword("123456789");
                  }}
                >
                  Get Anon User Credentials
                </Button> */}
                </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
    </VStack>
  );
};

export default Login;
