/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: auditoria_empleados
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `auditoria_empleados` (
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: auditoria_tipos_de_documentos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `auditoria_tipos_de_documentos` (
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: auditoria_usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `auditoria_usuarios` (
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: datos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `datos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `id_administrador` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 99 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: empleados
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `empleados` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `idTipoDoc` int(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idTipoDoc` (`idTipoDoc`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idTipoDoc`) REFERENCES `tiposdocumento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: roles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `rol` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tiposdocumento
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tiposdocumento` (
  `id` int(150) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuarios` (
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `idRol` int(11) NOT NULL,
  PRIMARY KEY (`email`),
  KEY `idRol` (`idRol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: auditoria_empleados
# ------------------------------------------------------------

INSERT INTO
  `auditoria_empleados` (
    `usuario`,
    `rol`,
    `cargo`,
    `accion`,
    `terminal`,
    `idEmpleado`,
    `nombre`,
    `apellido`,
    `idTipoDoc`,
    `fecha`,
    `hora`
  )
VALUES
  (
    'usuario1@gmail.com',
    4,
    'Usuario',
    'ALTA',
    '192.168.0.5',
    1,
    'Matias',
    'Rodriguez',
    55,
    '2021-14-07',
    '21:15:16'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: auditoria_tipos_de_documentos
# ------------------------------------------------------------

INSERT INTO
  `auditoria_tipos_de_documentos` (
    `id`,
    `usuario`,
    `rol`,
    `cargo`,
    `terminal`,
    `accion`,
    `idTipoDoc`,
    `descripcion`,
    `fecha`,
    `hora`
  )
VALUES
  (
    0,
    'usuario1@gmail.com',
    '4',
    'Usuario',
    '192.168.0.5',
    'ALTA',
    55,
    'Cincuenta y cinco',
    '2021-14-07',
    '21:14:34'
  );
INSERT INTO
  `auditoria_tipos_de_documentos` (
    `id`,
    `usuario`,
    `rol`,
    `cargo`,
    `terminal`,
    `accion`,
    `idTipoDoc`,
    `descripcion`,
    `fecha`,
    `hora`
  )
VALUES
  (
    0,
    'usuario1@gmail.com',
    '4',
    'Usuario',
    '192.168.0.5',
    'BAJA',
    55,
    'Cincuenta y cinco',
    '2021-14-07',
    '21:15:48'
  );
INSERT INTO
  `auditoria_tipos_de_documentos` (
    `id`,
    `usuario`,
    `rol`,
    `cargo`,
    `terminal`,
    `accion`,
    `idTipoDoc`,
    `descripcion`,
    `fecha`,
    `hora`
  )
VALUES
  (
    0,
    'usuario1@gmail.com',
    '4',
    'Usuario',
    '192.168.0.5',
    'BAJA',
    55,
    'Cincuenta y cinco',
    '2021-14-07',
    '21:21:29'
  );
INSERT INTO
  `auditoria_tipos_de_documentos` (
    `id`,
    `usuario`,
    `rol`,
    `cargo`,
    `terminal`,
    `accion`,
    `idTipoDoc`,
    `descripcion`,
    `fecha`,
    `hora`
  )
VALUES
  (
    0,
    'usuario1@gmail.com',
    '4',
    'Usuario',
    '192.168.0.5',
    'BAJA',
    55,
    'Cincuenta y cinco',
    '2021-14-07',
    '21:22:13'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: auditoria_usuarios
# ------------------------------------------------------------

INSERT INTO
  `auditoria_usuarios` (
    `usuario`,
    `rol`,
    `cargo`,
    `terminal`,
    `accion`,
    `email`,
    `nombre`,
    `apellido`,
    `contraseña`,
    `id_rol`,
    `fecha`,
    `hora`
  )
VALUES
  (
    'stefano.privileggi@gmail.com',
    1,
    'Administrador',
    '192.168.0.5',
    'ALTA',
    'usuario1@gmail.com',
    'Usuario',
    '1',
    '$2a$08$7uwiTRmmi0SBkIhpPCniS.67WmgUZhvlFhfmJXP/EMVAwqsI1GXPu',
    4,
    '2021-14-07',
    '21:09:19'
  );
INSERT INTO
  `auditoria_usuarios` (
    `usuario`,
    `rol`,
    `cargo`,
    `terminal`,
    `accion`,
    `email`,
    `nombre`,
    `apellido`,
    `contraseña`,
    `id_rol`,
    `fecha`,
    `hora`
  )
VALUES
  (
    'stefano.privileggi@gmail.com',
    1,
    'Administrador',
    '192.168.0.5',
    'ALTA',
    'auditor@gmail.com',
    'Auditor',
    '1',
    '$2a$08$jl5trjTX/stKzMjnsUSZMe7PDajAyOya6Dv8vcAXB.poyt9oFmAqW',
    3,
    '2021-14-07',
    '21:09:36'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: datos
# ------------------------------------------------------------

INSERT INTO
  `datos` (`id`, `nombre`, `id_administrador`)
VALUES
  (98, 'La nueva provincia', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: empleados
# ------------------------------------------------------------

INSERT INTO
  `empleados` (`id`, `nombre`, `apellido`, `idTipoDoc`)
VALUES
  (1, 'Matias', 'Rodriguez', 55);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: roles
# ------------------------------------------------------------

INSERT INTO
  `roles` (`id`, `rol`)
VALUES
  (0, 'Desarrollador');
INSERT INTO
  `roles` (`id`, `rol`)
VALUES
  (1, 'Administrador');
INSERT INTO
  `roles` (`id`, `rol`)
VALUES
  (2, 'Supervisor');
INSERT INTO
  `roles` (`id`, `rol`)
VALUES
  (3, 'Auditor');
INSERT INTO
  `roles` (`id`, `rol`)
VALUES
  (4, 'Usuario');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tiposdocumento
# ------------------------------------------------------------

INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (0, 'CI CAPITAL FEDERAL');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (1, 'CI BUENOS AIRES');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (2, 'CI CATAMARCA');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (3, 'CI CORDOBA');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (4, 'CI CORRIENTES');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (5, 'CI ENTRE RIOS');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (6, 'CI JUJUY');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (7, 'CI MENDOZA');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (8, 'CI LA RIOJA');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (9, 'CI SALTA');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (10, 'CI SAN JUAN');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (11, 'CI SAN LUIS');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (12, 'CI SANTA FE');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (13, 'CI SGO DEL ESTERO');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (14, 'CI TUCUMAN');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (16, 'CI CHACO');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (17, 'CI CHUBUT');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (18, 'CI FORMOSA');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (19, 'CI MISIONES');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (20, 'CI NEUQUEN');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (21, 'CI LA PAMPA');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (22, 'CI RIO NEGRO');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (23, 'CI SANTA CRUZ');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (24, 'CI TIERRA DEL FUEGO');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (55, 'Cincuenta y cinco');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (80, 'CUIT');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (85, '85');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (86, 'CUIL');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (87, 'CDI');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (89, 'LIBRETA DE ENROLAMIENTO');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (90, 'LIBRETA CIVICA');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (91, 'CI EXTRANJERA');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (92, 'EN TRAMITE');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (93, 'ACTA DE NACIMIENTO');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (94, 'PASAPORTE');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (95, 'CI BS AS R N P');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (96, 'DNI');
INSERT INTO
  `tiposdocumento` (`id`, `descripcion`)
VALUES
  (99, 'SIN IDENTIFICAR / VENTA GLOBAL DIARIA');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

INSERT INTO
  `usuarios` (`email`, `nombre`, `apellido`, `contraseña`, `idRol`)
VALUES
  (
    'auditor@gmail.com',
    'Auditor',
    '1',
    '$2a$08$jl5trjTX/stKzMjnsUSZMe7PDajAyOya6Dv8vcAXB.poyt9oFmAqW',
    3
  );
INSERT INTO
  `usuarios` (`email`, `nombre`, `apellido`, `contraseña`, `idRol`)
VALUES
  (
    'stefano.privileggi@gmail.com',
    'Stefano',
    'Privileggi',
    '$2a$08$C7ME4HbnAzg9TSnWkQdPMO6zW4yT0.P765T8njsaLiQw0BM9plX1C',
    1
  );
INSERT INTO
  `usuarios` (`email`, `nombre`, `apellido`, `contraseña`, `idRol`)
VALUES
  (
    'usuario1@gmail.com',
    'Usuario',
    '1',
    '$2a$08$7uwiTRmmi0SBkIhpPCniS.67WmgUZhvlFhfmJXP/EMVAwqsI1GXPu',
    4
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
