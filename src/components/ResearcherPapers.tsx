import { Box, Text } from '@chakra-ui/react';
import React from 'react';

type ResearcherPapersProps = {
  address: string;
  status: 'all' | 'waiting' | 'approved' | 'rejected' | 'published';
};

const ResearcherPapers: React.FC<ResearcherPapersProps> = ({ address, status }) => {
  // You can fetch the papers data based on the address and status here

  return (
    <Box>
      {/* Render the papers based on the fetched data */}
      <Text>Papers will be displayed here.</Text>
    </Box>
  );
};

export default ResearcherPapers;
