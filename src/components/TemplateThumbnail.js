function TemplateThumbnail({ children }) {
  return (
    <div className="relative w-full h-56 bg-gray-100 rounded-xl overflow-hidden shadow-inner border">

      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          transform: "scale(0.25)",
          width: "794px",
          height: "1123px"
        }}
      >
        {children}
      </div>

    </div>
  );
}

export default TemplateThumbnail;