-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 30, 2026 at 07:42 AM
-- Server version: 8.0.46
-- PHP Version: 8.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kwarcab_coconext`
--

-- --------------------------------------------------------

--
-- Table structure for table `species`
--

CREATE TABLE `species` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_lokal` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nama_latin` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `logo_path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `species`
--

INSERT INTO `species` (`id`, `nama_lokal`, `nama_latin`, `created_at`, `logo_path`) VALUES
(1, 'Kelapa Hijau', 'Cocos nucifera viridis', '2025-12-06 13:33:07', 'coconext/logo/species_kelapa_hijau.png'),
(2, 'Kelapa Merah', '-', '2025-12-06 13:33:07', 'coconext/logo/species_kelapa_merah.png'),
(3, 'Kelapa Kelabu', 'Cocos nucifera macrocorpu', '2025-12-06 13:33:07', 'coconext/logo/species_kelapa_kelabu.png'),
(4, 'Kelapa Manis', 'Cocos nucifera sakarina', '2025-12-06 13:33:07', 'coconext/logo/species_kelapa_manis.png'),
(5, 'Kelapa Gading', 'Cocos nucifera eburnia', '2025-12-06 13:33:07', 'coconext/logo/species_kelapa_gading.png'),
(6, 'Kelapa Raja', 'Cocos nucifera regia', '2025-12-06 13:33:07', 'coconext/logo/species_kelapa_raja.png'),
(7, 'Kelapa Raja Malabar', 'Cocos nucifera pretiosa', '2025-12-06 13:33:07', 'coconext/logo/species_kelapa_raja_malabar.png'),
(8, 'Kelapa Puyuh', 'Cocos nucifera pumila', '2025-12-06 13:33:07', 'coconext/logo/species_kelapa_puyuh.png'),
(1811, 'lengkeng', 'lengkeng', '2026-06-05 01:26:36', NULL),
(1812, 'Jeruk', 'Citrus', '2026-06-05 01:27:09', NULL),
(1813, 'Pohon mangga', NULL, '2026-06-05 01:27:37', NULL),
(1814, 'durian', 'durian', '2026-06-05 01:28:39', NULL),
(1815, 'Sirsak', 'Cocos nucifera macrocorpu', '2026-06-05 01:28:40', NULL),
(1816, 'Jambu', 'Genus', '2026-06-05 01:29:20', NULL),
(1817, 'Jambu  biji', 'Genus', '2026-06-05 01:30:49', NULL),
(1818, 'Kelengkeng', NULL, '2026-06-05 01:31:29', NULL),
(1820, 'manggis', 'manggis', '2026-06-05 01:32:10', NULL),
(1823, 'Pohon durian', 'durian', '2026-06-05 01:34:37', NULL),
(1825, 'Jambu air', 'Genus', '2026-06-05 01:35:32', NULL),
(1826, 'Nangka', 'Artocarpus', '2026-06-05 01:36:57', NULL),
(1827, 'Alpukat', 'Alpukat', '2026-06-05 01:37:36', 'logo/species_alpukat.jpg'),
(1828, 'Pohon sawo', NULL, '2026-06-05 01:37:39', NULL),
(1832, 'pohon palem', 'palem', '2026-06-05 01:42:30', NULL),
(1840, 'Kelap merah', 'Cocos nucifera sakarina', '2026-06-05 01:48:33', NULL),
(1848, 'pohon jambu', 'jambu', '2026-06-05 01:55:35', NULL),
(1864, 'jambu biji', 'Genus', '2026-06-05 07:10:33', NULL),
(1867, 'mangga', 'Manggo', '2026-06-05 07:17:52', NULL),
(1878, 'Pucuk merah', 'Cocos nucifera sakarina', '2026-06-05 07:36:03', NULL),
(1881, 'Puyuh', 'Cocos nucifera pumila', '2026-06-05 07:38:50', NULL),
(1899, 'Pohon Kelapa', 'Cocos Nucifera', '2026-06-21 15:36:38', NULL),
(1948, 'Kelapa', 'Cocos Nucifera', '2026-08-15 08:53:06', NULL),
(1962, 'Ujix', 'Testusx', '2026-09-28 19:25:07', NULL),
(1966, 'Ujix2', 'T', '2026-09-28 19:25:53', NULL),
(1967, 'Ujix3', 'T', '2026-09-28 19:25:54', NULL),
(1968, 'hephx', 'hephx', '2026-09-28 20:16:20', 'logo/species_hephx.svg'),
(1969, 'UjiRce', 'Testus', '2026-09-28 21:51:10', 'logo/species_ujirce.png');

-- --------------------------------------------------------

--
-- Table structure for table `trees`
--

CREATE TABLE `trees` (
  `id` bigint UNSIGNED NOT NULL,
  `lat` decimal(9,6) NOT NULL,
  `lng` decimal(9,6) NOT NULL,
  `nama_lokal` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nama_latin` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `tanggal_tanam` date DEFAULT NULL,
  `jam_tanam` time DEFAULT NULL,
  `tinggi_cm` int DEFAULT NULL,
  `asal_bibit` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `penanam` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cerita` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `foto_sebelum` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `foto_sesudah` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `serial_no` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `status` varchar(16) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'alive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `trees`
--

INSERT INTO `trees` (`id`, `lat`, `lng`, `nama_lokal`, `nama_latin`, `tanggal_tanam`, `jam_tanam`, `tinggi_cm`, `asal_bibit`, `penanam`, `cerita`, `foto_sebelum`, `foto_sesudah`, `created_at`, `serial_no`, `status`) VALUES
(1, -6.485595, 106.838203, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-01-25', '08:00:00', 1, 'Swadaya / Beli Sendiri', 'kwarran.cibinong', 'test', 'uploads/before_69762cc677cc12.67099354.jpg', 'uploads/after_69762cc677cca9.08056177.jpg', '2026-01-25 14:46:30', 'KH-20260125-000001', 'alive'),
(2, -6.485770, 106.837950, 'Kelapa Merah', 'Cocos nucifera rubescens', '2026-02-11', '08:00:00', 1, '1', 'kwarran.babakanmadang', '', 'uploads/before_698c3278515682.55969827.jpg', 'uploads/after_698c32785156e3.82557524.jpg', '2026-02-11 07:40:40', 'KH-20260211-000002', 'alive'),
(3, -6.464750, 106.680680, 'Kelapa Merah', '-', '2026-02-18', '08:00:00', 50, 'CSR Perusahaan', 'kwarran.ciseeng', '----', 'uploads/before_698c32bdd87de9.74841512.jpg', 'uploads/after_698c32bdd87ef9.28115831.jpg', '2026-02-11 07:41:49', 'KH-20260211-000003', 'alive'),
(4, -6.464750, 106.680680, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-02-03', '08:00:00', 40, 'Bantuan Pemerintah', 'kwarran.ciseeng', 'sedekah oksigen', 'uploads/before_698c335ddc0cf5.58200636.jpg', 'uploads/after_698c335ddc0d66.46993024.jpg', '2026-02-11 07:44:29', 'KH-20260211-000004', 'alive'),
(5, -6.431190, 106.664730, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-03-12', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.ciseeng', 'Semoga pohon kelapa ini jadi pohon penyejuk jiwa', 'uploads/before_69b28f5f436473.87271079.jpg', 'uploads/after_69b28f5f4364e7.08716119.jpg', '2026-03-12 10:03:11', 'KH-20260312-000005', 'alive'),
(6, -6.672570, 106.662210, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-02-01', '09:00:00', 50, 'Gugus depan', 'kwarran.pamijahan', 'Kelapa ada buah tanaman yang tidak hanya untuk sebuah keindahan tapi kelapa menjadi sebuah kebutuhan manusia di hidup nya', 'uploads/before_69b38ca058ce26.65759290.jpg', 'uploads/after_69b38ca058cea8.09091432.jpg', '2026-03-13 04:03:44', 'KH-20260313-000006', 'alive'),
(7, -6.672570, 106.662200, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-03-13', '11:00:00', 100, 'Kwarran pamijahan', 'kwarran.pamijahan', 'Suatu pagi,seorang pramukamenanam pohon kelapa di tanah kosong dekat desa. Mereka menggali lubang, menanam bibit kelapa, lalu menutupnya kembali dengan tanah. Walaupun sederhana, kegiatan itu dilakukan dengan penuh semangat', 'uploads/before_69b38f12bde455.88447960.jpg', 'uploads/after_69b38f12bde4f2.15701036.jpg', '2026-03-13 04:14:10', 'KH-20260313-000007', 'alive'),
(8, -6.435120, 106.700050, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-03-16', '17:43:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciseeng', 'Pohon ini ditanam oleh kak abday, dengan harapan bibit ini akan menjadi bermanfaat dikemudian hari', 'uploads/before_69b7dfcb9e1a63.93387462.jpg', 'uploads/after_69b7dfcb9e1af4.69194672.jpg', '2026-03-16 10:47:39', 'KH-20260316-000008', 'alive'),
(9, -6.444750, 106.732440, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-03-16', '05:57:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.ciseeng', 'Bibit ini ditanam oleh Kak Najar dalam Kegiatan BAKSO RAMADHAN JILID 6 dengan harapan dapat berguna serta bermanfaat bagi orang orang disekitar dimasa yang akan datang', 'uploads/before_69b7e2d28c77e7.41559376.jpg', 'uploads/after_69b7e2d28c7871.97646233.jpg', '2026-03-16 11:00:34', 'KH-20260316-000009', 'alive'),
(10, -6.444750, 106.732440, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-03-16', '17:43:00', 15, 'Swadaya / Beli Sendiri', 'kwarran.ciseeng', 'Bibit ini ditanam oleh Kak Badrul Mubarok dengan harapan dapat bermanfaat bagi masyarakat disaat masyarakat membutuhkannya', 'uploads/before_69b7e44e192ec6.23088588.jpg', 'uploads/after_69b7e44e192f74.04028790.jpg', '2026-03-16 11:06:54', 'KH-20260316-000010', 'alive'),
(11, -6.444750, 106.732440, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-03-16', '17:43:00', 10, 'Swadaya / Beli Sendiri', 'kwarran.ciseeng', 'Bibit ini ditanam oleh Kak Suwanto dalam acara Bakti Sosial Ramadhan SMAN 1 Ciseeng, harapannya dapat bermanfaat di masa yang akan datang', 'uploads/before_69b7e610e54064.24954613.jpg', 'uploads/after_69b7e610e540d6.92894248.jpg', '2026-03-16 11:14:24', 'KH-20260316-000011', 'alive'),
(12, -6.444750, 106.732440, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-03-16', '17:43:00', 7, 'Swadaya / Beli Sendiri', 'kwarran.ciseeng', 'Bibit ini ditanam oleh Ustad Aditia Darmadi dalam acara Bakti sosial ke 6 SMA Negeri 1 Ciseeng di salah satu yayasan. Harapannya bibit ini dapat bertunas dan hidup serta dapat berguna dan bermanfaat dilingkungan sekitar dimasa yang akan datang', 'uploads/before_69b7e6ded0f627.08309916.jpg', 'uploads/after_69b7e6ded0f6b8.35232835.jpg', '2026-03-16 11:17:50', 'KH-20260316-000012', 'alive'),
(13, -6.444750, 106.732440, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-03-16', '17:43:00', 9, 'Swadaya / Beli Sendiri', 'kwarran.ciseeng', 'Bibit ini ditanam oleh Muhammad arifin yang merupakan salah satu peserta dari Kegiatan Bakti Sosial yang turut andil di Kegiatan Penanaman tersebut, dengan harapan bibit tersebut dapat bertuas dan tumbuh hidup serta bermanfaat di masa yang akan datang', 'uploads/before_69b7e804c13710.75818545.jpg', 'uploads/after_69b7e804c13785.29336193.jpg', '2026-03-16 11:22:44', 'KH-20260316-000013', 'alive'),
(14, -6.484020, 106.663990, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-23', '08:00:00', 100, 'Swadaya / Beli Sendiri', 'kwarran.rumpin', 'semoga bermanfaat bagi generasi masa depan\r\nabdush shomad guru sdn cibodas 5', 'uploads/before_69e978271cdb76.53372019.jpg', 'uploads/after_69e978271cdbe4.02247531.jpg', '2026-04-23 01:38:47', 'KH-20260423-000014', 'alive'),
(15, -6.496200, 106.645990, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-04-23', '09:00:00', 100, 'Swadaya / Beli Sendiri', 'kwarran.rumpin', 'bakon askolani guru sdn rabak 02 kelapa untuk negeri', 'uploads/before_69e9a1b44f4a60.30728389.jpg', 'uploads/after_69e9a1b44f4af0.23358831.jpg', '2026-04-23 04:36:04', 'KH-20260423-000015', 'alive'),
(16, -6.365690, 106.616880, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-23', '08:00:00', 60, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'semoga pohon Kelapa ini bermanfaat untuk lingkungan SDN Malahpar', 'uploads/before_69e9bda35cf046.48663216.jpg', 'uploads/after_69e9bda35cf142.46414241.jpg', '2026-04-23 06:35:15', 'KH-20260423-000016', 'alive'),
(17, -6.495120, 106.644520, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-23', '03:19:00', 40, 'Swadaya / Beli Sendiri', 'kwarran.rumpin', 'Penanaman ini dilakukan sebagai bentik kepedulian terhadap lingkungan, agar tercipta suasana sejuk dan nyaman, smoga bermanfaat bagi kami yg mananam dan utuk orang lain. Bakon Askolani.', 'uploads/before_69e9f738990698.49914663.jpg', 'uploads/after_69e9f738990720.58351283.jpg', '2026-04-23 10:40:56', 'KH-20260423-000017', 'alive'),
(18, -6.496110, 106.645870, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-04-27', '06:39:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.rumpin', 'Tanam Pohon Kelapa untuk mejaga keseimbangan Lingkungan. Sumarni TTendik SDN Rabak 02.', 'uploads/before_69eea25cee8173.33013328.jpg', 'uploads/after_69eea25cee8227.25158100.jpg', '2026-04-26 23:40:12', 'KH-20260426-000018', 'alive'),
(19, -6.496170, 106.645870, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-04-28', '11:10:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.rumpin', 'Penanaman pohon kelapa di SDN RABAK 02 untuk keindahan lingkungan sekilah. SUGANDI LAKSAMANA KS', 'uploads/before_69f04575bebfc9.50300825.jpg', 'uploads/after_69f04575bec051.59279241.jpg', '2026-04-28 05:28:21', 'KH-20260428-000019', 'alive'),
(20, -6.507450, 106.654770, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '09:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.rumpin', 'semoga pohon ini menjadi manfaat di masa depan yogi andriyadi sdn gobang 03', 'uploads/before_69f2d734dcfa96.29796771.jpg', 'uploads/after_69f2d734dcfb19.61480514.jpg', '2026-04-30 04:14:44', 'KH-20260430-000020', 'alive'),
(21, -6.515190, 106.652470, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'Semoga bermanfaat untuk dimasa depan siswa sdn gobang 03 April', 'uploads/before_69f2d9018606d2.79031506.jpg', 'uploads/after_69f2d901860781.08689748.jpg', '2026-04-30 04:22:25', 'KH-20260430-000021', 'alive'),
(22, -6.515190, 106.652470, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-04-30', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'Semoga bermanfaat dimasa yang akan datang by Andin siswa sdn gobang 03', 'uploads/before_69f2d973bdb031.87465794.jpg', 'uploads/after_69f2d973bdb0c5.64577094.jpg', '2026-04-30 04:24:19', 'KH-20260430-000022', 'alive'),
(23, -6.515190, 106.652470, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'Smeoga bermanfaat dimasa yang akan datang by Khanza Siswa SDN Gobang 03', 'uploads/before_69f2d9d27679a5.29386423.jpg', 'uploads/after_69f2d9d2767a55.38272410.jpg', '2026-04-30 04:25:54', 'KH-20260430-000023', 'alive'),
(24, -6.514570, 106.652100, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'Semoga bermanfaat untuk dimasa depan by Inara Siswa SDN GOBANG 03', 'uploads/before_69f2dbac430ee6.47837213.jpg', 'uploads/after_69f2dbac430f73.60428485.jpg', '2026-04-30 04:33:48', 'KH-20260430-000024', 'alive'),
(25, -6.507380, 106.655950, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'Semoga bermanfaat untuk di masa yang akan datang By Adisya Siswa kelas 6 SDN GOBANG 03', 'uploads/before_69f2dcfd179ed7.77733838.jpg', 'uploads/after_69f2dcfd179f85.52177356.jpg', '2026-04-30 04:39:25', 'KH-20260430-000025', 'alive'),
(26, -6.507740, 106.655010, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'Semoga bermanfaat dimasa yang akan datang by Dita siswa kelas 4 SDN Gobang 03', 'uploads/before_69f2ddd63f3e06.40902307.jpg', 'uploads/after_69f2ddd63f3e75.92853960.jpg', '2026-04-30 04:43:02', 'KH-20260430-000026', 'alive'),
(27, -6.507940, 106.655240, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'Semoga bermanfaat by Najwa siswa kelas 4 SDN GOBANG 03', 'uploads/before_69f2de5ae58a56.09953913.jpg', 'uploads/after_69f2de5ae58af7.01731846.jpg', '2026-04-30 04:45:14', 'KH-20260430-000027', 'alive'),
(28, -6.508080, 106.655500, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'Semoga bermanfaat by Zahra siswa kelas 4 SDN GOBANG 03', 'uploads/before_69f2debe063490.05016991.jpg', 'uploads/after_69f2debe063517.96656646.jpg', '2026-04-30 04:46:54', 'KH-20260430-000028', 'alive'),
(29, -6.507580, 106.654930, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'Semoga bermanfaat by Aqila siswa kelas 4 SDN GOBANG 03', 'uploads/before_69f2df3a584c10.21576536.jpg', 'uploads/after_69f2df3a584cc1.71189555.jpg', '2026-04-30 04:48:58', 'KH-20260430-000029', 'alive'),
(30, -6.507780, 106.655170, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '08:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'Semoga bermanfaaat by fad8l kelas 4 sdn gobang 3', 'uploads/before_69f2dfc430df74.13152798.jpg', 'uploads/after_69f2dfc430e004.39792797.jpg', '2026-04-30 04:51:16', 'KH-20260430-000030', 'alive'),
(31, -6.507390, 106.654620, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '11:55:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', '“Penanaman pohon kelapa ini dilakukan sebagai bentuk kepedulian terhadap lingkungan sekolah. Semoga pohon ini dapat tumbuh dengan baik dan memberikan manfaat bagi anak-anak, seperti memberikan keteduhan dan hasil yang berguna di masa depan. \r\n\r\nDari Akmalia Rahmah SDN GOBANG 03', 'uploads/before_69f2e09ecb6b45.64206043.jpg', 'uploads/after_69f2e09ecb6bb1.41635321.jpg', '2026-04-30 04:54:54', 'KH-20260430-000031', 'alive'),
(32, -6.365720, 106.616880, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-04-30', '12:05:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.rumpin', 'semoga pohon kelapa ini akan bermanfaat utk lingkungan sekolah', 'uploads/before_69f2e43fb58266.30269462.jpg', 'uploads/after_69f2e43fb582f6.19332924.jpg', '2026-04-30 05:10:23', 'KH-20260430-000032', 'alive'),
(33, -6.692290, 106.661700, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-05-04', '06:45:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.rumpin', 'Penanaman ini bertujuan memperkuat tanah sebagai antisipasi longsor, semoga bermanfaat dan lain', 'uploads/before_69f7de3fdd2a22.10106221.jpg', 'uploads/after_69f7de3fdd2aa6.76051709.jpg', '2026-05-03 23:46:07', 'KH-20260503-000033', 'alive'),
(34, -6.692400, 106.661790, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-05-03', '08:00:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.rumpin', 'Pohon kelapa ditanam dihalaman rumah dalam bentuk usaha kebermanfaatan di kemudian hari untuk sipenanam dan yang merasakan manpatanya. Bakon Askolani', 'uploads/before_69f805b1d1a159.95700765.jpg', 'uploads/after_69f805b1d1a1e7.00704665.jpg', '2026-05-04 02:34:25', 'KH-20260504-000034', 'alive'),
(35, -6.583070, 106.631100, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '21:45:00', 35, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Bisa tumbuh dengan baik', 'uploads/before_6a1e365b4dc659.38312171.jpg', 'uploads/after_6a1e365b4dc6c7.54160644.jpg', '2026-06-02 01:48:11', 'KH-20260602-000035', 'alive'),
(36, -6.583000, 106.631060, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:50:00', 45, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Semoga bisa memberikan manfaat', 'uploads/before_6a1e36e3178cf0.26923600.jpg', 'uploads/after_6a1e36e3178d78.57096538.jpg', '2026-06-02 01:50:27', 'KH-20260602-000036', 'alive'),
(37, -6.583140, 106.631080, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:54:00', 35, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Semoga memberi manfaat bagi alam', 'uploads/before_6a1e37aacf14d8.72283075.jpg', 'uploads/after_6a1e37aacf1550.96770719.jpg', '2026-06-02 01:53:46', 'KH-20260602-000037', 'alive'),
(38, -6.583260, 106.630940, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:00:00', 25, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Manfaat bagi semuanya', 'uploads/before_6a1e38a39343d1.90509152.jpg', 'uploads/after_6a1e38a3934445.22863207.jpg', '2026-06-02 01:57:55', 'KH-20260602-000038', 'alive'),
(39, -6.583220, 106.631060, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '08:55:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Memberikan kebaikan bagi alam', 'uploads/before_6a1e391df03c13.75063440.jpg', 'uploads/after_6a1e391df03c93.21542055.jpg', '2026-06-02 01:59:57', 'KH-20260602-000039', 'alive'),
(40, -6.581880, 106.631110, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:00:00', 45, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Manfaat bagi alam', 'uploads/before_6a1e39aeb81168.78668978.jpg', 'uploads/after_6a1e39aeb811d3.85143763.jpg', '2026-06-02 02:02:22', 'KH-20260602-000040', 'alive'),
(41, -6.581830, 106.631090, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:00:00', 52, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Memberi manfaat bagi alam', 'uploads/before_6a1e3a1b8b2dd1.12405858.jpg', 'uploads/after_6a1e3a1b8b2e48.98644725.jpg', '2026-06-02 02:04:11', 'KH-20260602-000041', 'alive'),
(42, -6.583890, 106.632000, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:02:00', 25, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Tumbuh lebih baik', 'uploads/before_6a1e3a69b9a933.01687219.jpg', 'uploads/after_6a1e3a69b9a9d1.16047012.jpg', '2026-06-02 02:05:29', 'KH-20260602-000042', 'alive'),
(43, -6.581880, 106.631120, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:04:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Tumbuh lebih baik', 'uploads/before_6a1e3a7dc9d3d6.34569519.jpg', 'uploads/after_6a1e3a7dc9d441.29763577.jpg', '2026-06-02 02:05:49', 'KH-20260602-000043', 'alive'),
(44, -6.583680, 106.631160, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:06:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'tumbuh dengan baik', 'uploads/before_6a1e3af7e3e734.22931829.jpg', 'uploads/after_6a1e3af7e3e7e1.90014841.jpg', '2026-06-02 02:07:51', 'KH-20260602-000044', 'alive'),
(45, -6.581710, 106.630980, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:10:00', 55, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Tumbuh lebih baik', 'uploads/before_6a1e3afa663f97.79930050.jpg', 'uploads/after_6a1e3afa664002.46639845.jpg', '2026-06-02 02:07:54', 'KH-20260602-000045', 'alive'),
(46, -6.581790, 106.631290, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:10:00', 55, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Memberi manfaat bagi semua', 'uploads/before_6a1e3b7664c098.35086909.jpg', 'uploads/after_6a1e3b7664c117.65999422.jpg', '2026-06-02 02:09:58', 'KH-20260602-000046', 'alive'),
(47, -6.581880, 106.631190, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:10:00', 45, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Memberikan manfaat bagi semua', 'uploads/before_6a1e3be4d4d860.69104681.jpg', 'uploads/after_6a1e3be4d4d8e1.24809890.jpg', '2026-06-02 02:11:48', 'KH-20260602-000047', 'alive'),
(48, -6.583700, 106.632280, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:10:00', 25, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'tumbuh menjulang tinggi wahai tunas ku', 'uploads/before_6a1e3be7f3a3a1.86816542.jpg', 'uploads/after_6a1e3be7f3a430.97969512.jpg', '2026-06-02 02:11:51', 'KH-20260602-000048', 'alive'),
(49, -6.581660, 106.631170, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:10:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'tumbuh lebih baik', 'uploads/before_6a1e3c27745e58.06293944.jpg', 'uploads/after_6a1e3c27745ec5.94197808.jpg', '2026-06-02 02:12:55', 'KH-20260602-000049', 'alive'),
(50, -6.581860, 106.631180, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:15:00', 55, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Memberikan manfaat bagi semua', 'uploads/before_6a1e3c365a9b17.14307584.jpg', 'uploads/after_6a1e3c365a9b70.69219144.jpg', '2026-06-02 02:13:10', 'KH-20260602-000050', 'alive'),
(51, -6.583970, 106.632260, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:12:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Tumbuh menjulang tinggi wahai tunas ku', 'uploads/before_6a1e3c7d362492.51003949.jpg', 'uploads/after_6a1e3c7d362526.57919109.jpg', '2026-06-02 02:14:21', 'KH-20260602-000051', 'alive'),
(52, -6.581730, 106.631160, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '09:15:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'semoga tumbuh baik', 'uploads/before_6a1e3c91a7b5b7.30343302.jpg', 'uploads/after_6a1e3c91a7b633.62140080.jpg', '2026-06-02 02:14:41', 'KH-20260602-000052', 'alive'),
(53, -6.581410, 106.630780, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Tumbuh lebih baik ya', 'uploads/before_6a1e47d511bcf0.28337084.jpg', 'uploads/after_6a1e47d511bd85.97042110.jpg', '2026-06-02 03:02:45', 'KH-20260602-000053', 'alive'),
(54, -6.581410, 106.630780, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-02', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.leuwiliang', 'Tumbuh lebih cepat ya', 'uploads/before_6a1e482b5a69f1.08238481.jpg', 'uploads/after_6a1e482b5a6a61.63426553.jpg', '2026-06-02 03:04:11', 'KH-20260602-000054', 'alive'),
(55, -6.549090, 106.696350, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-04', '02:24:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga pohon ini bermanfaat untuk masa depan', 'uploads/before_6a2128ab3e3b97.94511182.jpg', 'uploads/after_6a2128ab3e3c34.90605835.jpg', '2026-06-04 07:26:35', 'KH-20260604-000055', 'alive'),
(56, -6.549130, 106.696380, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-04', '14:44:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga pohon ini dapat bermanfaat', 'uploads/before_6a212dd40564c1.66273586.jpg', 'uploads/after_6a212dd4056548.12564698.jpg', '2026-06-04 07:48:36', 'KH-20260604-000056', 'alive'),
(57, -6.549240, 106.696410, 'lengkeng', 'lengkeng', '2026-06-05', '08:00:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat\r\nmabigus SDN bojong jengkol 3', 'uploads/before_6a2225cb694195.47561617.jpg', 'uploads/after_6a2225cb694227.96994247.jpg', '2026-06-05 01:26:35', 'KH-20260605-000057', 'alive'),
(58, -6.549260, 106.696480, 'Jeruk', 'Citrus', '2026-06-05', '08:22:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga tanaman ini memberi manfaat kepada kita semua dimasa depan # mabigus sdn cibanteng 01', 'uploads/before_6a2225ed188289.11790715.jpg', 'uploads/after_6a2225ed188310.52033542.jpg', '2026-06-05 01:27:09', 'KH-20260605-000058', 'alive'),
(59, -6.550840, 106.696870, 'Pohon mangga', '', '2026-06-05', '08:25:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga pohon ini bermanfaat\r\nSDN Ciampea 05', 'uploads/before_6a222608dde920.99015509.jpg', 'uploads/after_6a222608dde9b6.80336879.jpg', '2026-06-05 01:27:36', 'KH-20260605-000059', 'alive'),
(60, -6.549240, 106.696450, 'durian', 'durian', '2026-06-05', '08:00:00', 80, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat\r\nmabigus cicadas 3', 'uploads/before_6a222646dc82b9.35558269.jpg', 'uploads/after_6a222646dc8358.17565010.jpg', '2026-06-05 01:28:38', 'KH-20260605-000060', 'alive'),
(61, -6.549360, 106.696190, 'Sirsak', 'Cocos nucifera macrocorpu', '2026-06-05', '08:00:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga pohon ini tumbuh sesuai harapan dan menjadi bekal anak cucu kita yang akan menikmati hasilnya. Ari Setiawati, S.Pd. SD Ketua Kwarran Ciampea', 'uploads/before_6a222647e8d6f0.05626858.jpg', 'uploads/after_6a222647e8d760.87780709.jpg', '2026-06-05 01:28:39', 'KH-20260605-000061', 'alive'),
(62, -6.549230, 106.696460, 'Jambu', 'Genus', '2026-06-05', '08:27:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga manfaat # sdn cihideung ilir 5', 'uploads/before_6a222670777ef3.78570313.jpg', 'uploads/after_6a222670777f67.84061415.jpg', '2026-06-05 01:29:20', 'KH-20260605-000062', 'alive'),
(63, -6.549270, 106.696430, 'Jambu  biji', 'Genus', '2026-06-05', '08:30:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semiga bermanfaat Sdn cibanteng 1', 'uploads/before_6a2226c9000665.35831133.jpg', 'uploads/after_6a2226c90006f6.75776997.jpg', '2026-06-05 01:30:49', 'KH-20260605-000063', 'alive'),
(64, -6.549400, 106.694580, 'Kelengkeng', '', '2026-06-05', '08:00:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Ibu Erna Wati Mabigus SDN 01 cicadas', 'uploads/before_6a2226f198ca42.67731836.jpg', 'uploads/after_6a2226f198cab5.54425681.jpg', '2026-06-05 01:31:29', 'KH-20260605-000064', 'alive'),
(65, -6.550840, 106.696870, 'Pohon mangga', '', '2026-06-05', '08:27:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga pohon ini bermanfaat \r\nSDN CICADAS 02 - Yayan Suyeti, S.Pd', 'uploads/before_6a2226fdae11c4.18678762.jpg', 'uploads/after_6a2226fdae1248.23729668.jpg', '2026-06-05 01:31:41', 'KH-20260605-000065', 'alive'),
(66, -6.549210, 106.696430, 'manggis', 'manggis', '2026-06-05', '08:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat\r\nmabigus ciampea udik 1', 'uploads/before_6a22271a242b89.57881591.jpg', 'uploads/after_6a22271a242c15.06940606.jpg', '2026-06-05 01:32:10', 'KH-20260605-000066', 'alive'),
(67, -6.549190, 106.696380, 'Jeruk', 'Citrus', '2026-06-05', '08:31:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Kita menanam pohon untum masa depan # mabigus sdn bojongrangkas 01', 'uploads/before_6a222749defb81.43110653.jpg', 'uploads/after_6a222749defc20.96284743.jpg', '2026-06-05 01:32:57', 'KH-20260605-000067', 'alive'),
(68, -6.549400, 106.694580, 'durian', 'durian', '2026-06-05', '08:00:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Ka Syamsudin S.pd SDN ciampea 02, mudah -mudahan bumi kita lestari', 'uploads/before_6a2227632b22f2.18033478.jpg', 'uploads/after_6a2227632b2367.94949975.jpg', '2026-06-05 01:33:23', 'KH-20260605-000068', 'alive'),
(69, -6.550840, 106.696870, 'Pohon durian', '', '2026-06-05', '08:32:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga pohon ini bermanfaat \r\nSDN Ciampea Udik 03', 'uploads/before_6a2227acd85626.12957787.jpg', 'uploads/after_6a2227acd85685.82905087.jpg', '2026-06-05 01:34:36', 'KH-20260605-000069', 'alive'),
(70, -6.549200, 106.696390, 'manggis', 'manggis', '2026-06-05', '08:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat\r\nmabigus cicadas 3', 'uploads/before_6a2227d7d8f595.68844788.jpg', 'uploads/after_6a2227d7d8f607.51347775.jpg', '2026-06-05 01:35:19', 'KH-20260605-000070', 'alive'),
(71, -6.549400, 106.694530, 'Jambu air', 'Genus', '2026-06-05', '08:29:00', 90, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Yuni Widiastuti Mabigus SDN Tegal waru 02,', 'uploads/before_6a2227e4975fb3.34079801.jpg', 'uploads/after_6a2227e4976055.75892858.jpg', '2026-06-05 01:35:32', 'KH-20260605-000071', 'alive'),
(72, -6.549180, 106.696380, 'Nangka', 'Artocarpus', '2026-06-05', '08:34:00', 80, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Kita hijaukan kembali indonesia -pembina SMK Pelita ciampea', 'uploads/before_6a222838c21e87.46703071.jpg', 'uploads/after_6a222838c21ef7.53272577.jpg', '2026-06-05 01:36:56', 'KH-20260605-000072', 'alive'),
(73, -6.549400, 106.694530, 'Alpukat', '', '2026-06-05', '09:05:00', 90, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Rudi Herlambang Mabigus SDN Ciampea 01, semoga penanaman pohon ini bisa berhasil berbuah dan bisa dimanfaatkan di desa ini', 'uploads/before_6a2228605d1920.99876113.jpg', 'uploads/after_6a2228605d19a5.13940843.jpg', '2026-06-05 01:37:36', 'KH-20260605-000073', 'alive'),
(74, -6.550840, 106.696870, 'Pohon sawo', '', '2026-06-05', '08:34:00', 80, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga pohon ini bermanfaat \r\nSDN Cibadak 02 - Djuhana, S.Pd', 'uploads/before_6a222863cd8022.03870071.jpg', 'uploads/after_6a222863cd80d8.75838233.jpg', '2026-06-05 01:37:39', 'KH-20260605-000074', 'alive'),
(75, -6.549220, 106.696270, 'Pohon durian', 'durian', '2026-06-05', '08:30:00', 55, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat bagi masyarakat desa benteng\r\nmabigus SD dibantu 3', 'uploads/before_6a2228e19fc4c9.22590033.jpg', 'uploads/after_6a2228e19fc554.49819384.jpg', '2026-06-05 01:39:45', 'KH-20260605-000075', 'alive'),
(76, -6.549310, 106.696520, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:38:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Mudah2an tumbuh subur #mabigus cilir 03', 'uploads/before_6a2228f64f4de9.02815612.jpg', 'uploads/after_6a2228f64f4e78.13187980.jpg', '2026-06-05 01:40:06', 'KH-20260605-000076', 'alive'),
(77, -6.549390, 106.696230, 'Kelapa gading', '', '2026-06-05', '21:40:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga tumbuh sempurna dan berbuah lebih cepat kak suha da Mabigus SDN Cihideung udik 04', 'uploads/before_6a22294522fd21.28922565.jpg', 'uploads/after_6a22294522fdb5.82215399.jpg', '2026-06-05 01:41:25', 'KH-20260605-000077', 'alive'),
(78, -6.549150, 106.696350, 'pohon palem', 'palem', '2026-06-05', '08:40:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat\r\nsdit miftahul sudur', 'uploads/before_6a2229860f87a9.08521262.jpg', 'uploads/after_6a2229860f8822.13058123.jpg', '2026-06-05 01:42:30', 'KH-20260605-000078', 'alive'),
(79, -6.549300, 106.696400, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:39:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga pohon ini bisa tumbuh dengan baik SDN cicadas 02', 'uploads/before_6a222999d2d0b4.86919190.jpg', 'uploads/after_6a222999d2d141.35053132.jpg', '2026-06-05 01:42:49', 'KH-20260605-000079', 'alive'),
(80, -6.549400, 106.694530, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-05', '08:00:00', 150, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga akanenjadi desa benteng khususnyaaka hijau dinikmati oleh anak cucu kitnanti oleh Mabigus SDN cicadas 01Kak Ernawati S.Pd.', 'uploads/before_6a2229f3238996.62832602.jpg', 'uploads/after_6a2229f3238a05.24681531.jpg', '2026-06-05 01:44:19', 'KH-20260605-000080', 'alive'),
(81, -6.549170, 106.696360, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:42:00', 80, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat SDN Cibanteng 01', 'uploads/before_6a222a02b57570.73815237.jpg', 'uploads/after_6a222a02b57613.31618956.jpg', '2026-06-05 01:44:34', 'KH-20260605-000081', 'alive'),
(82, -6.549160, 106.696370, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:45:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat bagi kita semua', 'uploads/before_6a222a2f83ab44.99973128.jpg', 'uploads/after_6a222a2f83abe3.82764479.jpg', '2026-06-05 01:45:19', 'KH-20260605-000082', 'alive'),
(83, -6.549140, 106.696380, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:46:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Tumbuh bermanfaat sdn cibantemg 01', 'uploads/before_6a222a84bf7093.74719052.jpg', 'uploads/after_6a222a84bf70f8.30366222.jpg', '2026-06-05 01:46:44', 'KH-20260605-000083', 'alive'),
(84, -6.549150, 106.696310, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:50:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat\r\nmabigus cihideng ilir 5', 'uploads/before_6a222abaaa2411.68115177.jpg', 'uploads/after_6a222abaaa24a0.07098240.jpg', '2026-06-05 01:47:38', 'KH-20260605-000084', 'alive'),
(85, -6.549180, 106.696370, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:47:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat Pramuka SMK Pelita ciampea', 'uploads/before_6a222ae7eab221.91543525.jpg', 'uploads/after_6a222ae7eab291.90829895.jpg', '2026-06-05 01:48:23', 'KH-20260605-000085', 'alive'),
(86, -6.549400, 106.694530, 'Kelap merah', 'Cocos nucifera sakarina', '2026-06-05', '08:34:00', 100, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga tumbuh 15 th kedepan dan bisa dimanfaatkan oleh warga setempat. Oleh Mabigus ciampea 01 ka Rudi Herlambang S.Pd', 'uploads/before_6a222af1c4b3f1.71249740.jpg', 'uploads/after_6a222af1c4b457.35024717.jpg', '2026-06-05 01:48:33', 'KH-20260605-000086', 'alive'),
(87, -6.549200, 106.696310, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:51:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat untuk alam\r\nmabigus cibadak 01', 'uploads/before_6a222b3915f9c5.90450604.jpg', 'uploads/after_6a222b3915fa20.97930037.jpg', '2026-06-05 01:49:45', 'KH-20260605-000087', 'alive'),
(88, -6.549180, 106.696360, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:48:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat smp pelita vimapea', 'uploads/before_6a222b688b2760.13488044.jpg', 'uploads/after_6a222b688b27e0.07298579.jpg', '2026-06-05 01:50:32', 'KH-20260605-000088', 'alive'),
(89, -6.549410, 106.696410, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '09:06:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Satu tunas sejuta harapan Pramuka menanam bumi tersenyum oleh Mabigus SDN Tegal waru 02 kak Yuni Widiastuti S.Pd', 'uploads/before_6a222ba736eaf4.88521224.jpg', 'uploads/after_6a222ba736eb77.26993046.jpg', '2026-06-05 01:51:35', 'KH-20260605-000089', 'alive'),
(90, -6.549080, 106.694530, 'Pohon durian', 'durian', '2026-06-05', '08:50:00', 650, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Tanam durian untuk masa depan # mabigus ciampea 02', 'uploads/before_6a222bc080d008.67688362.jpg', 'uploads/after_6a222bc080d0f1.01520137.jpg', '2026-06-05 01:52:00', 'KH-20260605-000090', 'alive'),
(91, -6.549310, 106.696460, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:50:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga berguna untuk masa deoan\r\nmabigus sd bangle', 'uploads/before_6a222bf3dd4ec2.79164126.jpg', 'uploads/after_6a222bf3dd4f30.10852717.jpg', '2026-06-05 01:52:51', 'KH-20260605-000091', 'alive'),
(92, -6.549100, 106.696370, 'durian', 'durian', '2026-06-05', '08:50:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat mabigus bojong rangkas 02', 'uploads/before_6a222c326e9381.31242053.jpg', 'uploads/after_6a222c326e9417.65080307.jpg', '2026-06-05 01:53:54', 'KH-20260605-000092', 'alive'),
(93, -6.551570, 106.696740, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-05', '09:00:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat', 'uploads/before_6a222c7fa74be4.98167259.jpg', 'uploads/after_6a222c7fa74c53.35438820.jpg', '2026-06-05 01:55:11', 'KH-20260605-000093', 'alive'),
(94, -6.549230, 106.696400, 'pohon jambu', 'jambu', '2026-06-05', '08:55:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat untuk kita semua', 'uploads/before_6a222c970313a0.95077673.jpg', 'uploads/after_6a222c97031447.93491991.jpg', '2026-06-05 01:55:35', 'KH-20260605-000094', 'alive'),
(95, -6.549360, 106.696530, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '08:55:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bisa manfaat untuk alam - ketua dkr ciampea', 'uploads/before_6a222d2575e821.89395086.jpg', 'uploads/after_6a222d2575e8a3.66100309.jpg', '2026-06-05 01:57:57', 'KH-20260605-000095', 'alive'),
(96, -6.549110, 106.696250, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '09:00:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga pohon ini tumbuh baik dan bermanfaat \r\nMuhammad Asep Mi\'roz - Kwarran ciampea', 'uploads/before_6a222e051f5035.79448618.jpg', 'uploads/after_6a222e051f50c8.41451417.jpg', '2026-06-05 02:01:41', 'KH-20260605-000096', 'alive'),
(97, -6.549230, 106.696350, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '09:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat untuk kita semua', 'uploads/before_6a222e4b7e60b2.87104854.jpg', 'uploads/after_6a222e4b7e6142.49072156.jpg', '2026-06-05 02:02:51', 'KH-20260605-000097', 'alive'),
(98, -6.549120, 106.696260, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '09:04:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga pohon ini tumbuh dan berkembang bermanfaat \r\nM. Fikri - Kominfo ciampea', 'uploads/before_6a222eb1b02096.27085875.jpg', 'uploads/after_6a222eb1b02117.26444430.jpg', '2026-06-05 02:04:33', 'KH-20260605-000098', 'alive'),
(99, -6.549100, 106.696360, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '09:05:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat', 'uploads/before_6a222f398b80c6.62871747.jpg', 'uploads/after_6a222f398b8140.74732733.jpg', '2026-06-05 02:06:49', 'KH-20260605-000099', 'alive'),
(100, -6.549090, 106.696290, 'Pohon jambu', 'jambu', '2026-06-05', '09:05:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermamfaat julianto', 'uploads/before_6a222f6f14f4b4.37616943.jpg', 'uploads/after_6a222f6f14f533.02851464.jpg', '2026-06-05 02:07:43', 'KH-20260605-000100', 'alive'),
(101, -6.549120, 106.696340, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-06-05', '09:05:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat smpn 1 ciamprea', 'uploads/before_6a222fe2ad2ea6.24374654.jpg', 'uploads/after_6a222fe2ad2f15.04017556.jpg', '2026-06-05 02:09:38', 'KH-20260605-000101', 'alive'),
(102, -6.549080, 106.696310, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '09:10:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat pohon ini', 'uploads/before_6a22308100b8c1.15923173.jpg', 'uploads/after_6a22308100b956.88535622.jpg', '2026-06-05 02:12:17', 'KH-20260605-000102', 'alive'),
(103, -6.549120, 106.696310, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '09:10:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga manfaat', 'uploads/before_6a2230af4b5ff4.85623492.jpg', 'uploads/after_6a2230af4b60a1.79115793.jpg', '2026-06-05 02:13:03', 'KH-20260605-000103', 'alive'),
(104, -6.549100, 106.696310, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '09:14:00', 40, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga manfaat  ka anto ciampea', 'uploads/before_6a22311976c2a4.39770551.jpg', 'uploads/after_6a22311976c345.31950322.jpg', '2026-06-05 02:14:49', 'KH-20260605-000104', 'alive'),
(105, -6.549320, 106.696470, 'durian', 'durian', '2026-06-05', '13:45:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga duren ini manis - tari smpn1 ciampea', 'uploads/before_6a2270f1479569.36279712.jpg', 'uploads/after_6a2270f1479609.45198982.jpg', '2026-06-05 06:47:13', 'KH-20260605-000105', 'alive'),
(106, -6.549160, 106.696310, 'lengkeng', 'lengkeng', '2026-06-05', '13:47:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Tumbuh lebih baik untuk negeri - fatimah smpn 1 ciampea', 'uploads/before_6a2271c536ca67.27442667.jpg', 'uploads/after_6a2271c536cb09.82163212.jpg', '2026-06-05 06:50:45', 'KH-20260605-000106', 'alive'),
(107, -6.549110, 106.696330, 'Jambu', 'Genus', '2026-06-05', '13:51:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga menumbuhkan rasa semangat\r\nsyahira SMK pelita Ciampea', 'uploads/before_6a2272735c0903.52121191.jpg', 'uploads/after_6a2272735c0976.23785852.jpg', '2026-06-05 06:53:39', 'KH-20260605-000107', 'alive'),
(108, -6.549180, 106.696340, 'Jambu', 'Genus', '2026-06-05', '13:52:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga jambu ini tumbuh keren _ghufron smpn 1 ciampea', 'uploads/before_6a2272b5c9e692.40285542.jpg', 'uploads/after_6a2272b5c9e838.90546991.jpg', '2026-06-05 06:54:45', 'KH-20260605-000108', 'alive'),
(109, -6.549500, 106.696020, 'lengkeng', 'lengkeng', '2026-06-05', '13:49:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga lengkengnya berbuah manis kaya amel', 'uploads/before_6a2274d0f23ba4.57293626.jpg', 'uploads/after_6a2274d0f23c29.63450312.jpg', '2026-06-05 07:03:44', 'KH-20260605-000109', 'alive'),
(110, -6.549450, 106.696020, 'jambu biji', 'Genus', '2026-06-05', '14:05:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga jika nanti kau tlah tumbuh besar dan subur aku akan menjemput dan memakan buah mu —Ega Febriano', 'uploads/before_6a227669478290.55919972.jpg', 'uploads/after_6a227669478318.87895519.jpg', '2026-06-05 07:10:33', 'KH-20260605-000110', 'alive'),
(111, -6.549430, 106.696010, 'Alpukat', 'Alpukat', '2026-06-05', '14:09:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat - indri smpn1ciampea', 'uploads/before_6a22769e81f297.47204590.jpg', 'uploads/after_6a22769e81f313.05780734.jpg', '2026-06-05 07:11:26', 'KH-20260605-000111', 'alive'),
(112, -6.549460, 106.696000, 'Jambu', 'Genus', '2026-06-05', '14:10:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga tumbuh subur _nabila putri smpn1 ciampea', 'uploads/before_6a227723ef7b30.58297074.jpg', 'uploads/after_6a227723ef7bd8.55242416.jpg', '2026-06-05 07:13:39', 'KH-20260605-000112', 'alive'),
(113, -6.549470, 106.695970, 'mangga', 'Manggo', '2026-06-05', '14:15:00', 100, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat - wilda smpn1ciampea', 'uploads/before_6a22781fc36d27.85258359.jpg', 'uploads/after_6a22781fc36dc9.11667043.jpg', '2026-06-05 07:17:51', 'KH-20260605-000113', 'alive'),
(114, -6.549420, 106.695990, 'durian', 'durian', '2026-06-05', '14:18:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat -fikri smk pelita', 'uploads/before_6a2278bc2c8820.29426636.jpg', 'uploads/after_6a2278bc2c88b7.86321715.jpg', '2026-06-05 07:20:28', 'KH-20260605-000114', 'alive'),
(115, -6.549390, 106.695990, 'mangga', 'Genus', '2026-06-05', '14:00:00', 20, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga pohon mangga ini tumbuh dengan segar\r\nfariha qorina pasha SMK pelita', 'uploads/before_6a22793a852377.29967507.jpg', 'uploads/after_6a22793a8523f7.06891560.jpg', '2026-06-05 07:22:34', 'KH-20260605-000115', 'alive'),
(116, -6.549490, 106.695990, 'pohon jambu', 'jambu', '2026-06-05', '14:20:00', 80, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga pohon jambu ini tumbuh subur dan berbuah banyak agar buahnya dapat di konsumsi bersama \r\n—Zidny Nurul Ilmi', 'uploads/before_6a22796271dd67.57147819.jpg', 'uploads/after_6a22796271de01.24470962.jpg', '2026-06-05 07:23:14', 'KH-20260605-000116', 'alive'),
(117, -6.549410, 106.695950, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '14:27:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat -gita smp pelita', 'uploads/before_6a227aad0aad44.38918323.jpg', 'uploads/after_6a227aad0aadf7.42033050.jpg', '2026-06-05 07:28:45', 'KH-20260605-000117', 'alive'),
(118, -6.549410, 106.696030, 'mangga', 'Genus', '2026-06-05', '14:27:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat untuk masa depan\r\n\r\nNESYA SMP PELITA', 'uploads/before_6a227b0ba3b199.44729530.jpg', 'uploads/after_6a227b0ba3b221.76614365.jpg', '2026-06-05 07:30:19', 'KH-20260605-000118', 'alive'),
(119, -6.549410, 106.695940, 'lengkeng', 'lengkeng', '2026-06-05', '14:29:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga bermanfaat _nabila smp pelita', 'uploads/before_6a227b5e322634.04500913.jpg', 'uploads/after_6a227b5e3226b8.45586047.jpg', '2026-06-05 07:31:42', 'KH-20260605-000119', 'alive'),
(120, -6.549360, 106.695970, 'Nangka', 'Artocarpus', '2026-06-05', '14:00:00', 20, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Zhidan Ramdhani smp pelita\r\nsemoga pohon ini tumbuh segar', 'uploads/before_6a227b75d9aca2.28591472.jpg', 'uploads/after_6a227b75d9ad23.53166844.jpg', '2026-06-05 07:32:05', 'KH-20260605-000120', 'alive'),
(121, -6.549390, 106.695950, 'durian', 'durian', '2026-06-05', '14:32:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Manfaat deswita smp pelita', 'uploads/before_6a227bb122cbd9.08808648.jpg', 'uploads/after_6a227bb122cc32.58958311.jpg', '2026-06-05 07:33:05', 'KH-20260605-000121', 'alive'),
(122, -6.549430, 106.696010, 'Jambu', 'Genus', '2026-06-05', '14:33:00', 20, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga tumbuh subur\r\n\r\nArka gila pratama SMP PELITA', 'uploads/before_6a227be7969531.10452559.jpg', 'uploads/after_6a227be79695e8.00685206.jpg', '2026-06-05 07:33:59', 'KH-20260605-000122', 'alive'),
(123, -6.549370, 106.695970, 'Jambu  biji', 'Genus', '2026-06-05', '14:00:00', 20, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Anggun smp pelita\r\ntumbuh lebih besar untuk dunia', 'uploads/before_6a227c2d662929.21862550.jpg', 'uploads/after_6a227c2d6629d0.54242374.jpg', '2026-06-05 07:35:09', 'KH-20260605-000123', 'alive'),
(124, -6.549410, 106.695950, 'Pucuk merah', 'Cocos nucifera sakarina', '2026-06-05', '14:34:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Manfaat salwa smp pelita', 'uploads/before_6a227c634027d5.20609422.jpg', 'uploads/after_6a227c63402857.03030556.jpg', '2026-06-05 07:36:03', 'KH-20260605-000124', 'alive'),
(125, -6.549340, 106.695970, 'Kelapa Manis', 'Cocos nucifera sakarina', '2026-06-05', '15:00:00', 20, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'faal smp pelita\r\nlebih banyak pohon lebih baik', 'uploads/before_6a227ccc69ca43.82862435.jpg', 'uploads/after_6a227ccc69cad5.16787299.jpg', '2026-06-05 07:37:48', 'KH-20260605-000125', 'alive'),
(126, -6.549400, 106.695970, 'Jambu', 'Genus', '2026-06-05', '14:37:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Manfaaat deswita smp pelita', 'uploads/before_6a227cd31aa507.40436514.jpg', 'uploads/after_6a227cd31aa598.16884386.jpg', '2026-06-05 07:37:55', 'KH-20260605-000126', 'alive'),
(127, -6.549380, 106.695950, 'Puyuh', 'Cocos nucifera pumila', '2026-06-05', '14:37:00', 10, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga tumbuh lebat\r\n\r\naqila SMP pelita', 'uploads/before_6a227d0a26faa7.21370274.jpg', 'uploads/after_6a227d0a26fb61.11636731.jpg', '2026-06-05 07:38:50', 'KH-20260605-000127', 'alive'),
(128, -6.549420, 106.695980, 'Jambu  biji', 'Genus', '2026-06-05', '14:38:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga manfaat budi smp pelita', 'uploads/before_6a227d71aa6141.29204252.jpg', 'uploads/after_6a227d71aa61b4.80994869.jpg', '2026-06-05 07:40:33', 'KH-20260605-000128', 'alive'),
(129, -6.549450, 106.695990, 'Jambu air', 'Genus', '2026-06-05', '14:39:00', 15, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'menjadikan Indonesia tumbuh hijau\r\n\r\nraihan SMP pelita', 'uploads/before_6a227d8a373aa1.96131142.jpg', 'uploads/after_6a227d8a373b39.48792554.jpg', '2026-06-05 07:40:58', 'KH-20260605-000129', 'alive'),
(130, -6.549370, 106.695920, 'Jeruk', 'Citrus', '2026-06-05', '14:00:00', 20, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'anaqi smp pelita\r\nsemoga pohon ini tumbuh dengan lebat', 'uploads/before_6a227de1ca01c8.24341729.jpg', 'uploads/after_6a227de1ca0270.20813108.jpg', '2026-06-05 07:42:25', 'KH-20260605-000130', 'alive'),
(131, -6.549460, 106.696030, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '14:40:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Semoga manfaat smp pelita', 'uploads/before_6a227e057e1f01.71069159.jpg', 'uploads/after_6a227e057e1f80.44443938.jpg', '2026-06-05 07:43:01', 'KH-20260605-000131', 'alive'),
(132, -6.549390, 106.696300, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '14:47:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Manfaat', 'uploads/before_6a227f473d1ab7.23183621.jpg', 'uploads/after_6a227f473d1b40.06998833.jpg', '2026-06-05 07:48:23', 'KH-20260605-000132', 'alive'),
(133, -6.549360, 106.696320, 'Jambu', 'Genus', '2026-06-05', '14:48:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga tumbuh\r\n\r\ntaszqi SMP pelita', 'uploads/before_6a227f64f3acc6.71111977.jpg', 'uploads/after_6a227f64f3ad71.07985490.jpg', '2026-06-05 07:48:52', 'KH-20260605-000133', 'alive'),
(134, -6.549440, 106.696350, 'mangga', 'Manggo', '2026-06-05', '14:50:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'Manfaat', 'uploads/before_6a22802ec4fec1.67991038.jpg', 'uploads/after_6a22802ec4ff86.11289889.jpg', '2026-06-05 07:52:14', 'KH-20260605-000134', 'alive'),
(135, -6.549480, 106.696410, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '14:52:00', 10, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga tumbuh\r\n\r\nnabila SMP pelita', 'uploads/before_6a22805dbdfab4.04734088.jpg', 'uploads/after_6a22805dbdfb40.27485508.jpg', '2026-06-05 07:53:01', 'KH-20260605-000135', 'alive'),
(136, -6.549380, 106.696390, 'Kelap merah', 'Cocos nucifera sakarina', '2026-06-05', '14:00:00', 20, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'gita smp pelita\r\nkita tanami pohon', 'uploads/before_6a2280b8baa310.80274382.jpg', 'uploads/after_6a2280b8baa3b3.34138430.jpg', '2026-06-05 07:54:32', 'KH-20260605-000136', 'alive'),
(137, -6.549340, 106.696450, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '14:54:00', 10, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'semoga bermanfaat\r\n\r\ntasya SMP pelita', 'uploads/before_6a228152b34882.13157460.jpg', 'uploads/after_6a228152b34927.43360784.jpg', '2026-06-05 07:57:06', 'KH-20260605-000137', 'alive'),
(138, -6.549360, 106.696430, 'Kelap merah', 'Cocos nucifera sakarina', '2026-06-05', '15:00:00', 20, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'dirga smp pelita\r\nperbanyak pohon disekitar kita', 'uploads/before_6a2281d8e65517.81526282.jpg', 'uploads/after_6a2281d8e655a4.03606164.jpg', '2026-06-05 07:59:20', 'KH-20260605-000138', 'alive'),
(139, -6.549440, 106.696420, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '14:59:00', 10, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'bermanfaat\r\n\r\nAdit SMP pelita', 'uploads/before_6a22820c1146d8.95713859.jpg', 'uploads/after_6a22820c1148b5.89456801.jpg', '2026-06-05 08:00:12', 'KH-20260605-000139', 'alive'),
(140, -6.549470, 106.696430, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '15:00:00', 10, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'aamiin\r\n\r\ndeswita SMP pelita', 'uploads/before_6a228252630513.09924118.jpg', 'uploads/after_6a228252630594.55458850.jpg', '2026-06-05 08:01:22', 'KH-20260605-000140', 'alive'),
(141, -6.549510, 106.696440, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '15:03:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'bermanfaat\r\nSMP pelita', 'uploads/before_6a2282fa28eaf9.87085185.jpg', 'uploads/after_6a2282fa28eba5.72619073.jpg', '2026-06-05 08:04:10', 'KH-20260605-000141', 'alive'),
(142, -6.549360, 106.696380, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '15:00:00', 20, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'arka smp pelita\r\ntumbuh dengan subur pohon', 'uploads/before_6a228441027568.36056606.jpg', 'uploads/after_6a228441027604.31641596.jpg', '2026-06-05 08:09:37', 'KH-20260605-000142', 'alive'),
(143, -6.549460, 106.696370, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-06-05', '15:08:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'kita hijaukan Indonesia\r\n\r\nfaal SMP pelita', 'uploads/before_6a2284ab5e54a7.09792505.jpg', 'uploads/after_6a2284ab5e5516.40662723.jpg', '2026-06-05 08:11:23', 'KH-20260605-000143', 'alive'),
(144, -6.549520, 106.696330, 'lengkeng', 'lengkeng', '2026-06-05', '15:14:00', 10, 'Swadaya / Beli Sendiri', 'kwarran.ciampea', 'yang penting tumbuh\r\nfikri SMK pelita', 'uploads/before_6a2285bad9d850.01908865.jpg', 'uploads/after_6a2285bad9d8d9.28979140.jpg', '2026-06-05 08:15:54', 'KH-20260605-000144', 'alive');
INSERT INTO `trees` (`id`, `lat`, `lng`, `nama_lokal`, `nama_latin`, `tanggal_tanam`, `jam_tanam`, `tinggi_cm`, `asal_bibit`, `penanam`, `cerita`, `foto_sebelum`, `foto_sesudah`, `created_at`, `serial_no`, `status`) VALUES
(145, -6.459160, 106.664720, 'Pohon Kelapa', 'Cocos Nucifera', '2026-06-19', '13:05:00', 100, 'Swadaya / Beli Sendiri', 'kwarran.rumpin', 'Semoga pohon ini menjadi manfaat ( Dedeh Setiawati SD N Kampung Sawah 01)', 'uploads/before_6a380506a52ee0.16883521.jpg', 'uploads/after_6a380506a52f97.77539332.jpg', '2026-06-21 15:36:38', 'KH-20260621-000145', 'alive'),
(146, -6.445330, 107.064430, 'Pohon Kelapa', 'Cocos Nucifera', '2026-07-03', '11:00:00', 80, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'saya harap pohon ini bisa berguna untuk kedepannya', 'uploads/before_6a4743d2c3abb4.44797366.jpg', 'uploads/after_6a4743d2c3ac35.86031383.jpg', '2026-07-03 05:08:34', 'KH-20260703-000146', 'alive'),
(147, -6.485560, 107.060360, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '10:30:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'pohon tidak langsung besar, dia mulai dari tunas kecil yang berani ditanam. begitu juga kamu, berproses terus walau pelan. (Geby Azzahro)', 'uploads/before_6a474923a937d9.85961073.jpg', 'uploads/after_6a474923a93869.93105853.jpg', '2026-07-03 05:31:15', 'KH-20260703-000147', 'alive'),
(148, -6.468470, 107.059920, 'Kelapa hijau', 'Cocos Nucifera', '2026-07-03', '10:00:00', 75, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Saya berharap pohon kelapa ini tumbuh dengan subur dan bermanfaat bagi generasi selanjutnya (Velliza Natania)', 'uploads/before_6a474d50469523.28166884.jpg', 'uploads/after_6a474d50469598.71454794.jpg', '2026-07-03 05:49:04', 'KH-20260703-000148', 'alive'),
(149, -6.467710, 107.054790, 'Pohon Kelapa', 'Cocos Nucifera', '2026-07-03', '08:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Semoga tanaman ini bisa bermanfaat bagi kehidupan beberapa tahun kedepan (Neng Dian Cahya Damhudi)', 'uploads/before_6a475b00f0d880.91561745.jpg', 'uploads/after_6a475b00f0d924.27963588.jpg', '2026-07-03 06:47:28', 'KH-20260703-000149', 'alive'),
(150, -6.467210, 107.059810, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '08:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Saya berharap tunas kelapa ini dapat menjadi pohon yang kuat, bermanfaat dan berguna bagi generasi yang akan datang. \"Jadilah seperti pohon kelapa. Setiap bagiannya berguna bagi sesama. Mulai dari akar, batang, daun hingga buahnya.\" (Anna Permatasari)', 'uploads/before_6a47626c810b51.30574815.jpg', 'uploads/after_6a47626c810bb1.92453078.jpg', '2026-07-03 07:19:08', 'KH-20260703-000150', 'alive'),
(151, -6.467330, 107.059520, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '08:00:00', 55, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Saya berharap tunas kelapa ini dapat menjadi pohon yang kuat, bermanfaat dan berguna bagi generasi yang akan datang. \"Jadilah seperti pohon kelapa. Setiap bagiannya berguna bagi sesama. Mulai dari akar, batang, daun hingga buahnya.\" (Anna Permatasari)', 'uploads/before_6a4766bcb98ed3.58101770.jpg', 'uploads/after_6a4766bcb98f42.21496619.jpg', '2026-07-03 07:37:32', 'KH-20260703-000151', 'alive'),
(152, -6.470290, 107.061780, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '01:55:00', 40, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'semoga tumbuh dengan baik', 'uploads/before_6a4769e9dc5f93.13806224.jpg', 'uploads/after_6a4769e9dc5ff5.89495866.jpg', '2026-07-03 07:51:05', 'KH-20260703-000152', 'alive'),
(153, -6.470290, 107.061780, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '01:10:00', 40, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'semoga tumbuh dan bermanfaat untuk saya dan orang orang di sekitar saya', 'uploads/before_6a476bbda99f93.35938611.jpg', 'uploads/after_6a476bbda9a015.41061164.jpg', '2026-07-03 07:58:53', 'KH-20260703-000153', 'alive'),
(154, -6.443930, 107.058740, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '03:00:00', 70, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Semoga pohon ini menjadi warisan untuk generasi masa depan(jonggol)', 'uploads/before_6a477b33d63d14.56692609.jpg', 'uploads/after_6a477b33d63da3.23013608.jpg', '2026-07-03 09:04:51', 'KH-20260703-000154', 'alive'),
(155, -6.443980, 107.058810, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '02:10:00', 68, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Semoga pohon ini berguna untuk masa depan (jonggol)', 'uploads/before_6a477c31122a02.71447212.jpg', 'uploads/after_6a477c31122a91.94664530.jpg', '2026-07-03 09:09:05', 'KH-20260703-000155', 'alive'),
(156, -6.443890, 107.058790, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '03:15:00', 62, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Semoga pohon ini dapat berguna untuk meneruskan generasi masa depan (jonggol)', 'uploads/before_6a477d0459a2c7.72924289.jpg', 'uploads/after_6a477d0459a360.23462996.jpg', '2026-07-03 09:12:36', 'KH-20260703-000156', 'alive'),
(157, -7.003840, 107.262620, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '17:00:00', 80, 'Swadaya / Beli Sendiri', 'kwarcab_bogorkab', 'Harapan saya setelah menanam kitri adalah kitri tersebut bisa tumbuh dengan baik dan subur supaya nantinya bisa berbuah lebat dan semua bagiannya dapat digunakan', 'uploads/before_6a4790804de4f7.53475802.jpg', 'uploads/after_6a4790804de575.92035474.jpg', '2026-07-03 10:35:44', 'KH-20260703-000157', 'alive'),
(158, -6.456080, 107.062120, 'Pohon Kelapa', 'Cocos Nucifera', '2026-07-04', '06:35:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'semoga pohon ini bermanfaat', 'uploads/before_6a485841034d79.91026017.jpg', 'uploads/after_6a485841034dd5.01092818.jpg', '2026-07-04 00:48:01', 'KH-20260704-000158', 'alive'),
(159, -6.468230, 107.059370, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-07-03', '16:00:00', 40, 'Hasil Pembibitan Sendiri', 'kwarran.jonggol', 'semoga pohon kelapa ini bermanfaat bagi masyarakat sekitar(Daffa)', 'uploads/before_6a48c2e34c65d6.07021745.jpg', 'uploads/after_6a48c2e34c6639.43859776.jpg', '2026-07-04 08:22:59', 'KH-20260704-000159', 'alive'),
(160, -6.452280, 107.052290, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-07-03', '17:10:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'semoga bermanfaat untuk generasi masa depan (Jonggol)', 'uploads/before_6a48c501d337d0.89084051.jpg', 'uploads/after_6a48c501d33924.39719969.jpg', '2026-07-04 08:32:01', 'KH-20260704-000160', 'alive'),
(161, -6.462970, 107.062100, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '03:50:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Semoga pohon ini bisa tumbuh dengan baik,dan bermanfaat bagi masyarakat (Irsyad)', 'uploads/before_6a48df2fbc9d88.62538718.jpg', 'uploads/after_6a48df2fbc9df6.34857153.jpg', '2026-07-04 10:23:43', 'KH-20260704-000161', 'alive'),
(162, -6.452350, 107.052340, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '17:20:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'semoga bermanfaat', 'uploads/before_6a48f7716f5a84.51421914.jpg', 'uploads/after_6a48f7716f5b09.12404026.jpg', '2026-07-04 12:07:13', 'KH-20260704-000162', 'alive'),
(163, -6.452800, 107.043920, 'Pohon Kelapa', 'Cocos Nucifera', '2026-07-05', '14:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Saya harap pohon ini bisa berkembang demi masa depan. (Evano Rafka)', 'uploads/before_6a4a0bbde98775.03128365.jpg', 'uploads/after_6a4a0bbde98803.06979038.jpg', '2026-07-05 07:46:05', 'KH-20260705-000163', 'alive'),
(164, -6.463460, 107.058580, 'Pohon Kelapa', 'Cocos Nucifera', '2026-07-05', '15:04:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'semoga bermanfaat dan tubuh dengan baik', 'uploads/before_6a4a11961bdd66.17846041.jpg', 'uploads/after_6a4a11961bdde2.71292133.jpg', '2026-07-05 08:11:02', 'KH-20260705-000164', 'alive'),
(165, -6.459530, 107.061460, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '08:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'semoga bermanfaat untuk kedepannya', 'uploads/before_6a4b211361c373.33440906.jpg', 'uploads/after_6a4b211361c406.69763500.jpg', '2026-07-06 03:29:23', 'KH-20260706-000165', 'alive'),
(166, -6.467910, 107.072750, 'Kelapa Merah', '-', '2026-07-06', '14:31:00', 70, 'Hasil Pembibitan Sendiri', 'kwarran.jonggol', 'semoga pohon dapat tumbuh hingga kami tua nanti', 'uploads/before_6a4b5a8c9a7469.24560584.jpg', 'uploads/after_6a4b5a8c9a74d6.43893824.jpg', '2026-07-06 07:34:36', 'KH-20260706-000166', 'alive'),
(167, -6.450320, 107.046090, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-06', '15:36:00', 50, 'Hasil Pembibitan Sendiri', 'kwarcab_bogorkab', 'semoga hal ini berguna, tanamannya berada di 6,46936 S, 107,05134 T', 'uploads/before_6a4bb8f2353306.05722595.jpg', 'uploads/after_6a4bb8f2353495.77249277.jpg', '2026-07-06 14:17:22', 'KH-20260706-000167', 'alive'),
(168, -6.467700, 107.054590, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-10', '17:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Semoga pohon yang saya tanam berguna bagi masyarakat untuk kedepannya', 'uploads/before_6a50c24b857997.77012897.jpg', 'uploads/after_6a50c24b857a17.32448285.jpg', '2026-07-10 09:58:35', 'KH-20260710-000168', 'alive'),
(169, -6.455700, 107.061950, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-03', '08:00:00', 75, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Semoga dengan penanaman Tunas Kelapa ini bisa bermanfaat bagi masyarakat sekitar\r\n-Fresi Liana Putri', 'uploads/before_6a585d71c72cb5.09685869.jpg', 'uploads/after_6a585d71c72d46.65589804.jpg', '2026-07-16 04:26:25', 'KH-20260716-000169', 'alive'),
(170, -6.438140, 106.631590, 'Pohon Kelapa', 'Cocos Nucifera', '2026-07-21', '10:00:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.rumpin', 'pohon kelapa SDN Cipinang 01\r\nHarapan kami semoga dengan menanam tunas kelapa adik-adik penggalang senantiasa mengingat dan menghayati makna lambang pramuka yang kita pakai seperti tunas kelapa yang sedang tumbuh, semoga kalian terus berkembang, memiliki akar yang kuat (iman dan taqwa) dan tumbuh menjadi pemuda yang kokoh serta siap menghadapi tantangan zaman.', 'uploads/before_6a5eededaf1d19.20724219.jpg', 'uploads/after_6a5eededaf1d77.23256039.jpg', '2026-07-21 03:56:29', 'KH-20260721-000170', 'alive'),
(171, -6.450450, 107.056110, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-24', '14:35:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'semoga tunas kelapa ini tumbuh subur dan bermanfaat bagi generasi yang mendatang. \r\n(indri, jihan, nazwa)', 'uploads/before_6a63174258d9d4.00787935.jpg', 'uploads/after_6a63174258da52.94402818.jpg', '2026-07-24 07:41:54', 'KH-20260724-000171', 'alive'),
(172, -6.460180, 107.060550, 'Kelapa Gading', 'Cocos nucifera eburnia', '2026-07-25', '15:43:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', '\"Cinta Alam dan Kasih Sayang Sesama Manusia\"          -Dzakwan, -Yohanes', 'uploads/before_6a656d9e997290.60662076.jpg', 'uploads/after_6a656d9e9972f5.97677959.jpg', '2026-07-26 02:14:54', 'KH-20260726-000172', 'alive'),
(173, -6.446680, 107.063880, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-07-26', '16:30:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'semoga kelapa yg saya dan teman saya tanam bermanfaat kedepannya dan tumbuh setinggi harapan saya', 'uploads/before_6a65e0f1520ed1.33501513.jpg', 'uploads/after_6a65e0f1520f53.68419770.jpg', '2026-07-26 10:26:57', 'KH-20260726-000173', 'alive'),
(174, -6.437060, 106.962190, 'Alpukat', 'Alpukat', '2026-07-25', '03:00:00', 35, 'Swadaya / Beli Sendiri', 'kwarran.cileungsi', 'ssmoga pohon ini bisa bermanfaat bagi masyarakat (adwisa)', 'uploads/before_6a674d27080451.28442007.jpg', 'uploads/after_6a674d27080512.45410749.jpg', '2026-07-27 12:20:55', 'KH-20260727-000174', 'alive'),
(175, -6.437060, 106.962170, 'Alpukat', 'Alpukat', '2026-07-25', '03:10:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cileungsi', 'Semoga buahnya bisa tumbuh banyak (adwisa)', 'uploads/before_6a674e0740dd15.93636435.jpg', 'uploads/after_6a674e0740dd88.92652040.jpg', '2026-07-27 12:24:39', 'KH-20260727-000175', 'alive'),
(176, -6.437040, 106.962150, 'Alpukat', 'Alpukat', '2026-07-25', '03:20:00', 20, 'Swadaya / Beli Sendiri', 'kwarran.cileungsi', 'semoga bermanfaat buat kita semua (adwisa)', 'uploads/before_6a674f9105d206.65007816.jpg', 'uploads/after_6a674f9105d2b9.91104755.jpg', '2026-07-27 12:31:13', 'KH-20260727-000176', 'alive'),
(177, -6.437030, 106.962180, 'Alpukat', 'Alpukat', '2026-07-25', '03:30:00', 25, 'Swadaya / Beli Sendiri', 'kwarran.cileungsi', 'semoga jadi ladang pahala untuk kita (adwisa)', 'uploads/before_6a674ff51bc172.22560312.jpg', 'uploads/after_6a674ff51bc1f4.05479930.jpg', '2026-07-27 12:32:53', 'KH-20260727-000177', 'alive'),
(178, -6.437780, 107.068540, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-08-11', '17:40:00', 80, 'Swadaya / Beli Sendiri', 'kwarcab_bogorkab', 'setelah menanam Tunas kelapa, saya berharap agar tumbuh menjadi subur dan berubah, serta semua bagiannya bisa digunakan', 'uploads/before_6a7b04b167ef55.86489034.jpg', 'uploads/after_6a7b04b167efc0.47697915.jpg', '2026-08-11 11:17:05', 'KH-20260811-000178', 'alive'),
(179, -6.666370, 106.922300, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Satu pohon yang di tanam hari ini memberikan sejuta manfaat untuk bumi (Sri Suryaningsih Ketua Kwarran Cisarua)', 'uploads/before_6a7ca26277d359.03988085.jpg', 'uploads/after_6a7ca26277d3c3.13989426.jpg', '2026-08-12 16:42:10', 'KH-20260812-000179', 'alive'),
(180, -6.665580, 106.921690, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 35, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Satu pohon yang di tanam hari ini memberikan sejuta manfaat untuk bumi (Heri Risdandar, Camat Cisarua selaku Ketua Kwarran)', 'uploads/before_6a7ca41cbedac4.30253349.jpg', 'uploads/after_6a7ca41cbedb31.65172357.jpg', '2026-08-12 16:49:32', 'KH-20260812-000180', 'alive'),
(181, 23.158760, 72.665100, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Satu pohon yang di tanam hari ini memberikan sejuta manfaat untuk bumi (Pengawas Kecamatan Cisarua Acep Sopandi)', 'uploads/before_6a7ca4ea7bbe00.19305421.jpg', 'uploads/after_6a7ca4ea7bbe78.24168947.jpg', '2026-08-12 16:52:58', 'KH-20260812-000181', 'alive'),
(182, -6.665580, 106.921690, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Satu pohon yang di tanam hari ini memberikan sejuta manfaat untuk bumi (Didi Suwardi Ketua K3S Kecamatan Cisarua)', 'uploads/before_6a7ca58a2e5f10.27712362.jpg', 'uploads/after_6a7ca58a2e5f72.31760212.jpg', '2026-08-12 16:55:38', 'KH-20260812-000182', 'alive'),
(183, -6.666130, 106.921150, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Satu pohon yang di tanam hari ini memberikan sejuta manfaat untuk bumi (Rusmana Ketua PGRI Kecamatan Cisarua)', 'uploads/before_6a7ca60460c271.17592778.jpg', 'uploads/after_6a7ca60460c2e1.08529064.jpg', '2026-08-12 16:57:40', 'KH-20260812-000183', 'alive'),
(184, -6.666370, 106.922210, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Semoga pohon yang ditanam menjadi sumber kesejukan dan manfaat bagi banyak kehidupan (KEPALA SDN BATULAYANG,Sumaryati,S.Pd)', 'uploads/before_6a7caf3e419130.08166785.jpg', 'uploads/after_6a7caf3e4191a6.49275838.jpg', '2026-08-12 17:37:02', 'KH-20260813-000184', 'alive'),
(185, -6.666370, 106.922210, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 35, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Semoga tunas-tunas yang tumbuh menjadi simbol persatuan, kepedulian, dan harapan untuk masa depan.(Kepala Sekolah SDN Sampay 1,Very Frima Kuswaya,S.Pd)', 'uploads/before_6a7cb004d585f2.02778633.jpg', 'uploads/after_6a7cb004d58686.30667876.jpg', '2026-08-12 17:40:20', 'KH-20260813-000185', 'alive'),
(186, -6.669610, 106.930460, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Mari membangun generasi yang tidak hanya cerdas, tetapi juga memiliki hati untuk mencintai dan menjaga alam.(KEPALA SDIT NUR IZZATI,Mulyanah,S.Pd.I)', 'uploads/before_6a7cb0c41680f7.41157867.jpg', 'uploads/after_6a7cb0c4168186.19832546.jpg', '2026-08-12 17:43:32', 'KH-20260813-000186', 'alive'),
(187, -6.669610, 106.930460, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Semoga langkah bersama ini menjadi inspirasi untuk menghadirkan lebih banyak ruang hijau di lingkungan kita.(KEPALA SDN TUGU UTARA 01,II NURPARIDA, S.Pd., M.M.)', 'uploads/before_6a7cb157021f64.77685699.jpg', 'uploads/after_6a7cb157022021.61824377.jpg', '2026-08-12 17:45:59', 'KH-20260813-000187', 'alive'),
(188, -6.669610, 106.930460, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Mari rawat apa yang telah kita tanam agar menjadi manfaat yang terus tumbuh sepanjang masa.(KEPALA SDN CISARUA 01,RODIAH USNUR, S.Pd.SD.)', 'uploads/before_6a7cb1f8895d55.56265476.jpg', 'uploads/after_6a7cb1f8895dd9.68709484.jpg', '2026-08-12 17:48:40', 'KH-20260813-000188', 'alive'),
(189, -6.669610, 106.930460, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Setiap pohon memiliki cerita tentang harapan; semoga yang kita tanam hari ini membawa cerita baik di masa depan.(SDN CIBEUREUM 02,YUSUP, S.Sos.I, S.Pd.SD.)', 'uploads/before_6a7cb2a97f6cc3.08510698.jpg', 'uploads/after_6a7cb2a97f6d66.66066392.jpg', '2026-08-12 17:51:37', 'KH-20260813-000189', 'alive'),
(190, -6.669610, 106.930460, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Semoga kebaikan yang diwujudkan hari ini menjadi kebermanfaatan bagi sesama dan alam sekitar.(MTS NAWAWI IKHSAN,Dr. Hj. Lilis Fauziah Balgis A.Hi.,M.H.,MA.Ek)', 'uploads/before_6a7cb3879d56e2.50028960.jpg', 'uploads/after_6a7cb3879d5750.54804119.jpg', '2026-08-12 17:55:19', 'KH-20260813-000190', 'alive'),
(191, -6.669610, 106.930460, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Semoga setiap tunas yang tumbuh menjadi simbol semangat untuk terus menjaga dan mencintai lingkungan.(KEPALA SDN CILEMBER 01,Ela Nurlaela Sari,M.Pd)', 'uploads/before_6a7cb503e3cb64.93420152.jpg', 'uploads/after_6a7cb503e3cbe8.19631687.jpg', '2026-08-12 18:01:39', 'KH-20260813-000191', 'alive'),
(192, -6.669610, 106.930460, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Pendidikan mengajarkan kita untuk tahu, kepedulian mengajarkan kita untuk bertindak; mari terus lakukan keduanya.(KEPALA SDN TUGU UTARA 02,HENDRI ISKANDAR KOSASIH, S.Pd.)', 'uploads/before_6a7cb5fb45e538.55887495.jpg', 'uploads/after_6a7cb5fb45e5c2.00474282.jpg', '2026-08-12 18:05:47', 'KH-20260813-000192', 'alive'),
(193, -6.669610, 106.930460, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-12', '10:00:00', 30, 'Swadaya / Beli Sendiri', 'kwarran.cisarua', 'Semoga kegiatan ini menumbuhkan semangat baru untuk menjadikan sekolah dan lingkungan semakin hijau.(KEPALA SDN KOPO 02,NENENG ROHAYATI, S.Pd.)', 'uploads/before_6a7cb68156e069.72146142.jpg', 'uploads/after_6a7cb68156e0e0.92996908.jpg', '2026-08-12 18:08:01', 'KH-20260813-000193', 'alive'),
(194, -6.455410, 107.062310, 'Kelapa', 'Cocos Nucifera', '2026-08-15', '15:50:00', 13, 'Swadaya / Beli Sendiri', 'kwarran.jonggol', 'Harapan kami semoga Tunas kelapa ini bisa tumbuh dengan baik dan subur dan berbuah', 'uploads/before_6a8028f26e47b2.01428191.jpg', 'uploads/after_6a8028f26e4854.87353147.jpg', '2026-08-15 08:53:06', 'KH-20260815-000194', 'alive'),
(195, -6.454470, 107.066130, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-08-02', '12:11:00', 50, 'Hasil Pembibitan Sendiri', 'kwarran.jonggol', 'semoga tunas tumbuh bisa bermanfaat untuk orang lain', 'uploads/before_6a87e101b0e925.17333487.jpg', 'uploads/after_6a87e101b0e999.28941359.jpg', '2026-08-21 05:24:17', 'KH-20260821-000195', 'alive'),
(196, -6.633180, 106.533250, 'Kelapa Hijau', 'Cocos nucifera viridis', '2026-08-22', '08:00:00', 70, 'SD NEGERI KALONG KAREES', 'kwarran.nanggung', 'Tumbuh subur memberikan banyak manfaat', 'uploads/before_6a88ff3760b7d8.69267243.jpg', 'uploads/after_6a88ff3760b840.08006254.jpg', '2026-08-22 01:45:27', 'KH-20260822-000196', 'alive'),
(197, -6.631950, 106.532930, 'Kelapa', 'Cocos Nucifera', '2026-08-22', '08:30:00', 50, 'SD NEGERI PASIRGINTUNG 01', 'kwarran.nanggung', 'Kami bersama Kwarran Nanggung bersama para pembina melakukan penanaman tunas kelapa dibelakang SD Negeri Curugbitung 03.', 'uploads/before_6a88ff6c3b5e30.46880985.jpg', 'uploads/after_6a88ff6c3b5ea1.46252489.jpg', '2026-08-22 01:46:20', 'KH-20260822-000197', 'alive'),
(198, -6.631970, 106.532920, 'Kelapa', 'Cocos Nucifera', '2026-08-22', '08:00:00', 50, 'SDN PABANGBON', 'kwarran.nanggung', 'Bermanfaat di masa depan', 'uploads/before_6a88ffd80910a4.76334530.jpg', 'uploads/after_6a88ffd8091101.45357703.jpg', '2026-08-22 01:48:08', 'KH-20260822-000198', 'alive'),
(199, -6.631960, 106.532910, 'Kelapa', 'Cocos Nucifera', '2026-08-22', '08:00:00', 50, 'SDN CIGUHA', 'kwarran.nanggung', '', 'uploads/before_6a88ffe7c3a1e6.93406305.jpg', 'uploads/after_6a88ffe7c3a269.81030392.jpg', '2026-08-22 01:48:23', 'KH-20260822-000199', 'alive'),
(200, -6.631990, 106.533010, 'Kelapa', 'Cocos Nucifera', '2026-08-22', '08:00:00', 1, 'SD NEGERI MALASARI 01', 'kwarran.nanggung', 'Menanam kelapa sebagai ajang untuk menumbuhkan kecintaan pada alam dan sebagai media motivasi untuk tumbuh dan berkembang serta bermanfaat sebagai pohon kelapa tersebut', 'uploads/before_6a88fff05eeb78.60780021.jpg', 'uploads/after_6a88fff05eebc5.90249575.jpg', '2026-08-22 01:48:32', 'KH-20260822-000200', 'alive'),
(201, -6.631930, 106.532890, 'Kelapa', 'Cocos Nucifera', '2026-08-22', '08:30:00', 50, 'SD NEGERI PASIRGINTUNG 01', 'kwarran.nanggung', 'Semoga bermanfaat untuk masa depan', 'uploads/before_6a89004de35cf4.31291887.jpg', 'uploads/after_6a89004de35d68.03418229.jpg', '2026-08-22 01:50:05', 'KH-20260822-000201', 'alive'),
(202, -6.632450, 106.531340, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-22', '08:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.nanggung', 'Seluruh bagisn kelapa berguna, mulai dari buah, air, batang, hingga daunnya', 'uploads/before_6a890129271c58.37890969.jpg', 'uploads/after_6a890129271ca6.13848716.jpg', '2026-08-22 01:53:45', 'KH-20260822-000202', 'alive'),
(203, -6.631980, 106.533440, 'Pohon Kelapa', 'Cocos Nucifera', '2026-08-22', '08:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.nanggung', 'Penanaman pohon Tunas kelapa bersama kwarana RAnting Nanggung', 'uploads/before_6a890218790943.08278124.jpg', 'uploads/after_6a8902187909a4.98186615.jpg', '2026-08-22 01:57:44', 'KH-20260822-000203', 'alive'),
(204, -6.632000, 106.533000, 'Kelapa', 'Cocos Nucifera', '2026-08-22', '08:00:00', 50, 'SD NEGERI CIPARAY', 'kwarran.nanggung', 'Seru', 'uploads/before_6a89052069d437.36291670.jpg', 'uploads/after_6a89052069d493.43580899.jpg', '2026-08-22 02:10:40', 'KH-20260822-000204', 'alive'),
(205, -6.631270, 106.537890, 'Kelapa', 'Cocos Nucifera', '2026-08-22', '08:30:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.nanggung', 'Banyak keseruan yg dirasakan saat penanaman pohon ini, dan ada kebahagiaan saat menanam.', 'uploads/before_6a892575663477.74539279.jpg', 'uploads/after_6a8925756634f9.96010178.jpg', '2026-08-22 04:28:37', 'KH-20260822-000205', 'alive'),
(206, -6.184900, 106.835500, 'Kelapa', 'Cocos Nucifera', '2026-08-22', '08:00:00', 60, 'Swadaya / Beli Sendiri', 'kwarran.nanggung', 'semoga hasilnya bisa dimanfaatkan', 'uploads/before_6a894a913732f5.86510464.jpg', 'uploads/after_6a894a91373345.73568604.jpg', '2026-08-22 07:06:57', 'KH-20260822-000206', 'alive'),
(207, -6.401880, 106.962960, 'Kelapa Manis', 'Cocos nucifera sakarina', '2026-08-22', '08:00:00', 50, 'Swadaya / Beli Sendiri', 'kwarran.cileungsi', 'menanam', 'uploads/before_6a8a237a510225.86620529.jpg', 'uploads/after_6a8a237a510281.19061070.jpg', '2026-08-22 22:32:26', 'KH-20260823-000207', 'alive'),
(208, -6.401880, 106.962960, 'Uji', 'Testus testus', '2026-09-28', '10:00:00', 12, 'Swadaya', 'kwr775514', 'x', 'uploads/before_6aba9727467364.82645099.jpg', 'uploads/after_6aba97274673e7.04423825.jpg', '2026-09-28 16:34:47', 'KH-20260928-000208', 'alive'),
(209, -6.401880, 106.962960, 'Uji', 'Testus testus', '2026-09-28', '10:00:00', 12, 'Swadaya', 'kwr775514', 'uji', 'uploads/before_6aba97298d6682.17689080.jpg', 'uploads/after_6aba97298d66d5.70046826.jpg', '2026-09-28 16:34:49', 'KH-20260928-000209', 'alive'),
(210, -6.401880, 106.962960, 'Uji', 'Testus', '2026-09-28', '10:00:00', 12, 'Swadaya', 'kwr775514', 'both', 'uploads/before_6aba9e0b1af390.96496265.jpg', 'uploads/after_6aba9e0b1af402.12945671.jpg', '2026-09-28 17:04:11', 'KH-20260929-000210', 'alive'),
(211, -6.401880, 106.962960, 'Uji', 'Testus', '2026-09-28', '10:00:00', 12, 'Swadaya', 'kwr775514', 'test', 'uploads/before_6aba9e2b6f1953.59181752.jpg', 'uploads/after_6aba9e2b6f19a1.43282524.jpg', '2026-09-28 17:04:43', 'KH-20260929-000211', 'alive');

-- --------------------------------------------------------

--
-- Table structure for table `tree_likes`
--

CREATE TABLE `tree_likes` (
  `id` int NOT NULL,
  `tree_id` int NOT NULL,
  `username` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `tree_likes`
--

INSERT INTO `tree_likes` (`id`, `tree_id`, `username`, `created_at`) VALUES
(7, 5, 'kwarran.ciseeng', '2026-03-13 09:07:01'),
(8, 14, 'kwarran.rumpin', '2026-04-23 03:53:36'),
(9, 15, 'kwarran.rumpin', '2026-04-23 08:33:42'),
(10, 16, 'kwarran.rumpin', '2026-04-30 04:06:05'),
(11, 146, 'kwarran.jonggol', '2026-07-03 05:39:35'),
(12, 148, 'kwarran.jonggol', '2026-07-03 05:49:33'),
(13, 147, 'kwarran.jonggol', '2026-07-04 08:24:14'),
(14, 159, 'kwarran.jonggol', '2026-07-09 23:23:29'),
(15, 169, 'kwarran.jonggol', '2026-07-16 04:32:35'),
(16, 174, 'kwarran.cileungsi', '2026-07-28 11:36:37');

-- --------------------------------------------------------

--
-- Table structure for table `tree_photos`
--

CREATE TABLE `tree_photos` (
  `id` int NOT NULL,
  `tree_id` int NOT NULL,
  `file_path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `caption` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `tree_photos`
--

INSERT INTO `tree_photos` (`id`, `tree_id`, `file_path`, `caption`, `created_at`) VALUES
(2, 6, 'uploads/progress/progress_69b38efe44a1f8.34761442.jpg', '', '2026-03-13 04:13:50'),
(3, 208, 'uploads/progress/progress_6aba973778ab68.76100472.jpg', 'x', '2026-09-28 16:35:03'),
(4, 208, 'uploads/progress/progress_6aba9e0d562fd8.91218659.jpg', 'x', '2026-09-28 17:04:13'),
(5, 210, 'uploads/progress/progress_6aba9e2db1a961.12584457.jpg', 'p', '2026-09-28 17:04:45'),
(6, 211, 'uploads/progress/progress_6ababf1fe194f1.40938265.jpg', 't', '2026-09-28 19:25:19'),
(7, 211, 'uploads/progress/progress_6ababf20388760.67887198.jpg', 't', '2026-09-28 19:25:20'),
(8, 211, 'uploads/progress/progress_6ababf2084eea0.24999157.jpg', 'x', '2026-09-28 19:25:20'),
(9, 144, 'uploads/progress/progress_6abae2275006a2.72649653.jpg', 'x', '2026-09-28 21:54:47'),
(10, 144, 'uploads/progress/progress_6abae22829e3d1.73741330.jpg', 'x', '2026-09-28 21:54:48'),
(11, 144, 'uploads/progress/progress_6abae228b6cd58.50034234.jpg', 'x', '2026-09-28 21:54:48'),
(12, 144, 'uploads/progress/progress_6abae229565579.43168166.jpg', 'x', '2026-09-28 21:54:49'),
(13, 144, 'uploads/progress/progress_6abae229e6e219.15438690.jpg', 'x', '2026-09-28 21:54:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fullname` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `org` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `birthdate` date NOT NULL,
  `whatsapp` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`, `fullname`, `org`, `birthdate`, `whatsapp`, `created_at`, `is_admin`) VALUES
(1, 'kwarcab_bogorkab', '$2y$10$lTGiGN0Jcyx9vNT3zdyiputWTNneIdRgtelKhI2QGjYCbqZpLfUR.', 'Kwarcab  Kabupaten Bogor', 'Kwartir Cabang Kabupaten Bogor', '2026-01-25', '08567567656', '2026-01-25 13:25:59', 0),
(2, 'kwarran.cibinong', '$2y$10$mpM9h/20ZJlyi3pXHSrXgOvivZJLmPuc6aVECKnhe8FoHjKRNNFjG', 'Coconext Cibinong', 'Kwarran Kecamatan Cibinong', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(3, 'kwarran.gunungputri', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Gunung Putri', 'Kwarran Kecamatan Gunung Putri', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(4, 'kwarran.citeureup', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Citeureup', 'Kwarran Kecamatan Citeureup', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(5, 'kwarran.sukaraja', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Sukaraja', 'Kwarran Kecamatan Sukaraja', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(6, 'kwarran.babakanmadang', '$2y$10$ndSpd2D7lx5sqUQd9UCaRe26ek6V6.ac4drtpiRR06gh2suYFUNgy', 'Coconext Babakan Madang', 'Kwarran Kecamatan Babakan Madang', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(7, 'kwarran.jonggol', '$2y$10$.JAyaCOFjXrASIXuT9/l7u/At3Qi9x8YoKhWpaiNTEhZO0rV0OfWS', 'Coconext Jonggol', 'Kwarran Kecamatan Jonggol', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(8, 'kwarran.cileungsi', '$2y$10$ojFA/aHjUHRnhGMg4kJtnO/gJT.N3dH9RTHDVKRLzaRs9s46vtDGe', 'Coconext Cileungsi', 'Kwarran Kecamatan Cileungsi', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(9, 'kwarran.cariu', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Cariu', 'Kwarran Kecamatan Cariu', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(10, 'kwarran.sukamakmur', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Sukamakmur', 'Kwarran Kecamatan Sukamakmur', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(11, 'kwarran.parung', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Parung', 'Kwarran Kecamatan Parung', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(12, 'kwarran.gunungsindur', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Gunung Sindur', 'Kwarran Kecamatan Gunung Sindur', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(13, 'kwarran.kemang', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Kemang', 'Kwarran Kecamatan Kemang', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(14, 'kwarran.bojonggede', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Bojong Gede', 'Kwarran Kecamatan Bojong Gede', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(15, 'kwarran.leuwiliang', '$2y$10$PV6McKN/B9.CLxTkEZjcb.zMzWvXx0/5hwuRxd7iqi2k/keUYf7tK', 'Coconext Leuwiliang', 'Kwarran Kecamatan Leuwiliang', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(16, 'kwarran.ciampea', '$2y$10$5LaJgSWkPaSnTwHvwJ8moepAbHrPxbQ5t4fQ9g/FU12giv8W9RSOe', 'Coconext Ciampea', 'Kwarran Kecamatan Ciampea', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(17, 'kwarran.cibungbulang', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Cibungbulang', 'Kwarran Kecamatan Cibungbulang', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(18, 'kwarran.pamijahan', '$2y$10$EiR9DZL30wf4UjOtdwK05OoNncmUjoMw9JpwWbNsOqoqzqoL/RU.2', 'Coconext Pamijahan', 'Kwarran Kecamatan Pamijahan', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(19, 'kwarran.rumpin', '$2y$10$9k0fjS4YIKgdXIcNoGGqKer25rUyuWx09sK6l7prWPLs3Pbe5UADm', 'Coconext Rumpin', 'Kwarran Kecamatan Rumpin', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(20, 'kwarran.jasinga', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Jasinga', 'Kwarran Kecamatan Jasinga', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(21, 'kwarran.parungpanjang', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Parung Panjang', 'Kwarran Kecamatan Parung Panjang', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(22, 'kwarran.nanggung', '$2y$10$YEIV.l4ZpcKW4Ks6lWiQYux/GKC40yolyv.hJiQIU/ca50IhoAsl2', 'Coconext Nanggung', 'Kwarran Kecamatan Nanggung', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(23, 'kwarran.cigudeg', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Cigudeg', 'Kwarran Kecamatan Cigudeg', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(24, 'kwarran.tenjo', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Tenjo', 'Kwarran Kecamatan Tenjo', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(25, 'kwarran.ciawi', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Ciawi', 'Kwarran Kecamatan Ciawi', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(26, 'kwarran.cisarua', '$2y$10$3N6M5YI153D2rHR8xPTdFuGRYq7ZXGn.i2ctDkXISXDjijJgLOSF6', 'Coconext Cisarua', 'Kwarran Kecamatan Cisarua', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(27, 'kwarran.megamendung', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Megamendung', 'Kwarran Kecamatan Megamendung', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(28, 'kwarran.caringin', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Caringin', 'Kwarran Kecamatan Caringin', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(29, 'kwarran.cijeruk', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Cijeruk', 'Kwarran Kecamatan Cijeruk', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(30, 'kwarran.ciomas', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Ciomas', 'Kwarran Kecamatan Ciomas', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(31, 'kwarran.dramaga', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Dramaga', 'Kwarran Kecamatan Dramaga', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(32, 'kwarran.tamansari', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Tamansari', 'Kwarran Kecamatan Tamansari', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(33, 'kwarran.klapanunggal', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Klapanunggal', 'Kwarran Kecamatan Klapanunggal', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(34, 'kwarran.ciseeng', '$2y$10$wOPukMcOceHhW9zpTPFnGOl5UyUnf/aIQOBwZZjtoLbP3wux7XKZq', 'Coconext Ciseeng', 'Kwarran Kecamatan Ciseeng', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(35, 'kwarran.rancabungur', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Rancabungur', 'Kwarran Kecamatan Rancabungur', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(36, 'kwarran.sukajaya', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Sukajaya', 'Kwarran Kecamatan Sukajaya', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(37, 'kwarran.tanjungsari', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Tanjungsari', 'Kwarran Kecamatan Tanjungsari', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(38, 'kwarran.tajurhalang', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Tajurhalang', 'Kwarran Kecamatan Tajurhalang', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(39, 'kwarran.cigombong', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Cigombong', 'Kwarran Kecamatan Cigombong', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(40, 'kwarran.leuwisadeng', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Leuwisadeng', 'Kwarran Kecamatan Leuwisadeng', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(41, 'kwarran.tenjolaya', '$2y$10$9lP83T1etIvqHRqXjeGgHeJElDH5JpdybkOdtoA44WHCUeC.37MXC', 'Coconext Tenjolaya', 'Kwarran Kecamatan Tenjolaya', '2026-01-01', '081234567890', '2026-01-25 14:33:37', 0),
(42, 'admin_coconext', '$2y$10$6BK/N0slWXC9kLJrt8OPI.Q3DP8bBznlfteR0.oUAu55Opcin0uV.', 'Admin Coconext', 'Admin Coconext', '2026-01-25', '08567567656', '2026-01-25 13:25:59', 1),
(79, 'kwr775514', '$2y$10$Ir1JcLzGKIB/npUIz8cBUOHWt0VlrZ5GqnVIkdA4LexpDahPK0H5u', 'Petugas Verifikasi', 'Kwarcab Kabupaten Bogor', '1990-01-15', '081234567890', '2026-09-28 16:33:25', 1),
(80, 'kwradm7651', '$2y$10$4MOeYg95cDnlUbOJyr5pgedpKdgz85bDm6zbT31AOiwIQUEyjCiPq', 'Admin Verifikasi', 'Kwarcab', '1991-02-02', '081298765432', '2026-09-28 16:36:29', 0),
(81, 'hephadm993', '$2y$10$ibglq9VfMmPn8eUThpCBt.i4/G.dtkLEwxEMaUHVKSvOfmKpDey9i', 'X', 'X', '1990-01-01', '0812', '2026-09-28 16:46:18', 0),
(82, 'hephrce', '$2y$10$hxkSuS85Q.DuW9TyacxsteGqntWHBevN50NSRlo5G/aZAKPdEjy6.', 'Heph Rce', 'kwarcab', '1990-01-01', '081234567890', '2026-09-28 21:51:08', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_lokal` (`nama_lokal`);

--
-- Indexes for table `trees`
--
ALTER TABLE `trees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `serial_no` (`serial_no`),
  ADD KEY `i_trees_penanam` (`penanam`),
  ADD KEY `i_trees_nama_lokal` (`nama_lokal`);

--
-- Indexes for table `tree_likes`
--
ALTER TABLE `tree_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_like` (`tree_id`,`username`),
  ADD KEY `tree_id` (`tree_id`);

--
-- Indexes for table `tree_photos`
--
ALTER TABLE `tree_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tree_id` (`tree_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `species`
--
ALTER TABLE `species`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1970;

--
-- AUTO_INCREMENT for table `trees`
--
ALTER TABLE `trees`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT for table `tree_likes`
--
ALTER TABLE `tree_likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tree_photos`
--
ALTER TABLE `tree_photos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
