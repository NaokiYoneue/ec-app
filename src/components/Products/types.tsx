export type ImageAreaProps = {
  setImages: React.Dispatch<React.SetStateAction<Image[]>>
  images: Image[]
}

export type Image = {
  id: string
  path: string
}

export type Size = {
  size: string
  quantity: number
}

export type ProductCardProps = {
  id: string
  images: Image[]
  name: string
  price: number
}