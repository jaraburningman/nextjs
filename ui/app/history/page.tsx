'use client'
import {useContext, useEffect} from "react";
import {HeaderContext} from "@/app/context/header-context";

export default function Home() {
  const {setTitle, setDescription} = useContext(HeaderContext);

  // // Trigger on component mount
  useEffect(() => {
    setTitle('History');
    setDescription('Should return some db data');
  }, []);

  return (
    <>
      History
    </>
  );
}