import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Link } from '@chakra-ui/react';
import lighthouse from '@lighthouse-web3/sdk';

// make the type of cid as string
type DecryptProps = {
    cid: string;
};
function Decrypt({ cid  } : DecryptProps) {
  const [fileURL, setFileURL] = useState('');

  const encryptionSignature = async () => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const decrypt = async () => {
    try {
      const { publicKey, signedMessage } = await encryptionSignature();
      const keyObject = await lighthouse.fetchEncryptionKey(cid, publicKey, signedMessage);
      const fileType = 'image/jpeg';
      // @ts-ignore
      const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType);
      const url = URL.createObjectURL(decrypted);
      setFileURL(url);
    } catch (error) {
      console.error('Error decrypting file:', error);
    }
  };

  return (
    <div className="Decrypt">
      <Button onClick={decrypt} colorScheme="blue" mb={4}>
        Decrypt
      </Button>
      {fileURL && (
        <Link href={fileURL} target="_blank" color="blue.500">
          View File
        </Link>
      )}
    </div>
  );
}

export default Decrypt;
