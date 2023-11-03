import React, { useState, useEffect } from 'react';
import animales1 from '../data/animales.json';

function Juego({ nombreJugador, puntaje, setPuntaje, alTerminar, rondaActual, setRondaActual,rondasTotales,setRondasTotales, jugadorActual, setJugadorActual }) {
    
    const [rondaAreglo, setRondaAreglo] = useState(1);
    const [animalObjetivo, setAnimalObjetivo] = useState('');
    const [opciones, setOpciones] = useState([]);
    const [esCorrecto, setEsCorrecto] = useState(null);
    const [puedeHacerClic, setPuedeHacerClic] = useState(true);
   

    const obtenerAnimalAleatorio = () => {
        const animales = animales1.animales; 
        const indiceAleatorio = Math.floor(Math.random() * animales.length);
        return animales[indiceAleatorio];
    };

    const obtenerOpcionesAleatorias = () => {
        const animalCorrecto = obtenerAnimalAleatorio();
        let opcionesAleatorias = [animalCorrecto];

        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio();
            if (!opcionesAleatorias.includes(opcion)) {
                opcionesAleatorias.push(opcion);
            }
        }

        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

        setOpciones(opcionesAleatorias);
        setAnimalObjetivo(animalCorrecto);
    };

    const verificarRespuesta = (animalSeleccionado) => {
        if (animalSeleccionado === animalObjetivo) {
            setEsCorrecto(true);
            setPuntaje(puntaje + 1);
        } else {
            setEsCorrecto(false);
        }
        setPuedeHacerClic(false);
    };
    const seUsaIf = () =>{

        if (jugadorActual === 1) {
            setRondaActual(rondaActual + 1);
           
        }
    }

    const siguienteRonda = () => {
        if (rondaActual <= rondasTotales) {
            if(jugadorActual === 2){
                setRondaAreglo(rondaAreglo + 1);
            }
            setEsCorrecto(null);
            setPuedeHacerClic(true);
            obtenerOpcionesAleatorias();
            seUsaIf();
            setJugadorActual(jugadorActual === 1 ? 2 : 1);
        } else {
            alTerminar(puntaje);
        }
    }

    const opcionesDeshabilitadas = esCorrecto !== null;

    useEffect(() => {
        obtenerOpcionesAleatorias();
    }, []);

    return (
        <div>
            <h1>{nombreJugador}, Can you guess this animal?</h1>
            <p>Round Number: {rondaAreglo}</p>
            <img src={`img/${animalObjetivo}.png`} alt={animalObjetivo} />
            <div>
                {opciones.map((animal) => (
                    <button
                        key={animal}
                        onClick={() => verificarRespuesta(animal)}
                        disabled={!puedeHacerClic || opcionesDeshabilitadas}
                    >
                        {animal}
                    </button>
                ))}
            </div>
            {esCorrecto === true && <p>Correct!</p>}
            {esCorrecto === false && <p>Incorrect!</p>} 
            <button onClick={siguienteRonda} disabled={puedeHacerClic || !opcionesDeshabilitadas}>Next question {"->"}</button>
        </div>
    );
}

export default Juego;

