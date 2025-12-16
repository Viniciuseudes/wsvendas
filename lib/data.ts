export interface Motorcycle {
  id: string
  brand: string
  model: string
  year: string
  km: number
  price: number
  imageUrls: string[]
  transmission: string
  fuel: string
  color: string
  plateEnd: string
  observations: string
  sold: boolean // NOVO: Status de venda
  displayOrder: number // NOVO: Ordem de exibição
}

// Dados mockados (apenas para evitar erros de build se o banco estiver vazio)
export const motorcycles: Motorcycle[] = [
  {
    id: "1",
    brand: "Honda",
    model: "XRE 300",
    year: "2022/2022",
    km: 15000,
    price: 28990,
    imageUrls: ["/honda-xre-300-motorcycle-red.jpg"],
    transmission: "Manual",
    fuel: "Flex",
    color: "Vermelha",
    plateEnd: "5",
    observations: "Sem sinistro.",
    sold: false,
    displayOrder: 1
  },
]