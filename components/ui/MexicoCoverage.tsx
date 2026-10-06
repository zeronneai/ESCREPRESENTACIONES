// Mapa de cobertura en cuadrícula (tile map): un mosaico por estado en posición aproximada.
// Es legible en móvil, accesible y no depende de librerías de mapas.
const TILES: [string, string, number, number][] = [
  ["BC", "Baja California", 0, 0], ["SON", "Sonora", 1, 0], ["CHIH", "Chihuahua", 2, 0], ["COAH", "Coahuila", 3, 0], ["NL", "Nuevo León", 4, 0],
  ["BCS", "Baja California Sur", 0, 1], ["SIN", "Sinaloa", 1, 1], ["DGO", "Durango", 2, 1], ["ZAC", "Zacatecas", 3, 1], ["SLP", "San Luis Potosí", 4, 1], ["TAM", "Tamaulipas", 5, 1],
  ["NAY", "Nayarit", 2, 2], ["JAL", "Jalisco", 3, 2], ["AGS", "Aguascalientes", 4, 2], ["GTO", "Guanajuato", 5, 2], ["QRO", "Querétaro", 6, 2], ["HGO", "Hidalgo", 7, 2],
  ["COL", "Colima", 3, 3], ["MICH", "Michoacán", 4, 3], ["MEX", "Estado de México", 5, 3], ["CDMX", "Ciudad de México", 6, 3], ["TLAX", "Tlaxcala", 7, 3], ["VER", "Veracruz", 8, 3],
  ["GRO", "Guerrero", 5, 4], ["MOR", "Morelos", 6, 4], ["PUE", "Puebla", 7, 4], ["OAX", "Oaxaca", 8, 4], ["TAB", "Tabasco", 9, 4], ["CAM", "Campeche", 10, 4], ["YUC", "Yucatán", 11, 4],
  ["CHIS", "Chiapas", 9, 5], ["QROO", "Quintana Roo", 11, 5],
];

export function MexicoCoverage({ hq = "CHIH" }: { hq?: string }) {
  const S = 58;
  const G = 6;
  return (
    <figure>
      <svg viewBox={`0 0 ${12 * (S + G)} ${6 * (S + G)}`} className="h-auto w-full" role="img" aria-labelledby="mx-title mx-desc">
        <title id="mx-title">Cobertura en los 32 estados de México</title>
        <desc id="mx-desc">Mapa en mosaicos con los 32 estados. La oficina central está en Chihuahua.</desc>
        {TILES.map(([abbr, name, x, y]) => {
          const isHq = abbr === hq;
          return (
            <g key={abbr} transform={`translate(${x * (S + G)} ${y * (S + G)})`}>
              <title>{`${name}${isHq ? " (oficina central)" : ""}`}</title>
              <rect width={S} height={S} rx="10" fill={isHq ? "#B93F05" : "#004DA2"} opacity={isHq ? 1 : 0.88} />
              <text x={S / 2} y={S / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">{abbr}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-accent-700" /> Oficina central y almacén</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-brand-600" /> Estados con cobertura de envío</span>
      </figcaption>
    </figure>
  );
}
