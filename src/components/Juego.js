import React, { useState, useEffect } from 'react';
import animales1 from '../data/animales.json';
import './Estilo.css';

function Juego({ nombreJugador, puntaje, setPuntaje, alTerminar, rondaActual, setRondaActual, rondasTotales, setRondasTotales, jugadorActual, setJugadorActual }) {
    
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

    const seUsaIf = () => {
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
        <div className="juego-container">
            <h1 className="juego-title">{nombreJugador}, Can you guess this animal?</h1>
            <p className="round-number">Round Number: {rondaAreglo}</p>
            <img src={`img/${animalObjetivo}.png`} alt={animalObjetivo} className="animal-image" />
            <div className="opciones-container">
                {opciones.map((animal) => (
                    <button
                        key={animal}
                        onClick={() => verificarRespuesta(animal)}
                        disabled={!puedeHacerClic || opcionesDeshabilitadas}
                        className="opcion-button"
                    >
                        {animal}
                    </button>
                ))}
            </div>
            {esCorrecto === true && <p className="correct-message">Correct!</p>}
            {esCorrecto === false && <p className="incorrect-message">Incorrect!</p>} 
            <button onClick={siguienteRonda} disabled={puedeHacerClic || !opcionesDeshabilitadas} className="next-button">Next question {"->"}</button>
        </div>
    );
}

export default Juego;
