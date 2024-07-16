import { Product } from "@/util/interfaces";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  const data = fs.readFileSync(process.cwd() + "/src/util/products.json", "utf-8");
  const parsedData = JSON.parse(data) as Product[];

  return NextResponse.json(parsedData[Math.floor(Math.random() * parsedData.length)]);
}
