'use client'
import FacialExpressions from "@/app/facail-expressions/facial-expressions";
// import * as tf from "@tensorflow/tfjs";

interface ExpressionData {
  expressionName: string;
  expressionValue: number;
}

interface Face {
  title: string;
  data: ExpressionData[];
}

declare global {
  interface Window {
    faceapi: any;
  }
}

export default function Home() {
  return (
    <FacialExpressions></FacialExpressions>
  );
}
