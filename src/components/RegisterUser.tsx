// @ts-nocheck
import React, { useState } from 'react';
import { Polybase } from '@polybase/client';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useAuth } from '@polybase/react';

function RegisterUser() {
  const { auth , state , loading }  = useAuth();
  const [formInput, setFormInput] = useState({ name: '', address: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const random = String(Math.floor(Math.random()));
  const db = new Polybase({
    defaultNamespace: 'pk/0x4d0a42d54b52f8ca13ebb7bc080afeda61c9790d1dab9fd5523046e4703dc5553ef262f50216f0ae3ddd80960e4dda9de7eac78e27653af50ca533063db4f503/ResearchRev',
  });
  
  // After user signs up, set the signer function
  db.signer(async (data) => {
    return {
      h: 'eth-personal-sign',
      sig: await auth.ethPersonalSign(data)
    }
  })
  
  const user = db.collection("User");

  const createUser = async (e) => {
    e.preventDefault();
    console.log("ia m here",formInput,"formInput");
    const registered = await db.collection('User').create([random,formInput.name]);
    console.log(registered,"regh");
    alert('User Created');
    handleModalToggle();
  };


  const handleChange = (event : any) => {
    event.preventDefault();
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setFormInput({ name: '', address: '' });
  };

  return (
    <>
      <Button onClick={handleModalToggle}>User Signup</Button>
      <Button onClick={() => auth.signIn()}>Sign In</Button>
      <Button onClick={() => auth.signOut()}>Sign Out</Button>
      <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign up to our platform</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={createUser}>
              <div>
                <label htmlFor="address">Your Wallet Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={handleChange}
                  value={formInput.address}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={formInput.name}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Sign up to Register
                </Button>
                <Button onClick={handleModalToggle}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RegisterUser;