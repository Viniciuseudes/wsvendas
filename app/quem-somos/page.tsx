import type { Metadata } from "next";
import { MapPin, CheckCircle2, Award, Wrench } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { Separator } from "@/components/ui/separator";

// Otimização de SEO para o Google ler sua página corretamente
export const metadata: Metadata = {
  title: "Quem Somos | Referência em Motos Novas e Seminovas no Araripe",
  description:
    "Loja de motos em Ouricuri-PE atendendo toda região do Araripe (Araripina, Trindade, Bodocó, Exu). Motos revisadas com garantia, procedência e confiança.",
  keywords: [
    "motos ouricuri",
    "comprar moto araripe",
    "motos seminovas pernambuco",
    "honda ouricuri",
    "yamaha araripina",
    "moto revisada",
    "oficina de motos",
  ],
};

export default function QuemSomosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Banner Institucional */}
        <div className="bg-[#8B0000] py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold md:text-5xl">
              Tradição, Confiança e Qualidade
            </h1>
            <p className="mt-4 text-lg text-white/90 md:text-xl max-w-2xl mx-auto">
              Sua melhor opção para compra de motos novas e seminovas em
              Ouricuri e toda a Região do Araripe.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Texto Principal com Foco em SEO Local */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Nossa História
              </h2>
              <div className="prose prose-slate text-gray-600 leading-relaxed">
                <p>
                  Com raízes profundas na cidade de{" "}
                  <strong>Ouricuri, Pernambuco</strong>, nossa trajetória
                  começou com uma loja especializada em peças e serviços. Ao
                  longo dos anos, construímos uma reputação sólida baseada na
                  honestidade e na excelência técnica.
                </p>
                <p>
                  Identificamos a necessidade da região por um lugar seguro para
                  comprar motos com procedência garantida. Foi assim que
                  expandimos nossa atuação para a{" "}
                  <strong>venda de motos novas e seminovas</strong>, trazendo
                  para o mercado um diferencial único: o conhecimento técnico de
                  quem entende de mecânica.
                </p>
                <p>
                  Hoje, temos orgulho de atender não apenas Ouricuri, mas toda a
                  <strong> Região do Araripe</strong>, entregando sonhos sobre
                  duas rodas para clientes de:
                </p>
                <ul className="grid grid-cols-2 gap-2 mt-4 font-medium text-gray-800">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#8B0000]" /> Araripina
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#8B0000]" /> Bodocó
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#8B0000]" /> Trindade
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#8B0000]" /> Exu
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#8B0000]" /> Timorante
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#8B0000]" /> Ipubi
                  </li>
                </ul>
              </div>
            </div>

            {/* Diferenciais (Importante para convencer o cliente) */}
            <div className="grid gap-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Revisão Completa Garantida
                </h3>
                <p className="text-gray-600">
                  Diferente de vendedores autônomos, aqui toda moto passa por
                  nossa
                  <strong> oficina própria</strong>. Só colocamos à venda o que
                  nós mesmos aprovaríamos para uso pessoal. Segurança em
                  primeiro lugar.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Procedência e Documentação
                </h3>
                <p className="text-gray-600">
                  Transparência total. Nossas motos (Honda, Yamaha e outras
                  marcas) possuem documentação em dia, sem surpresas e prontas
                  para transferência.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Pós-Venda de Verdade
                </h3>
                <p className="text-gray-600">
                  Como somos loja física em Ouricuri, você sabe onde nos
                  encontrar. Oferecemos suporte e mantemos um relacionamento de
                  longo prazo com nossos clientes.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-16" />

          {/* Seção de Localização */}
          <section className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Visite Nossa Loja
            </h2>
            <p className="mb-8 text-gray-600">
              Venha tomar um café conosco e conhecer nosso estoque pessoalmente.
            </p>

            <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.854087134374!2d-40.0838956!3d-7.8812976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTInNTIuNyJTIDQwwrAwNScwMi4wIlc!5e0!3m2!1spt-BR!2sbr!4v1633000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] md:h-[500px]"
              ></iframe>
              {/* Nota: O src do iframe acima é um placeholder. 
                  Como o link que você enviou estava genérico (http://googleusercontent...), 
                  recomendo gerar o link de "Incorporar mapa" diretamente no Google Maps 
                  buscando pelo nome exato da sua loja para ter o pino vermelho correto.
               */}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3 text-left max-w-4xl mx-auto bg-white p-6 rounded-lg border">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Endereço</h4>
                <p className="text-sm text-gray-600">Ouricuri - PE</p>
                <p className="text-sm text-gray-600">Região do Araripe</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Horário</h4>
                <p className="text-sm text-gray-600">
                  Segunda a Sexta: 08h às 18h
                </p>
                <p className="text-sm text-gray-600">Sábado: 08h às 12h</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Contato</h4>
                <p className="text-sm text-gray-600">
                  WhatsApp: (87) 99205-7899
                </p>
                <p className="text-sm text-gray-600">Vendas e Serviços</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
