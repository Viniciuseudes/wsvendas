import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Shield, Users, Award, MapPin, Phone, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Quem Somos | WSVENDASMOTOS - Revenda de Motos Seminovas em São Paulo",
  description:
    "Conheça a WSVENDASMOTOS, sua revenda de motos seminovas de confiança em São Paulo. Mais de 10 anos de experiência, motos revisadas e com procedência garantida. Financiamento facilitado e as melhores condições do mercado.",
  keywords: [
    "revenda de motos",
    "motos seminovas",
    "comprar moto usada",
    "motos São Paulo",
    "financiamento de motos",
    "WSVENDASMOTOS",
    "motos revisadas",
    "motos com garantia",
  ],
  openGraph: {
    title: "Quem Somos | WSVENDASMOTOS - Revenda de Motos Seminovas",
    description:
      "Mais de 10 anos de tradição em vendas de motos seminovas. Procedência garantida, financiamento facilitado e atendimento personalizado.",
    type: "website",
    locale: "pt_BR",
    siteName: "WSVENDASMOTOS",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "WSVENDASMOTOS",
  description: "Revenda de motos seminovas em São Paulo",
  url: "https://wsvendasmotos.com.br",
  telephone: "+5511999999999",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. das Motos, 1234",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "01234-567",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.5505,
    longitude: -46.6333,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "14:00",
    },
  ],
}

export default function QuemSomosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex min-h-screen flex-col bg-background">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-[#1a1a1a] to-background py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl font-bold text-foreground md:text-5xl">
                Sobre a <span className="text-[#8B0000]">WSVENDASMOTOS</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
                Há mais de 10 anos conectando você à moto dos seus sonhos com segurança, transparência e as melhores
                condições do mercado.
              </p>
            </div>
          </section>

          {/* Nossa História */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">Nossa História</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A <strong className="text-foreground">WSVENDASMOTOS</strong> nasceu da paixão por motocicletas e do
                    desejo de oferecer um serviço diferenciado no mercado de motos seminovas em São Paulo. Fundada em
                    2014, nossa empresa cresceu baseada em pilares sólidos: honestidade, qualidade e atendimento
                    personalizado.
                  </p>
                  <p>
                    Ao longo de mais de uma década, já realizamos milhares de negociações, conectando motociclistas às
                    suas motos ideais. Cada veículo em nosso estoque passa por rigorosa vistoria mecânica e documental,
                    garantindo tranquilidade na sua compra.
                  </p>
                  <p>
                    Trabalhamos apenas com motos de procedência comprovada, sem sinistro e sem leilão. Nossa reputação
                    foi construída cliente a cliente, indicação a indicação.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Diferenciais */}
          <section className="bg-[#1a1a1a] py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-10 text-center text-2xl font-bold text-foreground md:text-3xl">
                Por Que Escolher a WSVENDASMOTOS?
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <article className="rounded-lg border border-border bg-background p-6">
                  <Shield className="mb-4 h-10 w-10 text-[#8B0000]" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Procedência Garantida</h3>
                  <p className="text-sm text-muted-foreground">
                    Todas as motos são verificadas em órgãos oficiais. Não trabalhamos com veículos de leilão ou
                    sinistrados.
                  </p>
                </article>

                <article className="rounded-lg border border-border bg-background p-6">
                  <Award className="mb-4 h-10 w-10 text-[#8B0000]" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Qualidade Revisada</h3>
                  <p className="text-sm text-muted-foreground">
                    Cada moto passa por vistoria completa antes de entrar em nosso estoque. Você compra com confiança.
                  </p>
                </article>

                <article className="rounded-lg border border-border bg-background p-6">
                  <Users className="mb-4 h-10 w-10 text-[#8B0000]" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Atendimento Humanizado</h3>
                  <p className="text-sm text-muted-foreground">
                    Equipe especializada para tirar todas as suas dúvidas e ajudar na escolha da moto perfeita para
                    você.
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* Missão, Visão, Valores */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
                <div>
                  <h3 className="mb-3 text-xl font-bold text-[#8B0000]">Missão</h3>
                  <p className="text-muted-foreground">
                    Oferecer motos seminovas de qualidade com transparência e preços justos, proporcionando a melhor
                    experiência de compra.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-bold text-[#8B0000]">Visão</h3>
                  <p className="text-muted-foreground">
                    Ser referência no mercado de motos seminovas em São Paulo, reconhecida pela confiança e satisfação
                    dos clientes.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-bold text-[#8B0000]">Valores</h3>
                  <p className="text-muted-foreground">
                    Honestidade, transparência, compromisso com a qualidade e respeito ao cliente em todas as etapas da
                    negociação.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Informações de Contato */}
          <section className="bg-[#1a1a1a] py-12 md:py-16" id="contato-info">
            <div className="container mx-auto px-4">
              <h2 className="mb-10 text-center text-2xl font-bold text-foreground md:text-3xl">Onde Estamos</h2>
              <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#8B0000]" />
                  <div>
                    <h4 className="font-semibold text-foreground">Endereço</h4>
                    <p className="text-sm text-muted-foreground">
                      Av. das Motos, 1234
                      <br />
                      São Paulo - SP
                      <br />
                      CEP: 01234-567
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-[#8B0000]" />
                  <div>
                    <h4 className="font-semibold text-foreground">Telefone</h4>
                    <p className="text-sm text-muted-foreground">
                      (11) 99999-9999
                      <br />
                      WhatsApp disponível
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-[#8B0000]" />
                  <div>
                    <h4 className="font-semibold text-foreground">Horário</h4>
                    <p className="text-sm text-muted-foreground">
                      Seg a Sex: 08h às 18h
                      <br />
                      Sábado: 08h às 14h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  )
}
