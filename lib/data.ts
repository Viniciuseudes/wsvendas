export interface Motorcycle {
  id: string
  brand: string
  model: string
  year: string
  km: number
  price: number
  imageUrl: string
  transmission: string
  fuel: string
  color: string
  plateEnd: string
  observations: string
}

export const motorcycles: Motorcycle[] = [
  {
    id: "1",
    brand: "Honda",
    model: "XRE 300",
    year: "2022/2022",
    km: 15000,
    price: 28990,
    imageUrl: "/honda-xre-300-motorcycle-red.jpg",
    transmission: "Manual",
    fuel: "Flex",
    color: "Vermelha",
    plateEnd: "5",
    observations: "Sem sinistro, sem leilão. Único dono, revisões em dia na concessionária.",
  },
  {
    id: "2",
    brand: "Yamaha",
    model: "MT-03",
    year: "2023/2023",
    km: 8500,
    price: 32500,
    imageUrl: "/yamaha-mt-03-motorcycle-blue-sport.jpg",
    transmission: "Manual",
    fuel: "Gasolina",
    color: "Azul",
    plateEnd: "7",
    observations: "Sem sinistro, sem leilão. Moto impecável, baixa quilometragem.",
  },
  {
    id: "3",
    brand: "Honda",
    model: "CB 500F",
    year: "2021/2021",
    km: 22000,
    price: 35990,
    imageUrl: "/honda-cb-500f-motorcycle-black.jpg",
    transmission: "Manual",
    fuel: "Gasolina",
    color: "Preta",
    plateEnd: "2",
    observations: "Sem sinistro, sem leilão. Documentação em dia, pneus novos.",
  },
  {
    id: "4",
    brand: "Kawasaki",
    model: "Z400",
    year: "2022/2022",
    km: 12000,
    price: 34500,
    imageUrl: "/kawasaki-z400-motorcycle-green-sport.jpg",
    transmission: "Manual",
    fuel: "Gasolina",
    color: "Verde",
    plateEnd: "9",
    observations: "Sem sinistro, sem leilão. Escapamento Akrapovic original.",
  },
  {
    id: "5",
    brand: "Honda",
    model: "CG 160 Titan",
    year: "2023/2024",
    km: 3500,
    price: 18990,
    imageUrl: "/honda-cg-160-titan-motorcycle-red.jpg",
    transmission: "Manual",
    fuel: "Flex",
    color: "Vermelha",
    plateEnd: "1",
    observations: "Sem sinistro, sem leilão. Praticamente zero km, garantia de fábrica.",
  },
  {
    id: "6",
    brand: "Yamaha",
    model: "Fazer 250",
    year: "2021/2022",
    km: 28000,
    price: 19500,
    imageUrl: "/yamaha-fazer-250-motorcycle-blue.jpg",
    transmission: "Manual",
    fuel: "Flex",
    color: "Azul",
    plateEnd: "4",
    observations: "Sem sinistro, sem leilão. Ótimo custo-benefício.",
  },
  {
    id: "7",
    brand: "BMW",
    model: "G 310 R",
    year: "2022/2022",
    km: 9800,
    price: 29990,
    imageUrl: "/bmw-g-310-r-motorcycle-white-premium.jpg",
    transmission: "Manual",
    fuel: "Gasolina",
    color: "Branca",
    plateEnd: "6",
    observations: "Sem sinistro, sem leilão. Revisões na concessionária BMW.",
  },
  {
    id: "8",
    brand: "Triumph",
    model: "Street Twin",
    year: "2020/2020",
    km: 18500,
    price: 48990,
    imageUrl: "/triumph-street-twin-motorcycle-classic-silver.jpg",
    transmission: "Manual",
    fuel: "Gasolina",
    color: "Prata",
    plateEnd: "8",
    observations: "Sem sinistro, sem leilão. Moto clássica em excelente estado.",
  },
]
