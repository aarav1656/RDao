import { useContext, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { ResearcherContext } from '../../../context/ResearcherContext';
import { useForm } from 'react-hook-form';

const ResearcherForm = () => {
  const { register, handleSubmit } = useForm();
  const { addResearcher } = useContext(ResearcherContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data : any) => {
    setIsSubmitting(true);

    // Perform any API calls or data processing here
    console.log(data);

    addResearcher(data);

    setIsSubmitting(false);
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="name" mb={4}>
          <FormLabel>Name</FormLabel>
          <Input {...register('name', { required: true })} type="text" />
        </FormControl>

        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" />
        </FormControl>

        <FormControl id="institution" mb={4}>
          <FormLabel>Institution</FormLabel>
          <Input {...register('institution', { required: true })} type="text" />
        </FormControl>

        <FormControl id="walletAddress" mb={4}>
          <FormLabel>Wallet Address</FormLabel>
          <Input {...register('walletAddress', { required: true })} type="text" />
        </FormControl>
      
        <FormControl id="profileUrl" mb={4}>
          <FormLabel>Profile URL</FormLabel>
          <Input {...register('profileUrl')} type="text" />
        </FormControl>

        <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ResearcherForm;
