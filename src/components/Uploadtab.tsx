import React from "react";
import { useEffect } from "react";
import Upload from "./lighthouse/upload";
import { useRouter } from "next/router";
import AccessControl from "./lighthouse/acesscontrol";
import { Box } from "@chakra-ui/react";
import LensShareComponent from "./lens";


export default function Uploadtab() {
    const router = useRouter();
    const researcheradd = router.query.address?.toString() || "";

    console.log(router.query.address,"query");
    return (
        <>
            <p className="fixed flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 min-w-fit mr-4">
                Researcher Address {" "}
                <code className="font-mono font-bold">{researcheradd}</code>
            </p>
            <div>
            <Box className="flex justify-center items-center">
                <Upload />
                <AccessControl />
            </Box>
            <LensShareComponent />
        </div>
        </>
    );
}