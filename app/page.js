import ObjectDetection from "@/components/object-detection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-8">
       <h1 className="gradient font-extrabold text-3xl text-center md:text-6xl lg:text-8xl tracking-tighter md:px-6">Theif detection alarm</h1>
         <ObjectDetection/>
    </main>
  );
}
