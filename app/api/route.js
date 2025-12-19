import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'products.json');

async function writeFile(req) {
    if (req.method === 'POST') {
        const newProduct = await req.json();

        const products = await JSON.parse(fs.readFileSync(filePath, 'utf8'));

        products.push(newProduct);

        fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');


        return NextResponse.json({ message: 'Product added successfully!' })
    }
}

async function readFile(res) {
    if (res.method === 'GET') {
        let data = fs.readFileSync(filePath, "utf8");

        data = JSON.parse(data);

        return NextResponse.json(data);
    }
}

export { writeFile as POST, readFile as GET }