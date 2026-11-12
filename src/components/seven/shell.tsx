import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Trophy, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
const nav = [
  { to: "/", label: "Início" },
  { to: "/classificacao", label: "Classificação" },
  { to: "/jogos", label: "Jogos" },
  { to: "/rankings", label: "Rankings" },
  { to: "/jogadores", label: "Jogadores" },
  { to: "/times", label: "Times" },
] as const;
export function Wordmark() {
  return (
    <span className="wordmark">
      <span className="brand-symbol">7</span>SEVEN
      <span className="text-primary text-xs not-italic self-start mt-1">®</span>
    </span>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="container-seven site-header">
        <Link to="/" aria-label="SEVEN início">
          <Wordmark />
        </Link>
        <nav className="main-nav" aria-label="Navegação principal">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-season">
          <Trophy size={15} className="text-primary" />
          <span>
            {" "}
            TEMPORADA <strong>2026</strong>
          </span>
          <span className="live-dot" />
        </div>
        <Button
          className="menu-button"
          variant="ghost"
          size="icon"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </header>
      {open && (
        <nav className="container-seven mobile-nav" aria-label="Navegação mobile">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
      <div className="demo-strip">
        <FlaskConical size={10} /> Edição demonstrativa · Times, jogadores e resultados fictícios
      </div>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer container-seven">
      <Link to="/" className="footer-brand" aria-label="SEVEN início">
        <Wordmark />
      </Link>
      <div className="footer-copy">
        O jogo é de todos. A história é nossa.
        <br />© 2026 SEVEN · Ambiente demonstrativo, sem dados oficiais.
      </div>
    </footer>
  );
}
