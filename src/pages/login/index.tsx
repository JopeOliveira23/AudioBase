import * as S from "./styles";
import { LoginForm } from "./loginForm";
import { useNavigate } from "react-router-dom";
import studio from "../../assets/studio.png";

export default function Login() {
  const navigate = useNavigate();

  return (
    <S.Background>
      <S.ImageBackground image={studio} />
      <S.Container>
        <S.TextBlock>
          <h2>Conecte-se à sua comunidade de áudio favorita</h2>
          <p>
            Faça login para acessar milhares de conteúdos exclusivos ou crie uma nova conta 
            para começar sua jornada musical conosco.
          </p>
          <S.InfoIcons>
            <div>
              <i className="pi pi-headphones" style={{ fontSize: '1.5rem', color: '#4a6fff' }} />
              <span>Biblioteca com +10K faixas</span>
            </div>
            <div>
              <i className="pi pi-users" style={{ fontSize: '1.5rem', color: '#4a6fff' }} />
              <span>Comunidade ativa</span>
            </div>
          </S.InfoIcons>
        </S.TextBlock>

        <LoginForm onLoginSuccess={() => navigate("/", { replace: true })} />
      </S.Container>
    </S.Background>

  );
}