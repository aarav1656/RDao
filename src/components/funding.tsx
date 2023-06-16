import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';
import useAxellar from '../components/axellar/useAxellar';

const DistributionForm = () => {
  const [destinationAddresses, setDestinationAddresses] = useState('');
  const [amount,setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedSourceChain, setSelectedSourceChain] = useState('');
  const [selectedDestinationChain, setSelectedDestinationChain] = useState('');
  const {execute} = useAxellar();
  const handleSubmit = async(event : any) => {
    event.preventDefault();

    // Perform any actions with the form data
    console.log({
      destinationAddresses,
      amount,
      selectedAsset,
      selectedSourceChain,
      selectedDestinationChain,
    });

    try {
      await execute({
        amount,
        receiver: destinationAddresses,
        symbol: selectedAsset,
      });
      // Success message or any additional logic
      console.log('Execution successful');
    } catch (error) {
      // Handle error
      console.error('Execution error:', error);
    }  

    // Reset form fields
    setDestinationAddresses('');
    setAmount('');
    setSelectedAsset('');
    setSelectedSourceChain('');
    setSelectedDestinationChain('');
  };

  return (
    <Box p={4}>
        <h1 className='text-center p-4'>Fund the DeSCI Papers Cross-Chain Powered by Axellar</h1>
      <form onSubmit={handleSubmit}>
        <FormControl id="destinationAddresses" mb={4}>
          <FormLabel>Array of Destination Addresses</FormLabel>
          <Input
            value={destinationAddresses}
            onChange={(e) => setDestinationAddresses(e.target.value)}
            type="text"
            required
          />
        </FormControl>

        <FormControl id="amount" mb={4}>
          <FormLabel>Amount</FormLabel>
          <Input
            value={amount}
            onChange={(e) => setAmount((parseInt(e.target.value) * 10 ** 6).toString())}
            type="text"
            required
          />
        </FormControl>

        <FormControl id="selectedAsset" mb={4}>
          <FormLabel>Select Asset</FormLabel>
          <Select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            required
          >
            <option value="">Select an asset</option>
            <option value="aUSDC">aUSDC</option>
            <option value="wAXL">wAXL</option>
            <option value="CELO">CELO</option>
            <option value="axlWETH">axlWETH</option>
            <option value="WMATIC">WMATIC</option>
            <option value="WAVAX">WAVAX</option>
            <option value="WFTM">WFTM</option>
            <option value="WBNB">WBNB</option>
            <option value="WFIL">WFIL</option>
            <option value="WDEV">WDEV</option>
          </Select>
        </FormControl>

        <FormControl id="selectedSourceChain" mb={4}>
          <FormLabel>Select Source Chain</FormLabel>
          <Select
            value={selectedSourceChain}
            onChange={(e) => setSelectedSourceChain(e.target.value)}
            required
          >
            <option value="">Select a source chain</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
            <option value="Avalanche">Avalanche</option>
            <option value="BNB">BNB</option>
          </Select>
        </FormControl>

        <FormControl id="selectedDestinationChain" mb={4}>
          <FormLabel>Select Destination Chain</FormLabel>
          <Select
            value={selectedDestinationChain}
            onChange={(e) => setSelectedDestinationChain(e.target.value)}
            required
          >
            <option value="">Select a destination chain</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
            <option value="Avalanche">Avalanche</option>
            <option value="BNB">BNB</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default DistributionForm;

