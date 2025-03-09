"use client"

import Webcam from "react-webcam";
import { load as cocoSSDLoad } from '@tensorflow-models/coco-ssd'
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import renderPredictions from "@/utils/render-predictions";

const ObjectDetection = () => {
    let detectInterval;
    const [loading, setLoading] = useState(true);
    const webcamRef = useRef();
    const canvasRef = useRef();
    const runcoco = async () => {
        setLoading(true);
        const net = await cocoSSDLoad();
        setLoading(false);
        detectInterval = setInterval(() => {
            runObjectDetection(net)
        }, 1000);
    }
    async function runObjectDetection(net) {
        if (
            canvasRef.current &&
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ) {
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            // find detected objects
            const detectedObjects = await net.detect(
                webcamRef.current.video,
                undefined,
                0.6
            );
            console.log(detectedObjects);
            const context=canvasRef.current.getContext("2d");
            renderPredictions(detectedObjects,context)
        }
    }
    useEffect(() => {
        runcoco();
    }, [])
    return (
        <div className="mt-8">
            {loading ? <div>loading</div> :
                <div className="relative flex justify-center gradient items-center p-1.5 rounded-md">
                    <Webcam ref={webcamRef} className="rounded-md w-full lg:h-[720px]" muted />
                    <canvas ref={canvasRef} className="absolute top-0 left-0 z-9999999 rounded-md w-full lg:h-[720px]" />
                </div>
            }

        </div>
    )
}

export default ObjectDetection;