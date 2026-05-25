export default function Icon({ name, fill = false, size = 24, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
      }}
    >
      {name}
    </span>
  );
}
