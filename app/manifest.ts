import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WS Vendas Admin',
    short_name: 'WS Admin',
    description: 'Gerenciamento WS Vendas',
    start_url: '/admin', // O "App" sempre começará aqui
    display: 'standalone', // Modo aplicativo (sem barras)
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}