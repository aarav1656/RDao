// @ts-nocheck
import { useContext } from 'react';
import { ResearcherContext } from '../../../context/ResearcherContext';
import { Box, Text, Divider, Flex } from '@chakra-ui/react';

const ResearchersList = () => {
  const { researchers } = useContext(ResearcherContext);

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Researchers List
      </Text>
      <Flex flexWrap="wrap">
        {researchers.map((researcher, index) => (
          <Box
            key={index}
            w="300px"
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="gray.300"
            mb={4}
            mr={4}
          >
            <img src={researcher.profileUrl} width={300} height={300} alt="Profile Image" />
            <Text fontSize="lg" fontWeight="semibold">
              Name: {researcher.name}
            </Text>
            <Text>Wallet Address - {researcher.walletAddress}</Text>
            <Text>Institution: {researcher.institution}</Text>
            <Divider my={2} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default ResearchersList;
