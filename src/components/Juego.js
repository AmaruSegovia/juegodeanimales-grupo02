import React, { useState, useEffect } from 'react';
import animales1 from '../data/animales.json';

function Juego({ nombreJugador, puntaje, setPuntaje, alTerminar, rondaActual, setRondaActual, jugadorActual, setJugadorActual }) {
    
    const [animalObjetivo, setAnimalObjetivo] = useState('');
    const [opciones, setOpciones] = useState([]);
    const [esCorrecto, setEsCorrecto] = useState(null);
    const [rondasTotales, setRondasTotales] = useState(Math.floor(Math.random() * 6) + 5);
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

    const siguienteRonda = () => {
        if (rondaActual < rondasTotales) {
            if (jugadorActual == 2){
                setRondaActual(rondaActual + 1);
            }
            setEsCorrecto(null);
            setPuedeHacerClic(true);
            setJugadorActual(jugadorActual === 1 ? 2 : 1);
            obtenerOpcionesAleatorias();
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
            <p>Round Number: {rondaActual}</p>
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

