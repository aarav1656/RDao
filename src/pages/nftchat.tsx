// @ts-nocheck
import React from 'react';
import { useAuth } from '@polybase/react';
import { Polybase } from '@polybase/client';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCollection } from '@polybase/react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import { useAccount , useEnsName , useEnsAvatar } from 'wagmi';
import eth from '../../public/assets/ethereum.gif';
import Image from 'next/image';
import moonbeam from '../../public/assets/moonbeam.gif';
import avalanche from '../../public/assets/avalanche.gif';

const db = new Polybase({
    defaultNamespace: 'pk/0x4d0a42d54b52f8ca13ebb7bc080afeda61c9790d1dab9fd5523046e4703dc5553ef262f50216f0ae3ddd80960e4dda9de7eac78e27653af50ca533063db4f503/ResearchRev',
});

const date = new Date();
const userRef = db.collection('User');
const chatRef = db.collection('Message');
let newd : any;
// const auth = new Auth();

function Chat() {

  // get the Ens name of the user
  const { address} = useAccount();
  const {data : ensdata , isError , isLoading} = useEnsName({
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    chainId: 1,
  });

  // and then get the Ens Avatar of the user
  const { data : ensavt , isError: err , isLoading: loaded } = useEnsAvatar({
    name: address,
    chainId: 1,
  })
 
  const [result, setResult] = useState(null);
  const [stateuserId, setStateuserId] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const { data, error, loading } = useCollection(userRef);

  const { auth, state } = useAuth();
  const [formInput, setFormInput] = useState({
    name: '',
    toAddress: '',
    message: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchResult = async () => {
      await setStateuserId(address + '');
      const fkhsd = await chatRef.get();
      newd = fkhsd.data;
      console.log(newd ,"newd");
    };
    fetchResult();
  }, []);

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    const address = await getAddress();
    console.log(address, 'address');
    const result = await chatRef.create([
      date + '',
      state.userId,
      address,
      formInput.message,
    ]);
    console.log(data,"data");
    alert('message sent');
    router.push('/nftchat');
  };

  async function getAddress() {
    console.log(selectedName, 'selectedName');
    const address = await userRef.record(selectedName).get();
    const id = (await address.data.name) + '';
    console.log(id ,"yuo");
    return id;
  }
  const handleClick = (name) => {
    setSelectedName(name);
    console.log(name);
  };

  const handleChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
    console.log(formInput.message);
  };

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
    <div style={{ marginTop: '50px' }}>
      <div className="w-full h-32"></div>

      <div
        className="container mx-auto"
        style={{
          marginTop: '-128px',
        }}>
        <div className="py-6 h-screen">
          <div
            style={{
              borderColor: 'black',
              borderRadius: '20px',
            }}
            className="flex border rounded shadow-lg h-full">
            <div className="w-1/3 border flex flex-col">
              <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
              <div className='flex gap-5'>
                <Image src={eth} alt="Ethereum" width={100} height={200} />
                <Image src={moonbeam} alt="Moonbeam" width={100} height={200} />
                <Image src={avalanche} alt="Avalanche" width={100} height={200} />
              </div>
                <div className="flex">
                  <div></div>
                  <div className="ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24">
                      <path
                        fill="#263238"
                        fill-opacity=".6"
                        d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="py-2 px-2 bg-grey-lightest">
                <input
                  type="text"
                  className="w-full px-2 py-2 text-sm"
                  placeholder="Search or start new chat"
                />
              </div>

              <div className="bg-grey-lighter flex-1 overflow-auto">
                {data?.data.map((data) => {
                  return (
                    <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                      <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                        <div className="flex items-bottom justify-between"> 
                          <Button
                            key={data.data.id}
                            onClick={() => handleClick(data.data.id)}
                            className="text-grey-darkest">
                              Chat with {" "}
                            {data.data.id}
                          </Button>
                          <p className="text-xs">
                            {date.getHours()} : {date.getMinutes()}
                          </p>
                        </div>
                        <p className="text-grey-dark mt-1 text-sm">
                          Hey there Please review my paper!
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-2/3 border flex flex-col">
              <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="text-grey-darkest">{selectedName}</p>
                    <p className="text-grey-darker text-xs mt-1">Online</p>
                  </div>
                </div>

                <h2 className='text-xl text-blue-500'>Get Peer Review</h2>

                <div className="flex">
                  {ensavt && (
                    <div className="ml-4">
                      <img
                        src={ensavt}
                        alt="avatar"
                        width={80}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  {!ensavt &&  <img src="https://cdnb.artstation.com/p/assets/images/images/047/600/399/large/surya-nair-mx-scientist-1.jpg?1647977730" alt="researcher" width={80} /> }
                </div>
              </div>

              <div
                className="flex-1 overflow-auto"
                style={{ backgroundColor: '#DAD3CC' }}>
                <div className="py-2 px-3">
                  <div className="flex justify-center mb-2">
                    <div
                      className="rounded py-2 px-4"
                      style={{ backgroundColor: '#DDECF2' }}>
                      <p className="text-sm uppercase">TUE, MAY 23 2023</p>
                    </div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div
                      className="rounded py-2 px-4"
                      style={{ backgroundColor: '#FCF4CB' }}>
                      <p className="text-xs">
                        Wallet to Wallet Encrypted NFT Interactions.
                      </p>
                    </div>
                  </div>
                  {newd?.map((data, i) => {
                    return (
                      <>
                        {stateuserId && stateuserId == data.data.fromAddress ? (
                          <div className="flex justify-end mb-2">
                            <div
                              className="rounded py-2 px-3"
                              style={{ backgroundColor: '#E2F7CB' }}
                              key={i}>
                              <p className="text-sm mt-1">{data.data.messages}</p>
                              <p className="text-right text-xs text-grey-dark mt-1"></p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex mb-2">
                            <div
                              className="rounded py-2 px-3"
                              style={{ backgroundColor: '#F2F2F2' }}>
                              <p className="text-sm text-teal"></p>
                              <p className="text-sm mt-1">{data.data.messages}</p>
                              <p className="text-right text-xs text-grey-dark mt-1"></p>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
              <form>
                <div className="bg-grey-lighter px-4 py-4 flex items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24">
                      <path
                        opacity=".45"
                        fill="#263238"
                        d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path>
                    </svg>
                  </div>
                  <div className="flex-1 mx-4">
                    <input
                      className="w-full border rounded px-2 py-2"
                      name="message"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inline-flex">
                    {/* <Link to="/IFrame">Join Audio Room</Link> */}
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Chat;
