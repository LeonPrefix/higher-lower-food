export function Background() {
  return (
    <div
      className="w-full h-screen fixed"
      style={{
        background: 'url("/background.jpg")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        filter: "saturate(80%) brightness(50%)",
        zIndex: -1,
      }}
    />
  );
}
