/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/util/interfaces";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
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
      transition={{ duration: 0.3 }}
      className="w-[80%] lg:w-[30%] h-1/2 flex flex-col justify-around items-center gap-4 backdrop-blur bg-white/20 rounded shadow-md p-4"
      ref={ref}
    >
      <div className="w-[75%] relative">
        <AspectRatio ratio={16 / 9} className="flex justify-center relative">
          {product && (
            <img src={product?.image_url} alt="Fehler beim Laden des Bildes" className="object-fill h-full " />
          )}
        </AspectRatio>
      </div>
      <div className={cn("text-3xl font-bold tracking-wider text-center text-white")}>
        {product?.name.toUpperCase()}
      </div>
      {show ? (
        <div className="text-4xl font-bold text-center text-white">
          {product?.kcal100g} <span className="font-light text-2xl">kcal / 100g</span>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => handleVote?.(false)}>
            <TriangleDownIcon className="mr-2" /> Niedriger
          </Button>
          <Button variant="outline" onClick={() => handleVote?.(true)}>
            <TriangleUpIcon className="mr-2" /> Höher
          </Button>
        </div>
      )}
    </motion.div>
  );
}
