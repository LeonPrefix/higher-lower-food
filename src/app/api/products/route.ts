import { Product } from "@/util/interfaces";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const amount = parseInt(req.nextUrl.searchParams.get("amount") || "") || 1;

  const data = fs.readFileSync(process.cwd() + "/src/util/products.json", "utf-8");
  const parsedData = JSON.parse(data) as Product[];

  const products = [];
  for (let i = 0; i < amount; i++) {
    const product = parsedData[Math.floor(Math.random() * parsedData.length)];
    products.push({ ...product, kcal100g: parseInt(product.kcal100g as unknown as string) });
  }

  return NextResponse.json(products);
}
