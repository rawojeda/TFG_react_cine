-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-06-2022 a las 10:43:28
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `films`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `collections`
--

CREATE TABLE `collections` (
  `collectionId` int(11) NOT NULL,
  `title` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `collections`
--

INSERT INTO `collections` (`collectionId`, `title`) VALUES
(1, 'Duración'),
(2, 'Género'),
(3, 'Época');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `commentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `comment` text NOT NULL,
  `filmId` int(11) NOT NULL,
  `vote` float NOT NULL,
  `insertDate` datetime NOT NULL,
  `username` varchar(20) NOT NULL,
  `admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`commentId`, `userId`, `comment`, `filmId`, `vote`, `insertDate`, `username`, `admin`) VALUES
(12, 82, 'Otro comentario un poco mas nuevo', 639933, 2.2, '2022-01-07 17:47:06', 'Usuier', 0),
(13, 86, 'Es una película esplendida, gusta ver que una película con tanto presupuesto arriesgue por escenas tan explícitas o bizarras. Sin duda una experiencia única en el cine moderno.', 639933, 4.1, '2022-02-08 09:47:38', 'Martin_SCR', 0),
(14, 87, 'Un argumento abstracto y complejo para darle en la cara a películas del ánimo de Beowulf. Muy recomendada sin duda.', 639933, 3.7, '2022-01-01 16:50:06', 'AlejandroMr99', 0),
(15, 88, 'La película desde luego es horrible. \r\nEs super pretenciosa, se le ve a leguas esas ganas de sorprender con herramientas como la violencia extrema y los argumentos ambiguo. \r\nNo la recomiendo es una absurdez en toda regla.', 639933, 2.3, '2021-01-08 20:52:03', 'JasonSKT', 0),
(44, 87, 'Como sacar dinero de Harry Potter? asi', 338953, 0, '2022-06-08 08:01:59', 'AlejandroMr99', 0),
(48, 96, 'Muy buena película, la recomiendo.', 639933, 5, '2022-06-08 09:07:48', 'raul12', 0),
(64, 1, 'La mejor película que he visto en el cine este año', 639933, 5, '2022-06-15 05:35:15', 'Rwild', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lists`
--

CREATE TABLE `lists` (
  `listId` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `filmsId` text NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lists`
--

INSERT INTO `lists` (`listId`, `name`, `filmsId`, `userId`) VALUES
(1, 'novedades', '639933', 1),
(6, 'Pendientes', '338953, 526896, 752623, 675353', 97),
(15, 'Nueva lista', '', 97),
(17, 'REYES', '752623', 99),
(19, 'RAUL', '', 99),
(23, 'Novedades', '', 102),
(30, 'nueva', '639933', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recomendations`
--

CREATE TABLE `recomendations` (
  `recomendationId` int(11) NOT NULL,
  `title` varchar(20) NOT NULL,
  `listFilmsId` text NOT NULL,
  `collectionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `recomendations`
--

INSERT INTO `recomendations` (`recomendationId`, `title`, `listFilmsId`, `collectionId`) VALUES
(1, 'Comedia', '338953,526896,335787,453395,507086', 2),
(2, 'Ciencia Ficción', '453395,507086,576845', 2),
(3, 'Terror', '13581,2662, 21407, 7191, 16296, 2291,420634,447332, 1091,13510, 493922, 14001, 26466', 2),
(4, 'Suspenso', '338953, 526896, 335787, 453395, 507086', 2),
(5, 'Indefinidas', '338953, 526896, 335787, 453395, 507086', 2),
(7, '1:00-1:30hrs', '338953, 526896, 335787, 453395, 507086', 1),
(8, '1:30-2:00hrs', '338953, 526896, 335787, 453395, 507086', 1),
(9, '2:00-2:30hrs', '', 1),
(10, '2:30-3:00hrs', '', 1),
(11, '3:00-3:30hrs', '', 1),
(12, '3:30-4:00hrs', '', 1),
(13, '60\'', '', 3),
(14, '70\'', '', 3),
(15, '80\'', '', 3),
(16, '90\'s', '', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `reviewId` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `Resumen` text NOT NULL,
  `Review` text NOT NULL,
  `Date` date NOT NULL,
  `filmId` int(11) NOT NULL,
  `imageUrl` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reviews`
--

INSERT INTO `reviews` (`reviewId`, `titulo`, `Resumen`, `Review`, `Date`, `filmId`, `imageUrl`) VALUES
(2, 'Por fin merece la pena ir al cine', 'El director Robert Eggers vuelve a sorprender con su aventura vikinga.', 'Con solo dos películas en su haber: La bruja (2015), una de las cumbres del terror contemporáneo, y El faro (2019), una pesadilla expresionista que mezclaba en un salto sin red terror y comedia bruta, el cineasta norteamericano Robert Eggers da el salto a las grandes superproducciones (90 millones de dólares) de la mano de Universal y Focus Features con El hombre del norte, una película de vikingos -¡gran subgénero que nos ha dado películas de la talla de Los vikingos (1958) de Richard Fleischer o La furia de los vikingos (1961) de Mario Bava!-, que cruza el folk horror más lisérgico -hay mucha brujería e iconografía pagana absolutamente deliciosa- con la violencia más salvaje y gore que uno se pueda llevar a la cara (algo realmente poco habitual en los blockbusters norteamericanos). El cineasta la ha definido como un cruce entre Andrei Rublev (1966) de Andrei Tarkovsky y Conan el bárbaro', '2022-06-05', 639933, 'https://d2j1wkp1bavyfs.cloudfront.net/wp-content/uploads/2022/04/NM3.jpg?q=80'),
(3, 'El Batman más Batman', 'Matt Reeves realiza recibe tocar una obra maestra para hacer otra obra maestra.', 'Estamos ante la adaptación de uno de los primeros Batman en los cómics de DC que se caracterizaba básicamente por ser un detective más que un superhéroe. Y esto se nota mucho en la película, estamos ante una película de cine negro, mafias y detectives pero con un personaje enmascarado protagonizando la investigación.\r\n\r\nAl que no le guste, primero que se informe de que Batman se trata la adaptación, es el más humano aunque demasiado emo, pero eso es Batman desde siempre, oscuridad. No llega a estar a la altura de la trilogía de Nolan, pero se queda cerca. El Batman de Nolan se centraba más en Wayne y su atractivo físico. imán para las mujeres y el dinero, este Batman, nació y morirá con el corazón roto.\r\n\r\nTambién es de agradecer no habernos tenido que comer otra escena de la muerte de los padres de Bruce porque ya hemos visto demasiadas veces eso. Nos encontramos ante una película que dura 3 horas, justificadas, donde la importancia la tienen los personajes y obviamente, los colores. Es el inicio de una trilogía que espero que sea grandiosa.', '2022-06-08', 414906, 'https://cdn.colombia.com/sdi/2022/01/26/the-batman-nuevo-poster-oficial-dc-comics-warner-bros-robert-pattinson-990513.jpg'),
(4, 'La construcción del heroísmo', 'Doctor Strange en el Multiverso de la Locura’ se convierte en la película más taquillera del año', 'Marvel nos entrega una película de origen con Doctor Strange, algo muy característico de su Universo Cinematográfico y lo cual, desde mi punto de vista, es muy bueno. En breves palabras, para no hacer de esto, una sinopsis innecesaria, el film nos narra cómo es que el Doctor Stephen Strange pasa de ser un prolífico Neurocirujano, a convertirse en un ‘Hechicero Supremo’ que protejerá al planeta de los males que acechan en los diferentes multiversos que existen, y como mencionan en la película, mientras la misión de los Avengers es proteger el mundo ‘muggle’ por llamarle de alguna manera, ellos lo protejen de peligros más allá de lo humano.\r\n\r\nY es aquí donde la magia de Doctor Strange hace muy bien su trabajo, adentrándonos a un mundo donde, prácticamente, todo es posible.\r\n\r\nVisualmente la película es una maravilla, gracias a Disney, tuve la oportunidad de disfrutarla en pantalla IMAX 3D, y debo decir que si bien el 3D estuvo cumplidor, podría asegurar que no se pierden de mucho si la ven en 2D.\r\n\r\nLas actuaciones son muy buenas, Benedict Cumberbatch destaca en su papel del neurocirujano que tenía el mundo a sus pies, y que trágicamente se da un golpe de realidad para saber y descubrir, a lo que verdaderamente vino a la vida. El manejo de emociones que van de la arrogancia al sufrimiento, pasando por frustración, ira, soberbia y redención, nos muestran el abanico narrativo que tiene Cumberbatch para este tipo de películas.\r\n\r\nClaro está, que según la importancia de cada personaje dentro de la historia, es el detalle psicológico y de carácter que se le da.\r\n\r\nDel lado antagónico, Mads Mikkelsen se luce como villano, y es que él en lo particular, no necesita gesticular mucho para hacer una buena interpretación. Su desarrollo psicológico va directo al grano, sin necesidad de saber mucho más, salvo que hay algo ‘maligno’ que él quiere conquistar y que con ayuda de sus seguidores y los grandes poderes que ya domina, lo podrá conseguir.\r\n\r\nEl diseño de vestuario y escenarios fue de mis partes favoritas. Los lugares donde se puede ver al cast están muy bien detallados y el vestuario muy bien desarrollado. Los efectos especiales y la post producción hicieron muy bien su trabajo al entregarnos secuencias con excelentes detalles y que al menos en mi caso, no me hicieron pensar que habían sido grabadas en grandes espacios de pantalla verde.\r\n\r\n¿Se preguntan por el ‘humor característico y chistoso’ de Marvel? Sí, está presente, pero es algo que no me hizo ruido.\r\n\r\n¿Qué está mal? El maquillaje de Mads Mikkelsen no hace que se vea ‘malvado’, de hecho pareciera un antifaz de brillantina mal hecho para Halloween, pero la actuación es la que le da un buen soporte.\r\n\r\nEl giro psicológico en algunos personajes sucede de golpe, y te deja esa sensación de ¿cómo es posible que de repente tuviera ese cambio? ¿qué lo motivó?\r\n\r\nTambién noté que convertirse en ‘Hechicero’, en realidad es muy ‘sencillo’, es algo que no está muy bien explicado. Se siente como si cualquiera con un sufrimiento grande en la vida pudiera llegar muy fácil y entrenar para convertirse en uno (salvo que ser arrogante, soberbio y neurocirujano sea requisito).\r\n\r\nFuera de esos detalles, creo que cualquier fan del Universo Cinematográfico de Marvel, la disfrutará mucho. Incluso los no amantes o seguidores de cómics, podrían sentirse satisfechos, pues al ser una película de origen, en realidad no te deja con muchos cabos sueltos o dudas existenciales que te hagan querer leer los cómics. Tal vez con preguntas de ¿quién es ese que mencionan? Pero nada que no te pueda resolver un amigo fanático de este mundo.\r\n\r\nEn resumen: Si me preguntan ¿vale la pena verla? Yo les diría que sí. Es una película entretenida, con buenas actuaciones, excelentes efectos y momentos divertidos; una gran elección para el fin de semana.\r\n\r\nY por cierto, hay 2 escenas post créditos, así que antes de levantarte de tu asiento, quédate a disfrutar y emocionarte, un poco más.\r\n\r\nSi te gustó esta reseña, puedes compartirla con tus amigos, nos ayudarías a esparcir nuestra pasión por el Cine.\r\n\r\nY si quieres compartirnos tu opinión, puedes hacerlo aquí abajo en los comentarios.', '2022-06-05', 453395, 'https://gcdn.lanetaneta.com/wp-content/uploads/2022/04/Benedict-Cumberbatch-sera-el-anfitrion-del-estreno-de-Doctor-Strange.jpg'),
(5, 'El anime que rompió todos los récords en pandemia.', '\'Guardianes de la Noche: Tren infinito\': el fenómeno que ha superado la taquilla de \'El viaje de Chihiro\'.', '\'Guardianes de la Noche: Tren infinito\': el anime que rompió todos los récords en pandemia.\r\nCierto es que la cinta fue excepcional en todos los sentidos ante la expectativa ya cumplida de que sería todo un éxito, como reflejó la política de la popular cadena de distribución japonesa Toho Cinemas y bastantes salas con la eliminación de las restricciones de asientos para el fin de semana de estreno. Así, más de cuatrocientos cines japoneses proyectaron la película, algunos de ellos llegando a proyectar hasta 42 sesiones al día e, incluso así, hubo colas kilométricas para conseguir entradas por la dificultad de comprarlas online.\r\n\r\nLa conversión de \'Kimetsu no Yaiba\' en una de las IP más populares de Shueshia, la editorial que publicó el manga a través de su revista Weekly Shonen Jump, explica también el éxito no ya de la cinta sino del universo mediático compartido de toda la saga. De ahí que el liderazgo aplastante en taquilla de la película vaya en relación directa con el dominio del manga en el mercado editorial japonés, donde la saga ha vendido en 2020 más de 80 millones de copias según el ranking Oricon, cantidad que supera la suma del resto del top 20 de la lista, y eso sin sumar las copias digitales.\r\n\r\nEste peculiar fenómeno tiene, por tanto, raíces en su amplia popularidad local, y habrá que esperar resultados de la taquilla europea y estadounidense para saber si es capaz de refrendar internacionalmente el éxito que ya ha conseguido en cines de Japón, Corea del Sur, Hong Kong, Australia y Nueva Zelanda, donde suma, hasta la fecha, más de 435 millones de dólares recaudados. Un éxito que, eso sí, ya es un hito tras haber superado a \'El viaje de Chihiro\' y \'Your name\', y que ha encumbrado la bondad naïf y el espíritu de resistencia de \'Guardianes de la Noche: Tren infinito\' a la historia del medio.', '2022-05-02', 635302, 'https://i0.wp.com/lacomikeria.com/wp-content/uploads/2021/09/B609FF54-0A93-4E1A-A19C-289C1170FEB3.png?fit=1200%2C650&ssl=1'),
(6, '\'Morbius\' arrasa en taquilla con muy malas reseñas', 'La película de Marvel tenía potencial para haber sido una gran película de superhéroes y terror', 'Las cifras cantan: \'Morbius\' ha recaudado en su primer fin de semana 84 millones de dólares, recuperando en su totalidad el presupuesto del que partió: 75 millones. Esta cifra se reparte en 39,1 millones de dólares en Estados Unidos y 44,9 millones más en otros 62 mercados, entre ellos España, donde ha quedado en segunda posición en el ranking de fin de semana frente a \'Sonic 2\'.\r\n\r\nSon cifras espectaculares que contrastan con lo mal que la crítica ha tratado a la película. Un 17% en Rotten Tomatoes y un 36% en Metacritic dejan claro que no ha sido del gusto de los profesionales del análisis, que han destacado (para mal) su galimatías argumental, la escasa calidad de sus efectos y su poca originalidad. Nada de ello ha hecho mella en un éxito que, ante todo, nos sirve para sacar una serie de conclusiones.\r\nPrimera conclusión: la crítica ya no tiene poder prescriptor. Es la más clara y directa. Películas que no gustan a la crítica y son éxitos de taquilla (o viceversa), han existido siempre, y de ahí se ha ganado la profesión desde siempre su fama de desconexión total con los auténticos gustos del público. Puede aducirse que la crítica no está precisamente para eso, pero es cierto que, sin ir más lejos, las últimas polémicas entre Scorsese y el cine de superhéroes no son más que prolongaciones de una discusión tan vieja como el propio cine.\r\nPero lo cierto es que ya no se trata de que la cinefilia seria viva en una burbuja de festivales y películas asiáticas que la masa que acude a las multisalas directamente ignora que existen. Es que \'Morbius\' fue criticada por los propios fans de los blockbusters, y que adoran las películas de Marvel. Y ni siquiera ellos han impedido que \'Morbius\' se convierta en un éxito. Hay un público no-fan que no necesita hacer vídeos de reacciones con cada teaser de DC, que no acude disfrazado a los estrenos y que no tiene un podcast tri-semanal sobre los últimos intríngulis del multiverso, y que sin embargo convierte las películas en éxitos, independientemente de lo que diga la intelligentsia de la crítica... o del fandom.', '2022-06-02', 526896, 'https://media.vandalsports.com/m/4-2022/20224618133_1.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `administrador` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `username`, `pass`, `email`, `administrador`) VALUES
(1, 'Rwild', 'asd', 'ojedarobles', 1),
(66, 'Usuario', 'user1User', 'user@user.user', 0),
(82, 'Usuier', 'asdasdasdA1', 'rawr@asd.asd', 0),
(86, 'Martin_SCR', 'Mypassw1', 'Martin@hotmail.com', 0),
(87, 'AlejandroMr99', 'Micontra1', 'alex@gmail.es', 0),
(88, 'JasonSKT', 'asdasdasdA1', 'jason@SKT.es', 0),
(95, 'Roberto', 'robrob1R', 'rob@rob.rob', 0),
(96, 'raul12', 'rarara1R', 'raw@ra.ra', 0),
(97, 'raw', 'asd', 'raw@rawr.war', 0),
(98, 'NuevoUsuario', 'asdasd1A', 'asd@asd.asd', 0),
(99, 'reyes', 'Romanraul10', 'rroblesf@andaluciajunta.es', 0),
(100, 'rojedar', 'asdasd1A', 'rojedar@gmail.com', 0),
(101, 'ndewfwfew', 'asd1asdA', 'adsd@asf.sfs', 0),
(102, 'usuario1', 'asdasd1A', 'usuario@user.com', 0),
(103, 'User123', 'asdasd1A', 'asdfasd@asd.asd', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`collectionId`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `UserId` (`userId`),
  ADD KEY `userId_2` (`userId`);

--
-- Indices de la tabla `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`listId`),
  ADD KEY `UserId` (`userId`);

--
-- Indices de la tabla `recomendations`
--
ALTER TABLE `recomendations`
  ADD PRIMARY KEY (`recomendationId`),
  ADD KEY `collectionId` (`collectionId`),
  ADD KEY `collectionId_2` (`collectionId`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`reviewId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `collections`
--
ALTER TABLE `collections`
  MODIFY `collectionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `lists`
--
ALTER TABLE `lists`
  MODIFY `listId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `recomendations`
--
ALTER TABLE `recomendations`
  MODIFY `recomendationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `reviewId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lists`
--
ALTER TABLE `lists`
  ADD CONSTRAINT `lists_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `lists_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recomendations`
--
ALTER TABLE `recomendations`
  ADD CONSTRAINT `recomendations_ibfk_1` FOREIGN KEY (`collectionId`) REFERENCES `collections` (`collectionId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
