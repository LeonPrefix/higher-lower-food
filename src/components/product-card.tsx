"use client";

import { Product } from "@/util/interfaces";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";

interface ProductCardProps {
  product: Product | undefined;
  show?: boolean;
  ref: any;
  handleVote?: (more: boolean) => void;
}

export function ProductCard({ product, show, ref, handleVote }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[80%] lg:w-[30%] h-1/2 flex flex-col justify-around items-center gap-4 backdrop-blur bg-white/20 rounded shadow-md p-4"
      ref={ref}
    >
      <div className="w-[75%]">
        <AspectRatio ratio={16 / 9} className="bg-transparent">
          {product && <Image src={product?.image_url} alt="Photo by Drew Beamer" fill className="object-contain" />}
        </AspectRatio>
      </div>
      <div className="text-3xl font-semibold tracking-wide text-center text-white font-mono">{product?.name}</div>
      {show ? (
        <div className="text-2xl font-semibold text-center text-yellow-200">{product?.kcal100g} Kalorien</div>
      ) : (
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => handleVote?.(false)}>
            <TriangleDownIcon className="mr-2" /> Weniger Kalorien
          </Button>
          <Button variant="outline" onClick={() => handleVote?.(true)}>
            <TriangleUpIcon className="mr-2" /> Mehr Kalorien
          </Button>
        </div>
      )}
    </motion.div>
  );
}
