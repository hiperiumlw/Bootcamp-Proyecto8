-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Temps de generació: 10-04-2018 a les 16:46:26
-- Versió del servidor: 10.1.30-MariaDB
-- Versió de PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE DATABASE IF NOT EXISTS travel_agency CHARACTER SET Latin1 COLLATE latin1_spanish_ci;
USE travel_agency;

--
-- Base de dades: `travel_agency`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `usuario` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `email` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `password` varchar(80) COLLATE latin1_spanish_ci NOT NULL,
  `hash` varchar(80) COLLATE latin1_spanish_ci DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Bolcant dades de la taula `cliente`
--

INSERT INTO `cliente` (`id`, `usuario`, `email`, `password`, `hash`, `isAdmin`) VALUES
(14, 'admin', 'admin@gmail.com', '123', '$2a$10$IY7a.iHGZUT8NkMskX9QKOBaV4w4FjGxyuhzsJ2mKg1Rv4hSMXRuC', 1);

-- --------------------------------------------------------

--
-- Estructura de la taula `destinos`
--

CREATE TABLE `destinos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE latin1_spanish_ci NOT NULL,
  `titulo_descr` varchar(40) COLLATE latin1_spanish_ci NOT NULL,
  `tipo` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `oferta` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `precio` float NOT NULL,
  `plazas` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `imagen` varchar(30) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Bolcant dades de la taula `destinos`
--

INSERT INTO `destinos` (`id`, `nombre`, `titulo_descr`, `tipo`, `oferta`, `precio`, `plazas`, `activo`, `imagen`) VALUES
(1, 'Malta', 'Malta al completo', 'Estancia', 'Vuelo + Alojamiento + 4 Desayunos + Guía Turistica', 799, 15, 1, '/images/malta.jpg'),
(2, 'London', 'London visita guiada', 'Estancia y Vuelo', 'Vuelo + Alojamiento + 4 Desayunos + Guía Turistica', 500, 7, 1, '/images/london.jpg'),
(3, 'Dublin', 'Conoce los mejores lugares de Dublin', 'Visita guiada', 'Vuelo + Alojamiento + 4 Desayunos + Guía Turistica', 720, 8, 1, '/images/dublin.jpg'),
(4, 'Paris', 'Paris, la ciudad bella de Francia', 'Estancia + Vuelo', 'Vuelo + Alojamiento + 4 Desayunos + Guía Turistica', 1175, 12, 1, '/images/paris.jpg'),
(5, 'Amsterdam', '¿Quieres conocer Amsterdam? Reserva hoy!', 'Estancia', 'Vuelo + Alojamiento + 4 Desayunos + Guía Turistica', 820, 8, 1, '/images/amsterdam.jpg'),
(6, 'Roma', 'Italia, el pais de la comida', 'Estancia', 'Vuelo + Alojamiento + 4 Desayunos + Guía Turistica', 777, 19, 1, '/images/roma.jpg'),
(7, 'Azores', 'Azores, isla de Terceira', 'Vuelo + Alojamiento + Traslado', '8 dias - 7 noches', 995, 22, 0, '/images/azores.jpg'),
(8, 'Tenerife', 'La isla de Tenerife', 'Estancia', 'Vuelo + Alojamiento + Todo Incluido', 859, 15, 0, '/images/tenerife.jpg'),
(9, 'NuevaYork', 'Nueva York : Vuelo + Hotel', 'Estancia', 'Vuelo + Estancia 9 noches en Hotel de 5 estrellas', 1100, 19, 0, '/images/nuevayork.jpg');

-- --------------------------------------------------------

--
-- Estructura de la taula `viajes`
--

CREATE TABLE `viajes` (
  `id` int(11) NOT NULL,
  `fecha_ida` varchar(10) COLLATE latin1_spanish_ci NOT NULL,
  `hora_ida` time NOT NULL,
  `fecha_vuelta` varchar(10) COLLATE latin1_spanish_ci NOT NULL,
  `hora_vuelta` time NOT NULL,
  `aeropuerto` varchar(30) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Bolcant dades de la taula `viajes`
--

INSERT INTO `viajes` (`id`, `fecha_ida`, `hora_ida`, `fecha_vuelta`, `hora_vuelta`, `aeropuerto`) VALUES
(1, '2018-05-07', '10:20:00', '2018-05-14', '07:00:00', 'Valencia'),
(2, '2018-05-20', '07:31:00', '2018-05-30', '14:18:00', 'Valencia'),
(3, '2018-05-25', '18:00:00', '2018-05-29', '15:00:00', 'Valencia'),
(4, '2018-06-25', '12:00:00', '2018-06-29', '12:00:00', 'Valencia'),
(5, '2018-05-17', '09:00:00', '2018-05-29', '15:00:00', 'Valencia'),
(6, '2018-05-13', '22:00:00', '2018-05-27', '23:00:00', 'Valencia'),
(7, '2018-05-30', '18:00:00', '2018-06-05', '15:00:00', 'Valencia'),
(8, '2018-06-28', '20:00:00', '2018-06-29', '12:00:00', 'Valencia'),
(9, '2018-06-25', '19:00:00', '2018-06-29', '23:00:00', 'Valencia');

--
-- Indexos per taules bolcades
--

--
-- Index de la taula `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Index de la taula `destinos`
--
ALTER TABLE `destinos`
  ADD PRIMARY KEY (`id`);

--
-- Index de la taula `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT per la taula `destinos`
--
ALTER TABLE `destinos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la taula `viajes`
--
ALTER TABLE `viajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
