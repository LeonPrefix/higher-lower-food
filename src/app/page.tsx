"use client";

import { Background } from "@/components/background";
import { EndScreen } from "@/components/end-screen";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/util/interfaces";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [inBetween, setInBetween] = useState<"win" | "loss" | undefined>(undefined);
  const [score, setScore] = useState(0);
  const [endScreenOpen, setEndScreenOpen] = useState(false);
  const [products, setProducts] = useState<[Product | undefined, Product | undefined]>([undefined, undefined]);

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
    setInBetween(win ? "win" : "loss");

    if (win) {
      setScore(score + 1);
      axios.get("/api/products").then((r) => startChange(r.data[0]));
      versusAnimation("#4ADE80");
    } else {
      versusAnimation("#F87171");
      setTimeout(() => {
        setEndScreenOpen(true);
        resetAnimation();
      }, 1000);
    }
  };

  const startChange = (newProduct: Product) => {
    setTimeout(() => {
      setProducts((v) => [v[1], newProduct]);
      setInBetween(undefined);
      resetAnimation();
    }, 500);
  };

  const versusAnimation = (backgroundColor: string) => {
    animateVs(vs.current, { scale: 1.1, backgroundColor }, { duration: 0.2, type: "spring", stiffness: 100 });
  };

  const resetAnimation = () => {
    animateVs(vs.current, { scale: 1, backgroundColor: "white" }, { duration: 0.1, type: "spring", stiffness: 100 });
  };

  const restart = () => {
    setScore(0);
    setInBetween(undefined);
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
      <ProductCard product={products[0]} show={true} />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded-[50%] bg-white h-[80px] w-[80px] flex justify-center items-center text-3xl font-mono tracking-widest font-extrabold m-2"
        ref={vs}
      >
        {inBetween === "win" ? (
          <CheckIcon width={40} height={40} />
        ) : inBetween === "loss" ? (
          <Cross1Icon width={40} height={40} />
        ) : (
          "VS"
        )}
      </motion.div>
      <ProductCard product={products[1]} show={!!inBetween} handleVote={handleVote} />
    </>
  );
}
