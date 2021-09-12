-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-09-2021 a las 04:48:54
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_modelo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria_empleados`
--

CREATE TABLE `auditoria_empleados` (
  `usuario` varchar(255) NOT NULL,
  `rol` int(11) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `accion` varchar(255) NOT NULL,
  `terminal` varchar(255) NOT NULL,
  `idEmpleado` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `idTipoDoc` int(11) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `auditoria_empleados`
--

INSERT INTO `auditoria_empleados` (`usuario`, `rol`, `cargo`, `accion`, `terminal`, `idEmpleado`, `nombre`, `apellido`, `idTipoDoc`, `fecha`, `hora`) VALUES
('stefano.privileggi@gmail.com', 1, 'Administrador', 'ALTA', '192.168.0.5', 1, 'Stefano', 'Privileggi', 96, '2021-13-07', '15:59:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria_tipos_de_documentos`
--

CREATE TABLE `auditoria_tipos_de_documentos` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `terminal` varchar(255) NOT NULL,
  `accion` varchar(255) NOT NULL,
  `idTipoDoc` int(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria_usuarios`
--

CREATE TABLE `auditoria_usuarios` (
  `usuario` varchar(255) NOT NULL,
  `rol` int(11) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `terminal` varchar(255) NOT NULL,
  `accion` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `idTipoDoc` int(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `apellido`, `idTipoDoc`) VALUES
(1, 'Stefano', 'Privileggi', 96);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan_de_cuentas`
--

CREATE TABLE `plan_de_cuentas` (
  `codigo` varchar(255) NOT NULL,
  `id_padre` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `plan_de_cuentas`
--

INSERT INTO `plan_de_cuentas` (`codigo`, `id_padre`, `numero`, `nombre`, `tipo`) VALUES
('1', 0, 1, 'ACTIVO', 0),
('2', 0, 2, 'PASIVO', 0),
('1.01', 1, 3, 'ACTIVO CORRIENTE', 0),
('1.01.01', 3, 4, 'DISPONIBILIDADES', 0),
('1.01.01.01', 4, 5, 'Caja', 1),
('1.01.01.02', 4, 6, 'BANCOS', 0),
('2.01', 2, 7, 'PASIVO CORRIENTE', 0),
('1.01.01.02.01', 6, 8, 'Banco provincia c.c.', 1),
('1.01.01.02.02', 6, 9, 'Banco nación c. de ahorro', 1),
('1.01.01.02.03', 6, 10, 'Banco nación cuenta corriente', 1),
('1.01.01.03', 4, 12, 'Valores a depositar', 1),
('1.01.02', 3, 13, 'CUENTAS POR COBRAR', 0),
('1.01.02.01', 13, 14, 'Deudores en c.c', 1),
('1.01.02.02', 13, 15, 'Documentos a cobrar', 1),
('1.01.02.03', 13, 16, 'Iva crédito fiscal', 1),
('1.01.02.04', 13, 17, 'AFIP-IVA a favor', 1),
('1.01.02.05', 13, 18, 'CLIENTES-CUENTAS CORRIENTES', 1),
('1.01.03', 3, 19, 'BIENES DE CAMBIO', 0),
('1.01.03.01', 19, 20, 'Mercaderías', 1),
('1.01.04', 3, 21, 'INVERSIONES', 0),
('1.01.05', 3, 22, 'OTROS CRÉDITOS', 0),
('1.01.05.01', 22, 23, 'Socio 1 cuenta particular', 1),
('1.01.05.02', 22, 24, 'Socio 2 cuenta particular', 1),
('1.02', 1, 25, 'ACTIVO NO CORRIENTE', 0),
('1.02.01', 25, 26, 'BIENES DE USO', 0),
('1.02.01.01', 26, 27, 'Rodados', 1),
('1.02.01.02', 26, 28, 'Muebles y útiles', 1),
('2.01.01', 7, 29, 'DEUDAS', 0),
('2.01.01.01', 29, 30, 'Deudas comerciales', 0),
('2.01.01.01.01', 30, 31, 'Proveedores', 1),
('2.01.01.01.02', 30, 32, 'Obligaciones a pagar', 1),
('2.01.01.02', 29, 33, 'Deudas fiscales', 0),
('2.01.01.02.01', 33, 34, 'Iva débito fiscal', 1),
('2.01.01.02.02', 33, 35, 'Iva perc. no insc.', 1),
('2.01.01.02.03', 33, 36, 'Ingresos brutos a pagar', 1),
('2.01.01.02.04', 33, 37, 'Tasa Insp Segur e Hig a pagar', 1),
('2.01.01.02.05', 33, 38, 'AFIP-IVA a pagar', 1),
('2.01.01.03', 29, 39, 'DEUDAS LABORALES Y PREV.', 0),
('2.01.01.03.01', 39, 40, 'Sueldos a pagar', 1),
('2.01.01.03.02', 39, 41, 'DEUDAS POR CARGAS SOCIALES', 0),
('2.01.01.03.03', 39, 42, 'Cargas sociales a pagar', 1),
('2.01.01.04', 29, 43, 'Deudas bancarias', 0),
('2.02', 2, 44, 'PASIVO NO CORRIENTE', 0),
('3', 0, 45, 'PATRIMONIO NETO', 0),
('3.01', 45, 46, 'CAPITAL', 0),
('3.01.01', 46, 47, 'Capital social', 1),
('3.02', 45, 48, 'RESERVAS', 0),
('3.03', 45, 49, 'RESULTADOS ACUMULADOS', 0),
('3.03.01', 49, 50, 'Resultados del ej. anterior', 1),
('4', 0, 51, 'RESULTADO POSITIVO', 0),
('4.01', 51, 52, 'INGRESOS ORDINARIOS', 0),
('4.01.01', 52, 53, 'Ventas', 1),
('4.01.02', 52, 54, 'Intereses obtenidos', 1),
('4.01.03', 52, 55, 'Descuentos obtenidos', 1),
('4.01.04', 52, 56, 'Ingresos por serv. prestados', 1),
('4.01.05', 52, 57, 'Ingresos por fletes', 1),
('4.02', 51, 58, 'INGRESOS EXTRAORDINARIOS', 0),
('5', 0, 59, 'RESULTADOS NEGATIVOS', 0),
('5.01', 59, 60, 'GASTOS DE COMERCIALIZACIÓN', 0),
('5.01.01', 60, 61, 'Costo de venta', 1),
('5.02', 59, 62, 'GASTOS ADMINISTRATIVOS', 0),
('5.02.01', 62, 63, 'Impuestos nacionales', 1),
('5.02.02', 62, 64, 'Agua, luz y gas', 1),
('5.02.03', 62, 65, 'Teléfono', 1),
('5.02.04', 62, 66, 'Alquileres Cebidos', 1),
('5.02.05', 62, 67, 'Ingresos Brutos', 1),
('5.02.06', 62, 68, 'Tasa por Insp. Seg. e Hig.', 1),
('5.03', 59, 69, 'GASTOS EN PERSONAL', 0),
('5.03.01', 69, 70, 'Sueldos y jornales', 1),
('5.03.02', 69, 71, 'Cargas sociales', 1),
('5.04', 59, 72, 'GASTOS FINANCIEROS', 0),
('5.04.01', 72, 73, 'Intereses cedidos', 1),
('5.04.02', 72, 74, 'Descuentos cedidos', 1),
('5.04.03', 72, 75, 'Gastos bancarios', 1),
('5.05', 59, 76, 'OTROS GASTOS', 0),
('5.05.01', 76, 77, 'Fletes pagados', 1),
('5.05.02', 76, 78, 'Conservación y mantenimiento', 1),
('1.01.05.06', 3, 79, 'Esto es una prueba', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `rol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(0, 'Desarrollador'),
(1, 'Administrador'),
(2, 'Supervisor'),
(3, 'Auditor'),
(4, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposdocumento`
--

CREATE TABLE `tiposdocumento` (
  `id` int(150) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tiposdocumento`
--

INSERT INTO `tiposdocumento` (`id`, `descripcion`) VALUES
(0, 'CI CAPITAL FEDERAL'),
(1, 'CI BUENOS AIRES'),
(2, 'CI CATAMARCA'),
(3, 'CI CORDOBA'),
(4, 'CI CORRIENTES'),
(5, 'CI ENTRE RIOS'),
(6, 'CI JUJUY'),
(7, 'CI MENDOZA'),
(8, 'CI LA RIOJA'),
(9, 'CI SALTA'),
(10, 'CI SAN JUAN'),
(11, 'CI SAN LUIS'),
(12, 'CI SANTA FE'),
(13, 'CI SGO DEL ESTERO'),
(14, 'CI TUCUMAN'),
(16, 'CI CHACO'),
(17, 'CI CHUBUT'),
(18, 'CI FORMOSA'),
(19, 'CI MISIONES'),
(20, 'CI NEUQUEN'),
(21, 'CI LA PAMPA'),
(22, 'CI RIO NEGRO'),
(23, 'CI SANTA CRUZ'),
(24, 'CI TIERRA DEL FUEGO'),
(80, 'CUIT'),
(86, 'CUIL'),
(87, 'CDI'),
(89, 'LIBRETA DE ENROLAMIENTO'),
(90, 'LIBRETA CIVICA'),
(91, 'CI EXTRANJERA'),
(92, 'EN TRAMITE'),
(93, 'ACTA DE NACIMIENTO'),
(94, 'PASAPORTE'),
(95, 'CI BS AS R N P'),
(96, 'DNI'),
(99, 'SIN IDENTIFICAR / VENTA GLOBAL DIARIA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`email`, `nombre`, `apellido`, `contraseña`, `idRol`) VALUES
('s@gmail.com', 'S', 'P', '$2a$08$H7iVW4PvqISyYfZMAVbYcOeI2qUd1Oa0ZhEvezQ8KvPiKoHDwf6/O', 1),
('stefano.privileggi@gmail.com', 'Stefano', 'Privileggi', '$2a$08$C7ME4HbnAzg9TSnWkQdPMO6zW4yT0.P765T8njsaLiQw0BM9plX1C', 1),
('stefano.privileggi@hotmail.com', 'Stefano', 'Privileggi', '$2a$08$PAZTmQ.9FVQ.LqoF/PjUButpVQsr1VDgH7PgR3RgCFpkLcgIhLgdK', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idTipoDoc` (`idTipoDoc`);

--
-- Indices de la tabla `plan_de_cuentas`
--
ALTER TABLE `plan_de_cuentas`
  ADD PRIMARY KEY (`numero`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiposdocumento`
--
ALTER TABLE `tiposdocumento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`),
  ADD KEY `idRol` (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `plan_de_cuentas`
--
ALTER TABLE `plan_de_cuentas`
  MODIFY `numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idTipoDoc`) REFERENCES `tiposdocumento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
