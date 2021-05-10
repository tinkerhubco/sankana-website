import React from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
  Image,
  useToast,
} from '@chakra-ui/react';
import { css, Global } from '@emotion/react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

import { ENDPOINT_SUBSCRIBE } from '../constants/endpoints';
import { tryCatch } from '../utils/tryCatch';

const FormFields = {
  Email: 'email',
} as const;
const validationSchema = Yup.object({
  [FormFields.Email]: Yup.string().email().required().default(''),
});

export const Index = () => {
  const toast = useToast();
  const {
    values,
    isValid,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    isInitialValid: false,
    initialValues: validationSchema.cast(undefined),
    validationSchema,
    onSubmit: async () => {
      const [, err] = await tryCatch(() =>
        axios.post(ENDPOINT_SUBSCRIBE, values)
      );
      if (err) {
        toast({
          title: 'Something went wrong.',
          description: 'Please refresh the page and try again',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: 'Successfully subscribed to Sankana 🚀',
        description: 'Thank you for joining our adventure. Stay tuned!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      resetForm();
    },
  });

  return (
    <Box h="100%">
      <Global
        styles={css`
          html,
          body,
          #__next,
          .app {
            height: 100%;
          }
        `}
      />
      <Grid h="100%" templateColumns={['1fr', 'repeat(2, 1fr)']}>
        <GridItem>
          <Container>
            <Heading as="h1" size="4xl" mt="80px" color="#F50057">
              Sankana
            </Heading>
            <Text fontSize="3xl">Disrupting Filipino Time</Text>

            <Image display={['block', 'none']} src="/travelling.png" />

            <Stack
              border="1px solid #e2e8f0"
              borderRadius="16px"
              p="16px"
              mt="100px"
              height="150px"
              spacing={4}
              justifyContent="center"
            >
              <Text fontSize="xl">GET EARLY ACCESS</Text>
              <form onSubmit={handleSubmit}>
                <Stack direction="row">
                  <Input
                    name={FormFields.Email}
                    value={values[FormFields.Email]}
                    placeholder="your@email.com"
                    type="email"
                    onChange={handleChange}
                  />
                  <Button
                    disabled={!isValid || isSubmitting}
                    isLoading={isSubmitting}
                    type="submit"
                    background="#F50057"
                    color="white"
                  >
                    Subscribe
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Container>
        </GridItem>
        <GridItem>
          <Image display={['none', 'block']} src="/travelling.png" />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Index;
