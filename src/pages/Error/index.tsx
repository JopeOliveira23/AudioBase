import { useNavigate } from "react-router-dom";
import {Background, ImageWrapper, ErrorImage, Wifi} from "./styles"
import error from "../../assets/error.svg"

import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function Login() {
  const navigate = useNavigate();
  const handleReload = () => {
    //navigate("/");
    navigate(-1);
  }

  return (
    <Background>
      <Card title="Ocorreu um erro" style={{ width: "450px", textAlign: "center" }}>
        <p className="mt-0">
          Um erro inesperado ocorreu ao carregar os dados.
          <br />
          Recomendamos que você recarregue a página.
        </p>

        <ImageWrapper>
          <Wifi color="#fcfaf8" weight="bold" />
          <ErrorImage src={error} alt="" />
        </ImageWrapper>

        <p>
          Caso o problema persista, entre em contato com o suporte.
        </p>

        <Button
          label="Recarregar pagina"
          icon="pi pi-refresh"
          onClick={handleReload}
        />
      </Card>
    </Background>
  )
}