import Image from "next/image";

// El logo ya viene sin fondo (PNG transparente, recortado ajustado).
// Se muestra tal cual, sin marco ni círculo: `size` controla la altura en px
// y el ancho se ajusta solo, respetando la proporción real (697x734).
export default function Logo({ size = 56, className = "", priority = false }) {
  return (
    <Image
      src="/logo.png"
      alt="Ora Store"
      width={697}
      height={734}
      priority={priority}
      className={className}
      style={{ height: size, width: "auto" }}
    />
  );
}
