'use client'
import Image from "next/image";
import {useContext, useEffect, useRef, useState, useLayoutEffect} from "react";
import {HeaderContext} from "@/app/context/header-context";
import {AppContext} from "@/app/context/app-context";
import './facial-expressions.css'
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

export default function FacialExpressions() {
  // Trigger on component mount
  const {setTitle, setDescription} = useContext(HeaderContext);
  const {detectionIntervalRef} = useContext(AppContext);
  useEffect(() => {
    setTitle('Facial Expressions model + Next.js playground');
    setDescription('MobileNet-SSD ML/AI pretrained model + face 68 landmark, recognition and expression models.');
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [faces, setFaces] = useState<Face[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const startWebcam = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }

      // videoRef.current.addEventListener('loadeddata', play);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Load face-api script dynamically
    const script = document.createElement('script');
    script.src = './face-api.js';
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !videoRef.current || !canvasRef.current || !boxRef.current) return;

    const loadModels = async () => {
      try {
        await Promise.all([
          window.faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
          window.faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
          window.faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
          window.faceapi.nets.faceExpressionNet.loadFromUri("./models"),
        ]);
        await startWebcam();
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded || !videoRef.current || !canvasRef.current || !boxRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const box = boxRef.current;

    const handlePlay = async () => {
      // Start processing stream
      const canvas = window.faceapi.createCanvasFromMedia(video);
      canvas.getContext('2d', { willReadFrequently: true }).clearRect(0, 0, canvas.width, canvas.height);
      box.append(canvas);

      detectionIntervalRef.current = setInterval(async () => {
        const displaySize = { width: box.offsetWidth, height: box.offsetHeight };
        window.faceapi.matchDimensions(canvas, displaySize);

        const detections = await window.faceapi
          .detectAllFaces(video)
          .withFaceLandmarks()
          .withFaceDescriptors()
          .withFaceExpressions();

        const resizedDetections = window.faceapi.resizeResults(detections, displaySize);

        if (detections.length === 0) {
          setFaces([]);
        } else {
          const newFaces = resizedDetections.map((result: any) => {
            let dataArray: ExpressionData[] = [];
            let title = '';
            let titleValue = 0;

            for (const [key, value] of Object.entries(result.expressions)) {
              const k = capitalizeFirstLetter(key);
              const val = Math.round((value as number) * 100);
              dataArray.push({expressionName: k, expressionValue: val});
              if (val > titleValue) {
                titleValue = val;
                title = k;
              }
            }

            return { title, data: dataArray };
          });

          setFaces(newFaces);

          resizedDetections.forEach((result: any) => {
            const faceLandmarksConfig = new window.faceapi.draw.DrawFaceLandmarksOptions({
              drawPoints: true,
              pointSize: 2,
              pointColor: 'white',
              drawLines: true,
              lineColor: 'white',
              lineWidth: 1
            });

            new window.faceapi.draw.DrawFaceLandmarks(result.landmarks, faceLandmarksConfig).draw(canvas);
          });
        }
      }, 40);

      return () => clearInterval(detectionIntervalRef.current);
    };

    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('play', handlePlay);
    };
  }, [isLoaded]);

  const stopDetectingStream = () => {
    // Turn camera off
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    // Stop processing stream
    clearInterval(detectionIntervalRef.current);
  }

  // Destroy hook
  useEffect(() => {
    // tf.setBackend('webgl')
    // console.log(tf.getBackend ());

    return () => {
      stopDetectingStream();
    };
  }, []);


  return (
    <div className="ex-app-container">
      <div className="ex-container">
        {!modelsLoaded ? (
          <div className="ex-box">
            Loading models
          </div>
        ) : faces.length === 0 ? (
          <div className="ex-box">
            Detecting faces ...
          </div>
        ) : (
          <>
            {faces.map((face, i) => (
              <div className="ex-box" key={i}>
                <table className="ex-box-data">
                  <tbody>
                  {face.data.map((item, j) => (
                    <tr key={j}>
                      <td>
                        <span style={item.expressionName === face.title ? {fontWeight: 'bold', color: '#c01f9c'} : {}}>
                          {`${item.expressionName} ${item.expressionValue}%`}
                        </span>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            ))}
            {faces.length === 1 && (
              <div className="ex-box ex-ghost">
                <span className="ex-box-person">#2</span>
              </div>
            )}
          </>
        )}
      </div>
      <div id="ex-video" ref={boxRef}>
        <video ref={videoRef} width="100%" autoPlay />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}
