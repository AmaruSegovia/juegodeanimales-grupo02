import React, { useState } from 'react';
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';

function Inicio() {
    const [nombreJugador1, setNombreJugador1] = useState('');
    const [nombreJugador2, setNombreJugador2] = useState('');
    const [mostrarJuego, setMostrarJuego] = useState(false);
    const [puntajeJugador1, setPuntajeJugador1] = useState(0);
    const [puntajeJugador2, setPuntajeJugador2] = useState(0);
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);
    const [rondaActual, setRondaActual] = useState(1);
    const [jugadorActual, setJugadorActual] = useState(1);

    const manejarClickJugar = () => {
        setMostrarJuego(true);
    };

    const alTerminar = (puntaje) => {
        if (jugadorActual === 1) {
            setPuntajeJugador1(puntaje);
        } else {
            setPuntajeJugador2(puntaje);
        }

        if (jugadorActual === 2) {
            setRondaActual(rondaActual + 1);
        }

        if (rondaActual > 3) {
            setMostrarFelicitaciones(true);
        }
    };

    return (
        <div>
            {mostrarJuego ? (
                <Juego
                    nombreJugador={jugadorActual === 1 ? nombreJugador1 : nombreJugador2}
                    puntaje={jugadorActual === 1 ? puntajeJugador1 : puntajeJugador2}
                    setPuntaje={jugadorActual === 1 ? setPuntajeJugador1 : setPuntajeJugador2}
                    alTerminar={alTerminar}
                    rondaActual={rondaActual}
                    setRondaActual={setRondaActual}
                    jugadorActual={jugadorActual}
                    setJugadorActual={setJugadorActual}
                />
            ) : (
                <div>
                    <h1>Player 1, enter your name</h1>
                    <input
                        type="text"
                        placeholder="Your name here"
                        onChange={(e) => setNombreJugador1(e.target.value)}
                    />
                    <h1>Player 2, enter your name</h1>
                    <input
                        type="text"
                        placeholder="Your name here"
                        onChange={(e) => setNombreJugador2(e.target.value)}
                    />
                    <button onClick={manejarClickJugar}>Play</button>
                </div>
            )}
            {mostrarFelicitaciones && (
                <div>
                    <Felicitaciones nombreJugador={nombreJugador1} puntaje={puntajeJugador1} jugador="1" />
                    <Felicitaciones nombreJugador={nombreJugador2} puntaje={puntajeJugador2} jugador="2" />
                </div>
            )}
        </div>
    );
}

export default Inicio;