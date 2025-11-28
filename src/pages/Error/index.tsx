
import {Background, Button, Card, IconWrapper, Text, Title, Wifi} from "./styles"

import error from "../../assets/error.svg"

export function ErrorPage() {

  const handleReload = () => {

  }

  return (
    <Background>
      <Card>
        <Title>Ocorreu um erro</Title>
        <Text>Um erro inesperado ocorreu ao carregar os dados.</Text>
        <Text>Recomendamos que você recarregue a página.</Text>
        <Wifi size={60} color="#fcfaf8" weight="bold" />
        <img src={error} alt="" />
        <Text>Caso o problema persista, entre em contato com o suporte.</Text>
        <Button onClick={handleReload}>
          <IconWrapper size={15} color="#f0f0f0" weight="bold" />
          Recarregar a página
        </Button>
      </Card>
    </Background>
  )
}