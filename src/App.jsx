import React, { useState, useEffect } from 'react';
import './App.css';
import image from './assets/bg-cafe.jpg';
import estrella1 from './assets/Star_fill.svg';
import estrella2 from './assets/Star.svg';

function App() {
  const [colorBotones, setColorBotones] = useState({ boton2: '#6e7c80', boton3: '#1B1D1F' });
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [productosMostrados, setProductosMostrados] = useState([]);
  const [mostrarDisponibles, setMostrarDisponibles] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setProductosOriginales(data);
        setProductosMostrados(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const alternarColoresBotones = () => {
    const nuevosColores = { boton2: colorBotones.boton3, boton3: colorBotones.boton2 };
    setColorBotones(nuevosColores);
    setMostrarDisponibles(!mostrarDisponibles);
    if (!mostrarDisponibles) {
      setProductosMostrados(productosOriginales);
    } else {
      setProductosMostrados(productosOriginales.filter(producto => producto.available));
    }
  };

  return (
    <div className='primera_caja'>
      <img src={image} className="caffe_imagen" alt="Coffe img" />
      <div className='segunda_caja'>
        <div className='contenedor_de_texto imagen_titulo'>
          <h1 className='titulo1'>
            Our collection
          </h1>
          <p className='texto1'>Introducing our Coffee Collection, a selection of unique coffees <br />
            from different roast types and origins, expertly roasted in small <br />
            batches and shipped fresh weekly.
          </p>
        </div>
        <div className='tercera_caja'>
          <div className='cuarta_caja'>
            <div className="boton1">
              <button
                className="boton2"
                style={{ backgroundColor: colorBotones.boton2 }}
                onClick={alternarColoresBotones}
              >
                All Products
              </button>
              <button
                className="boton3"
                style={{ backgroundColor: colorBotones.boton3 }}
                onClick={alternarColoresBotones}
              >
                Available Now
              </button>
            </div>
          </div>
          <div className='quinta_caja' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', position: 'relative' }}>
            {productosMostrados.map((producto) => (
              <div key={producto.id} className='productos'>
                {!producto.available && !mostrarDisponibles && <div style={{ height: '140px' }}></div>}
                {producto.available || mostrarDisponibles ? (
                  <>
                    <img src={producto.image} className='imagen_producto' />
                    {(producto.name === 'Cappuccino' || producto.name === 'House Coffee') && producto.popular && (
                      <p className='popular_producto' style={{ position: 'absolute', top: '2%', left: '5%', transform: 'translate(-50%, -50%)', zIndex: '2' }}>
                        {producto.popular} Popular
                      </p>

                    )}
                    <p className='popular_producto' style={{ position: 'absolute', top: '2%', left: '39%', transform: 'translate(-50%, -50%)', zIndex: '2' }}>
                    {producto.popular} Popular
                    
                  </p>
                    <div className='flexs1'>
                      <span className='nombre_producto'>{producto.name}</span>
                      <button className='precio_producto'>{producto.price}</button>
                    </div>
                    <div className='flexs2'>
                      {producto.rating > 1 ? (
                        <img src={estrella1} className='estrella1'/>
                      ) : (
                        <img src={estrella2} className='estrella2'/>
                      )}
                      <p className='puntaje'>{producto.rating}</p>
                      {producto.votes ? <p className='votos'>({producto.votes} votes)</p> : <p className='votos'>No ratings</p>}
                      <p className='available'>{!producto.available ? 'Sould out' : ' '}</p>
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

