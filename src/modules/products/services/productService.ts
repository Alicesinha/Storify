import { httpClient } from "@shared/services/httpClient"


export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await httpClient.get<Product[]>('/products')
  return response.data
}

const fetchProductById = async (id: number): Promise<Product> => {
  const response = await httpClient.get<Product>(`/products/${id}`)
  return response.data
}

export const productService = {
  fetchProducts,
  fetchProductById,
}