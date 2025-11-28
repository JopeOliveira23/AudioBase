import { Button } from "primereact/button";
import { Card } from "primereact/card";
import CarouselComponent from "../components/Carousel";

const Home = () => {

  return (
    <>
      <div className="surface-ground p-5">
        {/* Secção de destaques */}
        <div className="grid">
          {[1,2,3,4,5,6].map(i => (
            <div className="col-12 sm:col-6 md:col-4 lg:col-3" key={i}>
              <Card title={`Produto ${i}`} className="h-full">
                <p>Descrição do produto {i}...</p>
                <Button label="Comprar" icon="pi pi-shopping-cart" />
              </Card>
            </div>
          ))}
        </div>
        
        {/* Banner grande tipo Shopee / Mercado Livre */}
        <CarouselComponent />
        {/* Secção 2 */}
        <h2 className="mt-5 mb-3">Mais recomendados</h2>
        <div className="grid">
          {[1,2,3,4].map(i => (
            <div className="col-12 sm:col-6 md:col-3" key={i}>
              <Card title={`Item ${i}`} className="h-full">
                <p>Outro produto top.</p>
                <Button label="Ver mais" text />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;