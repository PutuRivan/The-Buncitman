export async function getProductDetails(name:string) {
    const response = await fetch(`https://api.example.com/products/${name}`)
    const data = await response.json()
    return data
}