import './PriceTable.css';

const DESTINO_PRECOS = [
  { destino: 'Sintra & Cascais', preco: '€120' },
  { destino: 'Lisboa & Setúbal', preco: '€110' },
  { destino: 'Alentejo (Évora, Monsaraz)', preco: '€140' },
  { destino: 'Algarve Autêntico', preco: '€160' },
  { destino: 'Centro (Fátima, Óbidos, Nazaré)', preco: '€130' },
];

export default function PriceTable() {
  return (
    <section className="price-table-section">
      <h2 className="price-table-title">Tabela de Preços</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th>Destino</th>
            <th>Preço (a partir de)</th>
          </tr>
        </thead>
        <tbody>
          {DESTINO_PRECOS.map((item, idx) => (
            <tr key={idx}>
              <td>{item.destino}</td>
              <td>{item.preco}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="price-table-note">Valores para tours privados até 4 pessoas. Consulte para grupos maiores ou roteiros personalizados.</p>
    </section>
  );
}
