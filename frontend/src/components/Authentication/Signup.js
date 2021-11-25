import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';

//test

const Signup = (props) => {
  const [show, setShow] = useState(false);
  const [pic, setPic] = useState();
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {};

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
          <FormLabel>User Name</FormLabel>
          <Input
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
            placeholder="Enter Your User Name"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
              placeholder="Enter Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              value={formState.password}
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="pic">
          <FormLabel>Upload Profile Pic</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
        <Button
        type="submit"
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        >
          Signup
        </Button>
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

export default Signup;
