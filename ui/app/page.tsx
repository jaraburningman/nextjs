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
  // Trigger on component mount
  // const {setTitle, setDescription} = useContext(HeaderContext);
  // useEffect(() => {
  //   setTitle('Facial Expressions');
  //   setDescription('OpenVINO MobileNet-SSD pretrained object detection model + face 68 landmark, recognition and expression models.');
  // }, []);

  return (
    <FacialExpressions></FacialExpressions>
  );
}
