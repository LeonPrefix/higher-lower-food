"use client";

import { Background } from "@/components/background";
import { EndScreen } from "@/components/end-screen";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/util/interfaces";
import axios from "axios";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [inBetween, setInBetween] = useState(false);
  const [score, setScore] = useState(0);
  const [endScreenOpen, setEndScreenOpen] = useState(false);
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
    setInBetween(true);

    if (win) {
      setScore(score + 1);
      axios.get("/api/products").then((r) => startChange(r.data[0]));
    } else {
      setEndScreenOpen(true);
    }
  };

  const startChange = (newProduct: Product) => {
    setTimeout(() => {
      setProducts((v) => [v[1], newProduct]);
      setInBetween(false);
    }, 500);
  };

  const restart = () => {
    setScore(0);
    setInBetween(false);
    setLoading(true);
    setEndScreenOpen(false);

    axios
      .get("/api/products?amount=2")
      .then((r) => setProducts(r.data))
      .finally(() => setLoading(false));
  };

  if (loading) return <></>;

  return (
    <>
      <Background />
      <EndScreen open={endScreenOpen} score={score} restart={restart} />
      <ProductCard ref={product1} product={products[0]} show={true} />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded-[50%] bg-white h-[80px] w-[80px] flex justify-center items-center text-3xl font-mono tracking-widest font-extrabold m-2"
        ref={vs}
      >
        VS
      </motion.div>
      <ProductCard ref={product2} product={products[1]} show={inBetween} handleVote={handleVote} />
    </>
  );
}
