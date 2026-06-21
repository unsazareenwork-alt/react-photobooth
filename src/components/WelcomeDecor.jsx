export default function WelcomeDecor({ onTryItOut }) {
  const stickerSpots = [
    { emoji: "", top: "12%", left: "10%", rot: -12 },
    { emoji: "", top: "18%", left: "84%", rot: 10 },
    { emoji: "", top: "70%", left: "12%", rot: 8 },
    { emoji: "", top: "76%", left: "82%", rot: -8 },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Using your dark red background from image_a3ba22.jpg
        background: "#4a0404", 
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-10deg); }
          50% { transform: translateY(-20px) rotate(-10deg); }
        }
        @keyframes floatRight {
          0%, 100% { transform: translateY(0px) rotate(10deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .strip-left { animation: float 3s ease-in-out infinite; }
        .strip-right { animation: floatRight 3s ease-in-out infinite; }
      `}</style>

 
      <img src="/strip1.png" className="strip-left" style={{ position: "absolute", left: "10%", top: "25%", width: "200px" }} />
      <img src="/strip2.png" className="strip-right" style={{ position: "absolute", right: "10%", top: "25%", width: "200px" }} />

      
      <div style={{ position: "relative" }}>
        {/* White Tape */}
        <div
          style={{
            position: "absolute",
            top: "-25px",
            left: "50%",
            transform: "translateX(-50%) rotate(-2deg)",
            width: "80px",
            height: "25px",
            background: "#ffffff",
            boxShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            zIndex: 2,
          }}
        />

        <div
          style={{
            background: "#ffffff", // Changed to White
            border: "2px solid #000000",
            boxShadow: "6px 6px 0 #000000",
            padding: "40px 36px",
            width: 340,
            textAlign: "center",
            zIndex: 1,
            color: "#000000", // Text color black for readability on white
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.12em", opacity: 0.6, marginBottom: 14 }}>
             WELCOME TO 
          </div>
          <div
            style={{
              display: "inline-block",
              transform: "rotate(-2deg)",
              border: "3px solid #e11d48",
              color: "#e11d48",
              padding: "8px 20px",
              fontWeight: 700,
              fontSize: 26,
            }}
          >
            Korean Photobooth!
          </div>
          <p style={{ fontSize: 11.5, marginTop: 18, opacity: 0.8 }}>
            cute frames · sweet poses<br />memories you can hold
          </p>

          <button
            onClick={onTryItOut}
            style={{
              marginTop: 26,
              width: "100%",
              padding: "14px",
              border: "2px solid #ffffff",
              background: "#e11d48",
              color: "#ffffff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try it out!
          </button>
        </div>
      </div>
    </div>
  );
}