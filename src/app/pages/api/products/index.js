'use server';
import prisma from "@/lib/prisma";

async function getProducts() {
    return await prisma.product.findMany();
}

module.exports = { getProducts };
