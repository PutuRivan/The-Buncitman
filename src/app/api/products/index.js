import prisma from "@/lib/prisma";

export const getAllProducts = async ({ category }) => {
    return await prisma.product.findMany({
        where: {
            category: category
        }
    });
}

export const getProductDetails = async ( name ) => {
    console.log(name)
    return await prisma.product.findFirst({
        where: {
            name: name
        }
    });
}