// @ts-nocheck
import ResearchersList from '../components/researcher/ResearcherList';
import ResearchersModal from '../components/researcher/ResearcherModal';
import { Button } from '@chakra-ui/react';
import { useState , useEffect } from 'react';
import rrabi from '../abis/RRDao.json';
import { ethers } from 'ethers';
import { Box , Text } from '@chakra-ui/react';
import { RiFilePaper2Line } from 'react-icons/ri';
import Link from 'next/link';

const ResearchersPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const daocontractAddress = '0x8d72887163f8bD8A65649Ef4af37dcc21500e5A1';
  // @ts-ignore
  const provider = typeof window !== 'undefined' ? new ethers.providers.Web3Provider(window.ethereum) : null;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const contract = new ethers.Contract(daocontractAddress, rrabi, provider);
        const paperCount = await contract.paperCount();
  
        const papers = [];
  
        for (let i = 1; i <= paperCount; i++) {
          const paper = await contract.papers(i);
          papers.push(paper);
        }
  
        setPapers(papers);
      } catch (error) {
        console.error('Error fetching papers:', error);
      }
    };
  
    if (provider) {
      fetchPapers();
    }
  }, [provider]);
  console.log(papers);
  return (
    <div>
      <h1 className='text-center text-indigo-400 font-semibold text-2xl'>RR DataDao Marketplace</h1>
      <h1>ResearchPapers</h1>
        {papers.map((paper) => (
          <Box
            key={paper.title}
            borderWidth={1}
            borderRadius='md'
            p={4}
            boxShadow='sm'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >
            <RiFilePaper2Line size={24} />
            <Text fontSize='lg' fontWeight='bold' mt={2} mb={1}>
              {paper.title}
            </Text>
            <Text fontSize='sm' color='gray.500'>
              Uploaded by: {paper.author}
            </Text>
            <Text fontSize='sm' color='gray.500'>
              Funding: {JSON.stringify(paper.funding)}
            </Text>
            <div className='flex justify-center items-center'>
              <Link href={'/funding'}>
                <Button mx={4} mt={4} p={4}>
                  Fund
                </Button>
              </Link>
              <Button mx={4} mt={4}>
                View
              </Button>
            </div>
          </Box>
      ))}
      <br />
      <ResearchersList />
      <ResearchersModal isOpen={isModalOpen} onClose={closeModal} />
      <Button onClick={openModal}>Add Researcher</Button>
    </div>
  );
};

export default ResearchersPage;
