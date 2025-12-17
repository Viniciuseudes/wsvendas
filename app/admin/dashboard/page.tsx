"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Users,
  Bike,
  CalendarRange,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- DADOS MOCKADOS (Simulando Banco de Dados) ---
const revenueData = [
  { name: "Jan", total: 45000 },
  { name: "Fev", total: 52000 },
  { name: "Mar", total: 48000 },
  { name: "Abr", total: 61000 },
  { name: "Mai", total: 55000 },
  { name: "Jun", total: 75000 },
];

const brandData = [
  { name: "Honda", value: 65, color: "#DC2626" }, // Vermelho Honda
  { name: "Yamaha", value: 25, color: "#2563EB" }, // Azul Yamaha
  { name: "Outras", value: 10, color: "#94A3B8" }, // Cinza
];

const recentSales = [
  {
    id: 1,
    model: "Honda XRE 300",
    price: "R$ 28.990",
    date: "Hoje, 10:30",
    seller: "Vinicius",
  },
  {
    id: 2,
    model: "Yamaha MT-03",
    price: "R$ 32.500",
    date: "Ontem, 16:45",
    seller: "Vinicius",
  },
  {
    id: 3,
    model: "Honda Titan 160",
    price: "R$ 18.200",
    date: "15/06, 09:15",
    seller: "João",
  },
  {
    id: 4,
    model: "BMW G 310 R",
    price: "R$ 35.000",
    date: "14/06, 14:20",
    seller: "Maria",
  },
];

export default function DashboardPage() {
  // Simples trava de segurança visual (na real usaria a mesma do admin)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "abrobreira123") setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-center text-slate-900">
            Acesso ao Dashboard
          </h2>
          <input
            type="password"
            placeholder="Senha Admin"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full bg-[#0f52ba]">
            Entrar
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-8">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Topo com Navegação */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-500 mb-1">
              <Link
                href="/admin"
                className="hover:text-[#0f52ba] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar para Admin
              </Link>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-500">
              Visão geral de performance e vendas.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
            <Button variant="ghost" size="sm" className="text-slate-600">
              7D
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-blue-50 text-blue-700 font-bold"
            >
              30D
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              3M
            </Button>
          </div>
        </div>

        {/* --- KPI CARDS (Métricas Principais) --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Faturamento Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">R$ 336k</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% este mês
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Motos Vendidas
              </CardTitle>
              <Bike className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">24</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +4 vs mês passado
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Ticket Médio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">R$ 14.2k</div>
              <p className="text-xs text-slate-400 mt-1">Estável</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Tempo de Venda
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">18 Dias</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowDownRight className="h-3 w-3 mr-1" /> -2 dias (mais
                rápido)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* --- GRÁFICOS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Gráfico de Faturamento (Ocupa 4 colunas) */}
          <Card className="col-span-1 lg:col-span-4 border-none shadow-sm">
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
              <CardDescription>
                Evolução do faturamento nos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorTotal"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0f52ba"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0f52ba"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E2E8F0"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748B", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748B", fontSize: 12 }}
                      tickFormatter={(value) => `R$${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value) => [`R$ ${value}`, "Receita"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#0f52ba"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de Marcas (Ocupa 3 colunas) */}
          <Card className="col-span-1 lg:col-span-3 border-none shadow-sm">
            <CardHeader>
              <CardTitle>Participação por Marca</CardTitle>
              <CardDescription>
                Dominância de mercado no estoque atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={brandData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {brandData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* Legenda Customizada Centralizada */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-slate-900">
                    100%
                  </span>
                  <span className="text-xs text-slate-500 uppercase">
                    Estoque
                  </span>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-[-20px]">
                {brandData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- LISTA DE VENDAS RECENTES --- */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Últimas Vendas</CardTitle>
                <CardDescription>
                  Transações finalizadas recentemente
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Ver Relatório Completo
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                        $
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{sale.model}</p>
                        <p className="text-sm text-slate-500">
                          Vendedor: {sale.seller}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0f52ba]">{sale.price}</p>
                      <p className="text-xs text-slate-400">{sale.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
