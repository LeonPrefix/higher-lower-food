"use client";

import { ProductCard } from "@/components/product-card";
import { Product } from "@/util/interfaces";
import axios from "axios";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<[Product | undefined, Product | undefined]>([undefined, undefined]);

  const [product1, animateProduct1] = useAnimate();
  const [product2, animateProduct2] = useAnimate();
  const [vs, animateVs] = useAnimate();

  useEffect(() => {
    axios
      .get("/api/products?amount=2")
      .then((r) => setProducts(r.data))
      .finally(() => setLoading(false));
  }, []);

  const handleVote = (more: boolean) => {
    if (!products[0] || !products[1]) return;

    const win =
      products[0].kcal100g === products[1]?.kcal100g ||
      (products[0].kcal100g > products[1].kcal100g && !more) ||
      (products[0].kcal100g < products[1].kcal100g && more);

    if (win) {
      axios.get("/api/products").then((r) => setProducts((v) => [v[1], r.data[0]]));
    } else {
      setLoading(true);
    }
  };

  if (loading) return <></>;

  return (
    <>
      <div
        className="w-full h-screen fixed"
        style={{
          background: 'url("/background.jpg")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "saturate(80%) brightness(50%)",
          zIndex: -1,
        }}
      ></div>
      <ProductCard ref={product1} product={products[0]} show={true} />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-[50%] bg-white h-[80px] w-[80px] flex justify-center items-center text-3xl font-mono tracking-widest font-extrabold m-2"
        ref={vs}
      >
        VS
      </motion.div>
      <ProductCard ref={product2} product={products[1]} handleVote={handleVote} />
    </>
  );
}
