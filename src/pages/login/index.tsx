import * as S from "./styles";
import { LoginForm } from "./loginForm";
import { useNavigate } from "react-router-dom";
import studio from "../../assets/studio.png";
import { RegisterDialog } from "./registerDialog/RegisterDialog";
import { useState, useRef, useEffect } from "react";
import { slides } from "./interface";


export default function Login() {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  // useRef para guardar a função clearLoginForm exposta pelo LoginForm
  const clearLoginRef = useRef<null | (() => void)>(null);

const TextBlockRotator = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const autoplayRef = useRef<number | null>(null);

  const slide = slides[index];

  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }

    autoplayRef.current = window.setTimeout(() => {
      changeSlide("next");
    }, 10000);
  };

  const changeSlide = (type: "next" | "prev") => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }

    setDirection(type);
    setVisible(false);

    setTimeout(() => {
      setIndex((prev) => {
        if (type === "next") return (prev + 1) % slides.length;
        return (prev - 1 + slides.length) % slides.length;
      });

      setVisible(true);
      startAutoplay(); // 🔥 reinicia o tempo após mudar o slide
    }, 500);
  };

  useEffect(() => {
    startAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, []);

  return (
    <S.Container>
      <S.GlassButton
        rounded
        severity="secondary"
        icon="pi pi-chevron-left"
        onClick={() => changeSlide("prev")}
      />

        <S.CardGlass>
          <div
            className={`content ${
              visible ? `fade-in ${direction}` : `fade-out ${direction}`
            }`}
          >
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          
            <S.InfoIcons>
              {slide.icons.map((item, i) => (
                <div key={i}>
                  <i className={item.icon} />
                  <span>{item.label}</span>
                </div>
              ))}
            </S.InfoIcons>
          </div>
        </S.CardGlass>
            
      <S.GlassButton
        rounded
        severity="secondary"
        icon="pi pi-chevron-right"
        onClick={() => changeSlide("next")}
      />
    </S.Container>
  );
};


  return (
    <S.Background>
      <S.ImageBackground image={studio} />
      <S.Main>
        <TextBlockRotator />

        <LoginForm
          onLoginSuccess={() => navigate("/", { replace: true })}
          onOpenRegister={() => setShowRegister(true)}
          provideClear={({ clearLoginForm }) => {
            // o LoginForm "me entrega" a função clearLoginForm e eu guardo no ref
            clearLoginRef.current = clearLoginForm;
          }}
        />
      </S.Main>

      <RegisterDialog
        visible={showRegister}
        onHide={() => setShowRegister(false)}
        onSuccess={() => {
          // quando a dialog avisa sucesso, eu chamo a função exposta pelo LoginForm
          clearLoginRef.current?.();
          // fechar a modal já é feito dentro do RegisterDialog (onHide é chamado lá)
        }}
      />
    </S.Background>
  );
}
