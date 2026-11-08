import React, { useEffect, useMemo, useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { VendaPresencial } from "../components/VendaPresencial";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

import adventureImg from "../../imagens/agnus/adventure.png";
import avivaNosImg from "../../imagens/agnus/aviva-nos.png";
import geracaoImg from "../../imagens/agnus/geracao.png";
import retiroAgnusImg from "../../imagens/agnus/retiro-agnus-dei.png";
import {
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  Church,
  Copy,
  Heart,
  LogOut,
  MapPin,
  Minus,
  Music2,
  Package,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Users,
  ExternalLink,
} from "lucide-react";

type Produto = {
  id: string | number;
  nome: string;
  categoria?: string;
  preco: number | string;
  descricao?: string;
  quantidade_estoque?: number;
  estoque?: number;
  ativo?: boolean;
};

type ItemCarrinho = {
  produto: Produto;
  quantidade: number;
};

type Endereco = {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
};

const PIX = "agnusdeirenovacao@gmail.com";

const INSTAGRAM = "https://www.instagram.com/go.agnusdei_/";

const SPOTIFY =
  "https://open.spotify.com/playlist/37i9dQZF1E4yIeeAGCgeCr";

const SPOTIFY_EMBED =
  "https://open.spotify.com/embed/playlist/37i9dQZF1E4yIeeAGCgeCr?utm_source=generator";

const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Paróquia+São+Vicente+Férrer+Formiga+MG";

/*
 * FOTOS REAIS DO PROJETO
 * Elas estão em:
 * imagens/agnus/
 */
const fotosRetiros = [
  {
    src: adventureImg,
    titulo: "Adventure",
    descricao:
      "Momentos de convivência, alegria e fraternidade vividos pela comunidade Agnus Dei.",
  },
  {
    src: avivaNosImg,
    titulo: "Aviva-nos",
    descricao:
      "Tempo de oração, louvor e renovação da fé em comunidade.",
  },
  {
    src: geracaoImg,
    titulo: "Geração Agnus Dei",
    descricao:
      "Jovens e membros da comunidade unidos pela fé, amizade e missão.",
  },
  {
    src: retiroAgnusImg,
    titulo: "Retiro Agnus Dei",
    descricao:
      "Momentos especiais de oração, encontro com Deus e renovação espiritual.",
  },
];

const estilo = `
.loja-page{
  color:#302426;
}

.loja-page *{
  box-sizing:border-box;
}

.loja-hero{
  position:relative;
  overflow:hidden;
  padding:68px 42px;
  border-radius:24px;
  background:
    radial-gradient(circle at 82% 12%,rgba(218,184,112,.24),transparent 30%),
    linear-gradient(125deg,#310c16,#641d2b 65%,#7b3940);
  color:#fff8ed;
  box-shadow:0 18px 45px #4a0e1724;
  margin:10px 0 30px;
}

.loja-hero:after{
  content:"✦";
  position:absolute;
  right:7%;
  bottom:-68px;
  font-size:250px;
  color:#ffffff0b;
}

.hero-label,
.section-kicker{
  font-size:11px;
  letter-spacing:2.3px;
  text-transform:uppercase;
  font-weight:800;
  color:#bd9857;
}

.loja-hero h1{
  font-family:Georgia,serif;
  font-size:clamp(36px,5vw,58px);
  line-height:1.08;
  margin:18px 0 14px;
  max-width:680px;
}

.loja-hero p{
  max-width:610px;
  color:#f3e8df;
  line-height:1.8;
}

.hero-actions{
  display:flex;
  gap:12px;
  flex-wrap:wrap;
  margin-top:25px;
}

.hero-actions a,
.hero-actions button{
  border:1px solid #d9b878;
  border-radius:999px;
  padding:12px 19px;
  text-decoration:none;
  font-weight:700;
  display:inline-flex;
  align-items:center;
  gap:8px;
  cursor:pointer;
}

.hero-main{
  background:#d9b878;
  color:#39101a;
}

.hero-alt{
  background:transparent;
  color:#fff;
}

.welcome-strip{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:15px;
  flex-wrap:wrap;
  background:white;
  border:1px solid #eee5da;
  border-radius:16px;
  padding:18px 22px;
  margin-bottom:38px;
}

.welcome-strip strong{
  color:#4a0e17;
  font-size:19px;
}

.welcome-meta{
  font-size:12px;
  color:#83766f;
}

.welcome-actions{
  display:flex;
  align-items:center;
  gap:10px;
  flex-wrap:wrap;
}

.logout-button{
  border:1px solid #eaded2;
  background:#fffaf6;
  color:#4a0e17;
  border-radius:9px;
  padding:9px 13px;
  font-weight:800;
  cursor:pointer;
  display:inline-flex;
  align-items:center;
  gap:6px;
}

.section-head{
  display:flex;
  justify-content:space-between;
  align-items:end;
  gap:14px;
  flex-wrap:wrap;
  margin-bottom:18px;
}

.section-head h2,
.info-card h3{
  font-family:Georgia,serif;
  color:#4a0e17;
  font-size:30px;
  margin:6px 0;
}

.muted{
  color:#827771;
  font-size:13px;
  line-height:1.65;
}

.filter-row{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
}

.filter-chip{
  border:1px solid #e8ded2;
  background:white;
  border-radius:30px;
  padding:9px 15px;
  color:#6d5b55;
  font-weight:700;
  cursor:pointer;
}

.filter-chip.active{
  background:#4a0e17;
  color:#fff;
  border-color:#4a0e17;
}

.catalog-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(230px,1fr));
  gap:17px;
}

.product-card{
  background:white;
  border:1px solid #eee6dc;
  border-radius:17px;
  padding:20px;
  display:flex;
  flex-direction:column;
  min-height:220px;
  box-shadow:0 6px 20px #4a0e1708;
}

.product-icon{
  width:42px;
  height:42px;
  border-radius:13px;
  background:#f7f0e5;
  color:#946c35;
  display:grid;
  place-items:center;
  margin-bottom:15px;
}

.product-card h3{
  margin:0 0 7px;
  color:#39272a;
  font-size:17px;
}

.product-card p{
  font-size:13px;
  line-height:1.55;
  color:#827771;
  flex:1;
}

.product-bottom{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:8px;
  border-top:1px solid #f0e9e1;
  padding-top:13px;
  margin-top:12px;
}

.product-price{
  font-size:19px;
  font-weight:800;
  color:#4a0e17;
}

.stock-note{
  font-size:11px;
  color:#7b766f;
}

.add-button,
.primary-button,
.gold-button{
  border:0;
  border-radius:10px;
  padding:10px 13px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:7px;
  font-weight:800;
  cursor:pointer;
}

.add-button{
  background:#4a0e17;
  color:white;
}

.gold-button{
  background:#d4af37;
  color:#3d1018;
}

.add-button:disabled,
.primary-button:disabled,
.gold-button:disabled{
  opacity:.55;
  cursor:not-allowed;
}

.store-layout{
  display:grid;
  grid-template-columns:minmax(0,1fr) 350px;
  gap:20px;
  align-items:start;
}

.cart-card{
  background:white;
  border:1px solid #eee5dc;
  border-radius:18px;
  padding:22px;
  box-shadow:0 7px 22px #4a0e1708;
  position:sticky;
  top:95px;
}

.cart-title{
  display:flex;
  align-items:center;
  justify-content:space-between;
  color:#4a0e17;
}

.cart-title h3{
  display:flex;
  align-items:center;
  gap:8px;
}

.cart-item{
  display:grid;
  grid-template-columns:1fr auto;
  gap:8px;
  padding:13px 0;
  border-bottom:1px dashed #e8ded2;
  font-size:13px;
}

.cart-item small{
  display:block;
  color:#8a7d75;
  margin-top:4px;
}

.quantity-controls{
  display:flex;
  align-items:center;
  gap:8px;
  margin-top:7px;
}

.quantity-controls button,
.remove-button{
  border:0;
  background:#f6f0e9;
  color:#4a0e17;
  border-radius:7px;
  padding:5px;
  cursor:pointer;
}

.remove-button{
  color:#b33b3b;
  background:transparent;
}

.cart-total{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:16px 0;
  font-size:17px;
  border-top:1px solid #eee5dc;
  margin-top:12px;
}

.cart-total strong{
  color:#4a0e17;
  font-size:22px;
}

.checkout-label{
  display:block;
  font-size:12px;
  font-weight:800;
  color:#55433e;
  margin:12px 0;
}

.checkout-label input{
  display:block;
  width:100%;
  box-sizing:border-box;
  margin-top:7px;
  border:1px solid #e4d9cd;
  border-radius:9px;
  padding:10px 11px;
  background:#fff;
}

.checkout-label input:focus{
  outline:2px solid #d4af3744;
  border-color:#b99659;
}

.checkout-row{
  display:grid;
  grid-template-columns:1fr auto;
  gap:7px;
}

.payment-options{
  display:flex;
  gap:15px;
  flex-wrap:wrap;
  margin-top:8px;
}

.payment-option{
  display:flex;
  align-items:center;
  gap:7px;
  font-size:13px;
  color:#5f504c;
  cursor:pointer;
}

.delivery-note{
  display:flex;
  gap:8px;
  align-items:flex-start;
  background:#faf5ec;
  padding:11px;
  border-radius:9px;
  color:#725a36;
  font-size:12px;
  line-height:1.55;
  margin-top:12px;
}

.primary-button{
  width:100%;
  background:#4a0e17;
  color:white;
  margin-top:14px;
  min-height:44px;
}

.empty-cart{
  text-align:center;
  color:#8a7d75;
  padding:22px 5px;
  font-size:13px;
  line-height:1.7;
}

.feedback{
  padding:12px;
  border-radius:9px;
  font-size:12px;
  line-height:1.5;
}

.feedback.error{
  background:#fff0ee;
  color:#a42e27;
}

.feedback.success{
  background:#eef9f1;
  color:#24633b;
  margin-top:12px;
}

.intro-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:17px;
  margin:42px 0;
}

.intro-card{
  background:white;
  border:1px solid #eee5dc;
  border-radius:18px;
  padding:24px;
  min-height:170px;
}

.intro-icon{
  width:44px;
  height:44px;
  border-radius:14px;
  background:#f7f0e5;
  color:#946c35;
  display:grid;
  place-items:center;
  margin-bottom:15px;
}

.intro-card h3{
  font-family:Georgia,serif;
  color:#4a0e17;
  font-size:21px;
  margin-bottom:8px;
}

/* ==============================
   GALERIA
============================== */

.gallery-section{
  margin:58px 0;
}

.gallery-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
}

.gallery-card{
  margin:0;
  background:#fff;
  border:1px solid #eee5dc;
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 8px 25px #4a0e1709;
  transition:
    transform .25s ease,
    box-shadow .25s ease;
}

.gallery-card:hover{
  transform:translateY(-5px);
  box-shadow:0 16px 35px #4a0e1718;
}

.gallery-image-wrapper{
  position:relative;
  overflow:hidden;
  height:260px;
  background:#4a0e17;
}

.gallery-card img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  transition:transform .5s ease;
}

.gallery-card:hover img{
  transform:scale(1.06);
}

.gallery-overlay{
  position:absolute;
  inset:0;
  background:linear-gradient(
    to top,
    rgba(49,8,14,.7),
    transparent 60%
  );
  pointer-events:none;
}

.gallery-caption{
  padding:17px;
}

.gallery-caption strong{
  display:block;
  color:#4a0e17;
  font-size:16px;
  margin-bottom:6px;
}

.gallery-caption span{
  display:block;
  color:#827771;
  font-size:12px;
  line-height:1.55;
}

/* ==============================
   REDES SOCIAIS
============================== */

.community-section{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  margin:50px 0;
}

.community-card{
  background:white;
  border:1px solid #eee5dc;
  border-radius:20px;
  padding:27px;
}

.community-card h2{
  font-family:Georgia,serif;
  color:#4a0e17;
  margin:8px 0 12px;
}

/* Instagram */

.instagram-card{
  position:relative;
  overflow:hidden;
  background:
    radial-gradient(
      circle at top right,
      rgba(212,175,55,.18),
      transparent 35%
    ),
    linear-gradient(145deg,#fff,#fbf5ef);
}

.instagram-header{
  display:flex;
  align-items:center;
  gap:15px;
  margin-bottom:15px;
}

.instagram-icon{
  width:55px;
  height:55px;
  border-radius:17px;
  display:grid;
  place-items:center;
  background:linear-gradient(
    135deg,
    #4a0e17,
    #8c3f50 55%,
    #d4af37
  );
  color:#fff;
  box-shadow:0 8px 22px #4a0e1725;
}

.instagram-handle{
  color:#4a0e17;
  font-size:18px;
  font-weight:900;
}

.instagram-subtitle{
  color:#8a7971;
  font-size:12px;
  margin-top:3px;
}

.instagram-description{
  color:#6e5d58;
  font-size:13px;
  line-height:1.7;
  margin:15px 0;
}

.instagram-button{
  display:inline-flex;
  align-items:center;
  gap:8px;
  background:#4a0e17;
  color:#fff;
  text-decoration:none;
  border-radius:11px;
  padding:11px 16px;
  font-size:12px;
  font-weight:900;
  transition:transform .2s ease, background .2s ease;
}

.instagram-button:hover{
  transform:translateY(-2px);
  background:#641d2b;
}

/* Spotify */

.spotify-card{
  overflow:hidden;
  padding:0;
  background:#111;
  border-color:#111;
}

.spotify-content{
  padding:25px;
  color:white;
  background:
    radial-gradient(
      circle at top right,
      rgba(212,175,55,.22),
      transparent 35%
    ),
    linear-gradient(145deg,#241116,#4a0e17);
}

.spotify-header{
  display:flex;
  align-items:center;
  gap:14px;
}

.spotify-icon{
  width:52px;
  height:52px;
  border-radius:50%;
  display:grid;
  place-items:center;
  background:#d4af37;
  color:#3d1018;
}

.spotify-title{
  color:#fff;
  font-family:Georgia,serif;
  font-size:22px;
  margin:0;
}

.spotify-subtitle{
  color:#e5d9d1;
  font-size:12px;
  margin-top:4px;
}

.spotify-description{
  color:#eee3dd;
  font-size:13px;
  line-height:1.7;
  margin:17px 0;
}

.spotify-button{
  display:inline-flex;
  align-items:center;
  gap:8px;
  color:#3d1018;
  background:#d4af37;
  text-decoration:none;
  border-radius:10px;
  padding:10px 15px;
  font-size:12px;
  font-weight:900;
}

.spotify-player{
  width:100%;
  height:352px;
  border:0;
  display:block;
}

/* MAPA */

.map-frame{
  width:100%;
  height:290px;
  border:0;
  border-radius:13px;
  margin-top:10px;
}

.info-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:17px;
  margin:42px 0 20px;
}

.info-card{
  background:white;
  border:1px solid #eee5dc;
  border-radius:18px;
  padding:22px;
}

.info-card svg{
  color:#a47d49;
}

.info-card h3{
  font-size:22px;
}

.info-card a{
  color:#6b2833;
  font-weight:800;
  font-size:13px;
}

@media(max-width:1000px){
  .gallery-grid{
    grid-template-columns:repeat(2,1fr);
  }

  .community-section{
    grid-template-columns:1fr;
  }

  .intro-grid,
  .info-grid{
    grid-template-columns:1fr;
  }

  .store-layout{
    grid-template-columns:1fr;
  }

  .cart-card{
    position:static;
  }
}

@media(max-width:620px){
  .loja-hero{
    padding:42px 24px;
  }

  .loja-hero h1{
    font-size:39px;
  }

  .gallery-grid{
    grid-template-columns:1fr;
  }

  .gallery-image-wrapper{
    height:250px;
  }

  .checkout-row{
    grid-template-columns:1fr;
  }

  .welcome-strip{
    align-items:flex-start;
  }

  .spotify-player{
    height:352px;
  }
}
`;

function normalizarCategoria(categoria = "") {
  return String(categoria)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function ehArtigoReligioso(categoria = "") {
  const cat = normalizarCategoria(categoria);

  return [
    "RELIG",
    "LOJA",
    "LOJINHA",
    "TERCO",
    "BIBLIA",
    "CRUCIFIXO",
    "IMAGEM",
    "SANTO",
  ].some((item) => cat.includes(item));
}

const Loja: React.FC = () => {
  const { user, logout } = useAuth();

  const perfil = String(
    (user as any)?.perfil || "CLIENTE",
  ).toUpperCase();

  const isVolunteer = perfil === "VOLUNTARIO";

  const nomeUsuario =
    (user as any)?.nome_completo ||
    (user as any)?.nome ||
    (user as any)?.username ||
    "Usuário";

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [categoria, setCategoria] = useState("TODOS");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [consultandoCep, setConsultandoCep] = useState(false);
  const [pagamento, setPagamento] =
    useState<"DINHEIRO" | "PIX">("PIX");
  const [precisaTroco, setPrecisaTroco] = useState(false);
  const [trocoPara, setTrocoPara] = useState("");
  const [finalizando, setFinalizando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [pixCopiado, setPixCopiado] = useState(false);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setErro("");

      const { data } = await api.get("/produtos");

      const lista = Array.isArray(data)
        ? data
        : data?.produtos || [];

      setProdutos(
        lista.map((p: Produto) => ({
          ...p,
          preco: Number(p.preco) || 0,
        })),
      );
    } catch (error: any) {
      setErro(
        error?.userMessage ||
          error?.response?.data?.mensagem ||
          "Não foi possível carregar os produtos. Verifique se o backend está em execução.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void carregarProdutos();
  }, []);

  const produtosVisiveis = useMemo(
    () =>
      produtos.filter((produto) => {
        const religioso = ehArtigoReligioso(
          produto.categoria,
        );

        if (!isVolunteer && !religioso) return false;

        if (
          categoria === "RELIGIOSOS" &&
          !religioso
        ) {
          return false;
        }

        if (
          categoria === "LANCHONETE" &&
          religioso
        ) {
          return false;
        }

        return String(produto.nome || "")
          .toLowerCase()
          .includes(busca.toLowerCase());
      }),
    [produtos, isVolunteer, categoria, busca],
  );

  const total = carrinho.reduce(
    (soma, item) =>
      soma +
      Number(item.produto.preco) *
        item.quantidade,
    0,
  );

  const quantidadeCarrinho = carrinho.reduce(
    (soma, item) =>
      soma + item.quantidade,
    0,
  );

  const adicionar = (produto: Produto) => {
    const estoque = Number(
      produto.quantidade_estoque ??
        produto.estoque ??
        0,
    );

    if (estoque <= 0) {
      setErro(
        "Este produto está indisponível no estoque.",
      );
      return;
    }

    setCarrinho((anterior) => {
      const atual = anterior.find(
        (item) =>
          item.produto.id === produto.id,
      );

      if (
        (atual?.quantidade ?? 0) >= estoque
      ) {
        setErro(
          "Quantidade máxima disponível em estoque atingida.",
        );
        return anterior;
      }

      setErro("");

      if (atual) {
        return anterior.map((item) =>
          item.produto.id === produto.id
            ? {
                ...item,
                quantidade:
                  item.quantidade + 1,
              }
            : item,
        );
      }

      return [
        ...anterior,
        {
          produto,
          quantidade: 1,
        },
      ];
    });
  };

  const alterarQuantidade = (
    id: string | number,
    delta: number,
  ) => {
    setCarrinho((anterior) =>
      anterior
        .map((item) => {
          if (
            item.produto.id !== id
          ) {
            return item;
          }

          const estoque = Number(
            item.produto
              .quantidade_estoque ??
              item.produto.estoque ??
              0,
          );

          return {
            ...item,
            quantidade: Math.max(
              1,
              Math.min(
                estoque,
                item.quantidade + delta,
              ),
            ),
          };
        })
        .filter(
          (item) =>
            item.quantidade > 0,
        ),
    );
  };

  const consultarCep = async () => {
    const cepLimpo =
      cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setErro(
        "Informe um CEP válido com 8 números.",
      );
      return;
    }

    setConsultandoCep(true);
    setErro("");
    setEndereco(null);

    try {
      const { data } = await api.get(
        `/cep/${cepLimpo}`,
      );

      setEndereco(data);
    } catch (error: any) {
      setErro(
        error?.userMessage ||
          error?.response?.data?.mensagem ||
          "Não foi possível consultar esse CEP.",
      );
    } finally {
      setConsultandoCep(false);
    }
  };

  const copiarChavePix = async () => {
    try {
      await navigator.clipboard.writeText(
        PIX,
      );

      setPixCopiado(true);

      window.setTimeout(
        () => setPixCopiado(false),
        2200,
      );
    } catch {
      setErro(
        "Não foi possível copiar a chave PIX neste navegador.",
      );
    }
  };

  const finalizarPedido = async () => {
    if (!carrinho.length) {
      setErro(
        "Adicione pelo menos um artigo ao carrinho.",
      );
      return;
    }

    if (!endereco) {
      setErro(
        "Consulte seu CEP antes de finalizar o pedido.",
      );
      return;
    }

    if (!numero.trim()) {
      setErro(
        "Informe o número do endereço.",
      );
      return;
    }

    if (
      pagamento === "DINHEIRO" &&
      precisaTroco &&
      (!trocoPara ||
        Number(trocoPara) < total)
    ) {
      setErro(
        `O valor para troco deve ser maior ou igual a R$ ${total.toFixed(
          2,
        )}.`,
      );
      return;
    }

    setFinalizando(true);
    setErro("");
    setMensagem("");

    try {
      const cepLimpo =
        endereco.cep.replace(/\D/g, "");

      const payload = {
        itens: carrinho.map((item) => ({
          produto_id: item.produto.id,
          quantidade: item.quantidade,
        })),

        cep: cepLimpo,

        numero: numero.trim(),

        forma_pagamento_entrega:
          pagamento,

        precisa_troco:
          pagamento === "DINHEIRO" &&
          precisaTroco,

        troco_para:
          pagamento === "DINHEIRO" &&
          precisaTroco
            ? Number(trocoPara)
            : null,
      };

      const { data } = await api.post(
        "/vendas/online",
        payload,
      );

      setMensagem(
        data?.mensagem ||
          "Pedido realizado com sucesso! Seu pedido será entregue no endereço informado.",
      );

      setCarrinho([]);
      setCep("");
      setNumero("");
      setEndereco(null);
      setPrecisaTroco(false);
      setTrocoPara("");

      await carregarProdutos();
    } catch (error: any) {
      setErro(
        error?.userMessage ||
          error?.response?.data?.mensagem ||
          "Não foi possível concluir o pedido.",
      );
    } finally {
      setFinalizando(false);
    }
  };

  return (
    <MainLayout>
      <style>{estilo}</style>

      <div className="loja-page">

        {/* HERO */}
        <section
          className="loja-hero"
          id="inicio"
        >
          <span className="hero-label">
            Renovação Carismática Católica ·
            Diocese de Luz
          </span>

          <h1>
            Fé que se vive.
            <br />

            <span
              style={{
                color: "#dfbd78",
              }}
            >
              Comunidade que acolhe.
            </span>
          </h1>

          <p>
            Bem-vindo(a) ao espaço do
            Grupo de Oração Agnus Dei.
            Conheça nossa comunidade,
            acompanhe nossos momentos de
            oração e encontre artigos
            religiosos preparados com
            carinho.
          </p>

          <div className="hero-actions">

            <button
              className="hero-main"
              onClick={() =>
                document
                  .getElementById(
                    "produtos",
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              <ShoppingBag size={17} />
              Conhecer a loja
            </button>

            <a
              className="hero-alt"
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
            >
             <Camera size={17} />
              @go.agnusdei_
            </a>

          </div>
        </section>

        {/* BOAS-VINDAS */}
        <section className="welcome-strip">
          <div>
            <div className="section-kicker">
              AGNUS DEI · FORMIGA/MG
            </div>

            <strong>
              Bem-vindo, {nomeUsuario}!
            </strong>

            <div className="welcome-meta">
              {isVolunteer
                ? "Acesso de voluntário · catálogo e vendas presenciais"
                : "Loja de artigos religiosos · pedidos com entrega por CEP"}
            </div>
          </div>

          <div className="welcome-actions">

            <span className="welcome-meta">
              <ShieldCheck
                size={16}
                style={{
                  verticalAlign:
                    "middle",
                  marginRight: 5,
                }}
              />

              Acesso autenticado ·{" "}
              {perfil}
            </span>

            <button
              className="logout-button"
              type="button"
              onClick={logout}
            >
              <LogOut size={15} />
              Sair da conta
            </button>

          </div>
        </section>

        {/* INTRO */}
        <section
          className="intro-grid"
          aria-label="Sobre o grupo"
        >
          <article className="intro-card">
            <div className="intro-icon">
              <Church size={22} />
            </div>

            <h3>
              Grupo de Oração
            </h3>

            <p className="muted">
              Um espaço de oração,
              louvor, partilha e encontro
              com Deus em comunidade.
            </p>
          </article>

          <article className="intro-card">
            <div className="intro-icon">
              <Users size={22} />
            </div>

            <h3>
              Comunidade que acolhe
            </h3>

            <p className="muted">
              Caminhamos juntos na fé,
              servindo e acolhendo pessoas
              de todas as idades.
            </p>
          </article>

          <article className="intro-card">
            <div className="intro-icon">
              <Heart size={22} />
            </div>

            <h3>
              Fé em ação
            </h3>

            <p className="muted">
              Nossos encontros, retiros
              e trabalhos são feitos com
              oração, serviço e amor ao
              próximo.
            </p>
          </article>
        </section>

        {/* PRODUTOS */}
        <section id="produtos">

          <div className="section-head">

            <div>
              <div className="section-kicker">
                NOSSA LOJINHA
              </div>

              <h2>
                {isVolunteer
                  ? "Catálogo de produtos"
                  : "Artigos religiosos"}
              </h2>

              <p className="muted">
                {isVolunteer
                  ? "Consulte os artigos religiosos e produtos da lanchonete para registrar no caixa presencial."
                  : "Escolha seus artigos religiosos e receba seu pedido no endereço informado."}
              </p>
            </div>

            <div
              style={{
                position:
                  "relative",
                minWidth: 220,
                maxWidth: 320,
                width: "100%",
              }}
            >
              <Search
                size={16}
                style={{
                  position:
                    "absolute",
                  left: 11,
                  top: 12,
                  color: "#9b8b7d",
                }}
              />

              <input
                value={busca}
                onChange={(event) =>
                  setBusca(
                    event.target.value,
                  )
                }
                placeholder="Buscar produto..."
                style={{
                  padding:
                    "10px 12px 10px 35px",
                  border:
                    "1px solid #e8ded2",
                  borderRadius: 10,
                  width: "100%",
                  boxSizing:
                    "border-box",
                }}
              />
            </div>

          </div>

          {isVolunteer && (
            <div
              className="filter-row"
              style={{
                marginBottom: 17,
              }}
            >
              {[
                ["TODOS", "Todos"],
                [
                  "RELIGIOSOS",
                  "Artigos religiosos",
                ],
                [
                  "LANCHONETE",
                  "Lanchonete",
                ],
              ].map(
                ([valor, texto]) => (
                  <button
                    key={valor}
                    className={`filter-chip ${
                      categoria ===
                      valor
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setCategoria(
                        valor,
                      )
                    }
                  >
                    {texto}
                  </button>
                ),
              )}
            </div>
          )}

          {!isVolunteer && (
            <div
              className="filter-row"
              style={{
                marginBottom: 17,
              }}
            >
              <span className="filter-chip active">
                Artigos religiosos
              </span>
            </div>
          )}

          {erro && (
            <p className="feedback error">
              {erro}
            </p>
          )}

          {loading ? (
            <p className="muted">
              Carregando catálogo...
            </p>
          ) : (
            <div className="store-layout">

              <div className="catalog-grid">

                {produtosVisiveis.map(
                  (produto) => {
                    const estoque =
                      Number(
                        produto.quantidade_estoque ??
                          produto.estoque ??
                          0,
                      );

                    return (
                      <article
                        className="product-card"
                        key={
                          produto.id
                        }
                      >
                        <div className="product-icon">
                          <Heart
                            size={21}
                          />
                        </div>

                        <span className="section-kicker">
                          {produto.categoria ||
                            "Produto"}
                        </span>

                        <h3>
                          {produto.nome}
                        </h3>

                        <p>
                          {produto.descricao ||
                            "Um artigo especial para sua caminhada de fé."}
                        </p>

                        <div className="product-bottom">

                          <div>
                            <div className="product-price">
                              R${" "}
                              {Number(
                                produto.preco,
                              ).toFixed(
                                2,
                              )}
                            </div>

                            <div className="stock-note">
                              {estoque >
                              0
                                ? `${estoque} disponível(is)`
                                : "Indisponível"}
                            </div>
                          </div>

                          {!isVolunteer && (
                            <button
                              className="add-button"
                              disabled={
                                estoque <=
                                0
                              }
                              onClick={() =>
                                adicionar(
                                  produto,
                                )
                              }
                            >
                              <Plus
                                size={15}
                              />
                              Adicionar
                            </button>
                          )}

                        </div>
                      </article>
                    );
                  },
                )}

                {!produtosVisiveis.length && (
                  <p className="muted">
                    Nenhum produto
                    encontrado nesta
                    categoria.
                  </p>
                )}

              </div>

              {/* CARRINHO */}
              {!isVolunteer && (
                <aside className="cart-card">

                  <div className="cart-title">

                    <h3>
                      <ShoppingCart
                        size={20}
                      />
                      Meu pedido
                    </h3>

                    <span className="welcome-meta">
                      {
                        quantidadeCarrinho
                      }{" "}
                      item(ns)
                    </span>

                  </div>

                  {!carrinho.length ? (
                    <div className="empty-cart">
                      Seu carrinho está
                      vazio.
                      <br />
                      Adicione artigos
                      para continuar.
                    </div>
                  ) : (
                    <>
                      {carrinho.map(
                        (item) => (
                          <div
                            className="cart-item"
                            key={
                              item
                                .produto
                                .id
                            }
                          >

                            <div>
                              <strong>
                                {
                                  item
                                    .produto
                                    .nome
                                }
                              </strong>

                              <small>
                                R${" "}
                                {Number(
                                  item
                                    .produto
                                    .preco,
                                ).toFixed(
                                  2,
                                )}{" "}
                                cada
                              </small>

                              <div className="quantity-controls">

                                <button
                                  type="button"
                                  onClick={() =>
                                    alterarQuantidade(
                                      item
                                        .produto
                                        .id,
                                      -1,
                                    )
                                  }
                                  aria-label="Diminuir quantidade"
                                >
                                  <Minus
                                    size={
                                      13
                                    }
                                  />
                                </button>

                                <span>
                                  {
                                    item.quantidade
                                  }
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    adicionar(
                                      item.produto,
                                    )
                                  }
                                  aria-label="Aumentar quantidade"
                                >
                                  <Plus
                                    size={
                                      13
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  className="remove-button"
                                  onClick={() =>
                                    setCarrinho(
                                      (
                                        anterior,
                                      ) =>
                                        anterior.filter(
                                          (
                                            x,
                                          ) =>
                                            x
                                              .produto
                                              .id !==
                                            item
                                              .produto
                                              .id,
                                        ),
                                    )
                                  }
                                  aria-label="Remover produto"
                                >
                                  <Trash2
                                    size={
                                      14
                                    }
                                  />
                                </button>

                              </div>
                            </div>

                            <strong>
                              R${" "}
                              {(
                                Number(
                                  item
                                    .produto
                                    .preco,
                                ) *
                                item.quantidade
                              ).toFixed(
                                2,
                              )}
                            </strong>

                          </div>
                        ),
                      )}

                      <div className="cart-total">
                        <span>
                          Total
                        </span>

                        <strong>
                          R${" "}
                          {total.toFixed(
                            2,
                          )}
                        </strong>
                      </div>

                      <div className="delivery-note">
                        <MapPin
                          size={16}
                        />

                        <span>
                          <strong>
                            Entrega por
                            CEP.
                          </strong>
                          <br />
                          Informe seu
                          endereço para
                          que o pedido
                          seja entregue
                          no local
                          indicado.
                        </span>
                      </div>

                      <div
                        className="section-kicker"
                        style={{
                          marginTop: 18,
                        }}
                      >
                        DADOS PARA
                        ENTREGA
                      </div>

                      <label className="checkout-label">
                        CEP

                        <div className="checkout-row">

                          <input
                            value={cep}
                            onChange={(
                              event,
                            ) =>
                              setCep(
                                event.target.value
                                  .replace(
                                    /[^0-9-]/g,
                                    "",
                                  )
                                  .slice(
                                    0,
                                    9,
                                  ),
                              )
                            }
                            placeholder="00000-000"
                            maxLength={
                              9
                            }
                          />

                          <button
                            type="button"
                            className="gold-button"
                            onClick={
                              consultarCep
                            }
                            disabled={
                              consultandoCep
                            }
                          >
                            {consultandoCep
                              ? "Buscando..."
                              : "Consultar"}
                          </button>

                        </div>
                      </label>

                      {endereco && (
                        <div className="delivery-note">
                          <MapPin
                            size={15}
                          />

                          <span>
                            <strong>
                              Endereço
                              encontrado
                            </strong>

                            <br />

                            {endereco.logradouro
                              ? `${endereco.logradouro}, `
                              : ""}

                            {
                              endereco.bairro
                            }

                            <br />

                            {
                              endereco.cidade
                            }
                            /
                            {
                              endereco.uf
                            }{" "}
                            · CEP{" "}
                            {
                              endereco.cep
                            }
                          </span>
                        </div>
                      )}

                      <label className="checkout-label">
                        Número do
                        endereço

                        <input
                          value={
                            numero
                          }
                          onChange={(
                            event,
                          ) =>
                            setNumero(
                              event.target
                                .value,
                            )
                          }
                          placeholder="Número da residência"
                        />
                      </label>

                      <label className="checkout-label">
                        Forma de
                        pagamento
                      </label>

                      <div className="payment-options">

                        <label className="payment-option">
                          <input
                            type="radio"
                            checked={
                              pagamento ===
                              "PIX"
                            }
                            onChange={() =>
                              setPagamento(
                                "PIX",
                              )
                            }
                          />
                          PIX
                        </label>

                        <label className="payment-option">
                          <input
                            type="radio"
                            checked={
                              pagamento ===
                              "DINHEIRO"
                            }
                            onChange={() =>
                              setPagamento(
                                "DINHEIRO",
                              )
                            }
                          />
                          Dinheiro
                        </label>

                      </div>

                      {pagamento ===
                        "DINHEIRO" && (
                        <>
                          <label
                            className="payment-option"
                            style={{
                              marginTop:
                                10,
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={
                                precisaTroco
                              }
                              onChange={(
                                event,
                              ) =>
                                setPrecisaTroco(
                                  event
                                    .target
                                    .checked,
                                )
                              }
                            />
                            Preciso de
                            troco
                          </label>

                          {precisaTroco && (
                            <label className="checkout-label">
                              Troco para
                              (R$)

                              <input
                                type="number"
                                min={
                                  total
                                }
                                step="0.01"
                                value={
                                  trocoPara
                                }
                                onChange={(
                                  event,
                                ) =>
                                  setTrocoPara(
                                    event
                                      .target
                                      .value,
                                  )
                                }
                                placeholder={`Mínimo ${total.toFixed(
                                  2,
                                )}`}
                              />
                            </label>
                          )}
                        </>
                      )}

                      {pagamento ===
                        "PIX" && (
                        <div className="delivery-note">
                          <div>
                            <strong>
                              Pagamento
                              via PIX
                            </strong>

                            <br />

                            Envie o
                            pagamento
                            para:

                            <br />

                            <strong>
                              {PIX}
                            </strong>

                            <br />

                            <button
                              type="button"
                              onClick={
                                copiarChavePix
                              }
                              style={{
                                border: 0,
                                background:
                                  "transparent",
                                color:
                                  "#6b2833",
                                fontWeight:
                                  800,
                                cursor:
                                  "pointer",
                                padding:
                                  "7px 0 0",
                              }}
                            >
                              {pixCopiado ? (
                                <>
                                  <Check
                                    size={
                                      13
                                    }
                                    style={{
                                      verticalAlign:
                                        "middle",
                                    }}
                                  />{" "}
                                  Chave
                                  copiada
                                </>
                              ) : (
                                <>
                                  <Copy
                                    size={
                                      13
                                    }
                                    style={{
                                      verticalAlign:
                                        "middle",
                                    }}
                                  />{" "}
                                  Copiar
                                  chave
                                  PIX
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      <button
                        className="primary-button"
                        onClick={
                          finalizarPedido
                        }
                        disabled={
                          finalizando ||
                          !endereco
                        }
                      >
                        <CheckCircle2
                          size={18}
                        />

                        {finalizando
                          ? "Enviando pedido..."
                          : "Finalizar compra"}
                      </button>
                    </>
                  )}

                  {mensagem && (
                    <p className="feedback success">
                      {mensagem}
                    </p>
                  )}

                </aside>
              )}

            </div>
          )}

        </section>

        {/* VENDA PRESENCIAL */}
        {isVolunteer && (
          <VendaPresencial />
        )}

        {/* GALERIA REAL */}
        <section
          className="gallery-section"
          id="retiros"
        >
          <div className="section-head">

            <div>
              <div className="section-kicker">
                MOMENTOS AGNUS DEI
              </div>

              <h2>
                Nossos momentos
              </h2>

              <p className="muted">
                Um pouco dos encontros,
                retiros e momentos
                especiais vividos pela
                comunidade Agnus Dei.
              </p>
            </div>

          </div>

          <div className="gallery-grid">

            {fotosRetiros.map(
              (foto) => (
                <figure
                  className="gallery-card"
                  key={foto.titulo}
                >

                  <div className="gallery-image-wrapper">

                    <img
                      src={foto.src}
                      alt={foto.titulo}
                      loading="lazy"
                    />

                    <div className="gallery-overlay" />

                  </div>

                  <figcaption className="gallery-caption">

                    <strong>
                      {foto.titulo}
                    </strong>

                    <span>
                      {foto.descricao}
                    </span>

                  </figcaption>

                </figure>
              ),
            )}

          </div>
        </section>

        {/* REDES SOCIAIS */}
        <section className="community-section">

          {/* INSTAGRAM */}
          <article
            className="community-card instagram-card"
            id="sobre"
          >

            <div className="section-kicker">
              ACOMPANHE A COMUNIDADE
            </div>

            <div className="instagram-header">

              <div className="instagram-icon">
                <Camera size={27} />
              </div>

              <div>
                <div className="instagram-handle">
                  @go.agnusdei_
                </div>

                <div className="instagram-subtitle">
                  Grupo de Oração Agnus Dei
                </div>
              </div>

            </div>

            <p className="instagram-description">
              Acompanhe nossos encontros,
              momentos de oração, retiros,
              louvores e tudo o que acontece
              na comunidade Agnus Dei.
            </p>

            <a
              className="instagram-button"
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
            >
             <Camera size={16} />

              Ver perfil no Instagram

              <ExternalLink
                size={14}
              />
            </a>

          </article>

          {/* SPOTIFY */}
          <article
            className="community-card spotify-card"
            id="musicas"
          >

            <div className="spotify-content">

              <div className="spotify-header">

                <div className="spotify-icon">
                  <Music2
                    size={25}
                  />
                </div>

                <div>
                  <h2 className="spotify-title">
                    Playlist Agnus Dei
                  </h2>

                  <div className="spotify-subtitle">
                    Louvores para acompanhar sua caminhada
                  </div>
                </div>

              </div>

              <p className="spotify-description">
                Ouça nossa playlist de louvor
                e leve um pouco dos momentos
                de oração e adoração com você.
              </p>

              <a
                className="spotify-button"
                href={SPOTIFY}
                target="_blank"
                rel="noreferrer"
              >
                <Music2
                  size={15}
                />

                Abrir no Spotify

                <ExternalLink
                  size={14}
                />
              </a>

            </div>

            <iframe
              className="spotify-player"
              src={SPOTIFY_EMBED}
              title="Playlist Agnus Dei no Spotify"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />

          </article>

          {/* LOCALIZAÇÃO */}
          <article
            className="community-card"
            id="encontro"
          >

            <div className="section-kicker">
              ONDE ESTAMOS
            </div>

            <h2>
              Paróquia São Vicente Férrer
            </h2>

            <p className="muted">
              Formiga/MG. Consulte o mapa
              para visualizar o local e
              planejar sua visita.
            </p>

            <a
              className="social-link"
              href={MAPS}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: 12,
              }}
            >
              <MapPin
                size={15}
              />

              Abrir no Google Maps

              <ArrowRight
                size={14}
              />
            </a>

            <iframe
              className="map-frame"
              title="Localização do Grupo de Oração Agnus Dei"
              src="https://www.google.com/maps?q=Paróquia+São+Vicente+Férrer,+Formiga,+MG&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </article>

        </section>

        {/* INFORMAÇÕES */}
        <section className="info-grid">

          <article className="info-card">

            <Music2
              size={24}
            />

            <h3>
              Músicas e louvores
            </h3>

            <p className="muted">
              Acompanhe a playlist do
              Agnus Dei e leve os momentos
              de louvor com você.
            </p>

            <a
              href={SPOTIFY}
              target="_blank"
              rel="noreferrer"
            >
              Abrir playlist no Spotify ↗
            </a>

          </article>

          <article className="info-card">

            <Church
              size={24}
            />

            <h3>
              Encontro semanal
            </h3>

            <p className="muted">
              Toda sexta-feira, às 20h,
              na Paróquia São Vicente
              Férrer, em Formiga/MG.
            </p>

          </article>

          <article className="info-card">

            <Package
              size={24}
            />

            <h3>
              Pedidos com entrega
            </h3>

            <p className="muted">
              A loja funciona com entrega
              por CEP. Informe seu endereço
              durante a finalização da compra.
            </p>

          </article>

        </section>

      </div>
    </MainLayout>
  );
};

export default Loja;
export { Loja };