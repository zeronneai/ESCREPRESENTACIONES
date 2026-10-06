// Marca visual para datos que el cliente debe confirmar.
export function Pending({ label = "PENDIENTE" }: { label?: string }) {
  return <span className="pending" title="Dato por confirmar con El Sauz">{label}</span>;
}
