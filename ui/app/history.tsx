'use client'
import Image from "next/image";
import {useContext, useEffect} from "react";
import {HeaderContext} from "@/app/context/header-context";

export default function Home() {
  const {setTitle, setDescription} = useContext(HeaderContext);

  // // Trigger on component mount
  useEffect(() => {
    setTitle('History');
    setDescription('Facial Expressions history');
  }, []);

  return (
    <>
      History
    </>
  );
}