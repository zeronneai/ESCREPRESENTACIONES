import {
  Zap, Sparkles, Shirt, HardHat, Hammer, Hand, Wrench, Brush, HeartPulse, Footprints, Layers, SprayCan,
  Cpu, Car, Stethoscope, Plane, FlaskConical, UtensilsCrossed, Package, type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Zap, Sparkles, Shirt, HardHat, Hammer, Hand, Wrench, Brush, HeartPulse, Footprints, Layers, SprayCan,
  Cpu, Car, Stethoscope, Plane, FlaskConical, UtensilsCrossed,
};

export function Icon({ name, className, strokeWidth = 1.6 }: { name: string; className?: string; strokeWidth?: number }) {
  const C = ICONS[name] ?? Package;
  return <C className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
