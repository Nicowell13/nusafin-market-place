import Link from "next/link";
const fish = [
  { name:"Betta Halfmoon", loc:"Jakarta · Grade A", price:"US$ 18", emoji:"🐠" },
  { name:"Discus Red Melon", loc:"Tangerang · Grade A", price:"US$ 42", emoji:"🐡" },
  { name:"Koi Kohaku", loc:"Blitar · Grade A", price:"US$ 65", emoji:"🎏" },
];
export default function Page() {
  return (
    <main className="appShell">
      <header className="appTop">
        <Link className="brand" href="/app">Nusa<span>Fin</span></Link>
        <Link className="button small" href="/app/checkout">Cart · 3 farmers</Link>
      </header>
      <p className="eyebrow">VERIFIED CATALOG</p>
      <h2 style={{fontSize:"38px",letterSpacing:"-1.5px",margin:"8px 0 32px"}}>Ornamental fish from Indonesia.</h2>
      <div className="appGrid">
        {fish.map(f => (
          <article className="appCard" key={f.name} style={{textAlign:"center"}}>
            <div style={{fontSize:"52px",margin:"8px 0 16px"}}>{f.emoji}</div>
            <h3 style={{marginBottom:"6px"}}>{f.name}</h3>
            <p style={{fontSize:"13px",marginBottom:"16px"}}>{f.loc}</p>
            <b style={{display:"block",marginBottom:"16px"}}>{f.price}</b>
            <button className="button small" style={{width:"100%"}}>Add to cart</button>
          </article>
        ))}
      </div>
    </main>
  );
}
