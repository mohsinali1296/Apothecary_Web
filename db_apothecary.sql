-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2020 at 08:05 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apothecary`
--

-- --------------------------------------------------------

--
-- Table structure for table `alternatives`
--

CREATE TABLE `alternatives` (
  `Id` int(11) NOT NULL,
  `medicine` int(11) DEFAULT NULL,
  `altenative_med` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `appusers`
--

CREATE TABLE `appusers` (
  `Id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `pass` varchar(200) DEFAULT NULL,
  `logged` int(11) DEFAULT 0,
  `local_Address` varchar(1000) DEFAULT NULL,
  `City` varchar(200) DEFAULT NULL,
  `Country` varchar(200) DEFAULT 'Pakistan',
  `image` mediumtext DEFAULT NULL,
  `imageUrl` mediumtext DEFAULT NULL,
  `deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appusers`
--

INSERT INTO `appusers` (`Id`, `fullname`, `contact`, `email`, `pass`, `logged`, `local_Address`, `City`, `Country`, `image`, `imageUrl`, `deleted`) VALUES
(1, 'Mohsin Ali', '03324236901', 'mohxin926@gmail.com', 'Abc12345', 0, 'House #2-A', 'Lahore', 'Pakistan', 'mohxin926@gmail.com_1_1588242865.jpg', 'http://localhost:8000/uploads/images/mohxin926@gmail.com_1_1588242865.jpg', 0),
(2, 'Saad Ahmad', '03001122334', 'saad123@gmail.com', 'abc12345', 0, NULL, NULL, 'Pakistan', 'saad123@gmail.com_2_1586686192.jpg', 'http://localhost:8000/uploads/images/saad123@gmail.com_2_1586686192.jpg', 0),
(3, 'Asjad Anwar', '03254868325', 'asjad123@gmail.com', 'Abc12345', 0, NULL, NULL, 'Pakistan', NULL, NULL, 0),
(4, 'Asjad Anwar', '03256874225', 'asjad1234@gmail.com', 'Abc12345', 0, NULL, NULL, 'Pakistan', NULL, NULL, 0),
(5, 'Muhammad Mohsin Ali', '03009878965', 'mohxin123@gmail.com', 'abc12345', 0, NULL, NULL, 'Pakistan', NULL, NULL, 0),
(6, 'Muhammad Mohsin Ali', '03009879865', 'mohxin12345@gmail.com', 'abc12345', 0, NULL, NULL, 'Pakistan', NULL, NULL, 0),
(7, 'Muhammad Mohsin Ali', '03009879835', 'mohxin345@gmail.com', 'abc12345', 0, NULL, NULL, 'Pakistan', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `Id` int(11) NOT NULL,
  `url` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `Id` int(11) NOT NULL,
  `SubCategoryId` int(11) DEFAULT NULL,
  `Brand_Name` varchar(200) DEFAULT NULL,
  `image` longtext DEFAULT NULL,
  `imageUrl` longtext DEFAULT NULL,
  `deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`Id`, `SubCategoryId`, `Brand_Name`, `image`, `imageUrl`, `deleted`) VALUES
(1, 28, 'None', NULL, NULL, 0),
(2, 28, 'Pampers', 'Pampers_28_1585041278.png', 'http://localhost:8000/uploads/images/Pampers_28_1585041278.png', 0),
(3, 28, 'Huggies', 'Huggies_28_1585042724.png', 'http://localhost:8000/uploads/images/Huggies_28_1585042724.png', 0),
(4, 27, 'PediaSure', 'PediaSure_27_1585042780.png', 'http://localhost:8000/uploads/images/PediaSure_27_1585042780.png', 0),
(5, 20, 'Oral-B', 'Oral-B_20_1585043602.png', 'http://localhost:8000/uploads/images/Oral-B_20_1585043602.png', 0),
(6, 27, 'None', NULL, NULL, 0),
(7, 20, 'None', NULL, NULL, 0),
(8, 36, 'Dettol', 'Dettol_36_1585151413.png', 'http://localhost:8000/uploads/images/Dettol_36_1585151413.png', 0),
(9, 27, 'Nestle', 'Nestle_27_1585152093.png', 'http://localhost:8000/uploads/images/Nestle_27_1585152093.png', 0),
(10, 27, 'Abbott', 'Abbott_27_1585208357.png', 'http://localhost:8000/uploads/images/Abbott_27_1585208357.png', 0),
(11, 27, 'Morinaga', 'Morinaga_27_1585209040.png', 'http://localhost:8000/uploads/images/Morinaga_27_1585209040.png', 0),
(12, 28, 'Johnson\'s', 'Johnson\'s_28_1589674390.png', 'http://localhost:8000/uploads/images/Johnson\'s_28_1589674390.png', 0),
(13, 28, 'Baby Dove', '__1589702376.png', 'http://localhost:8000/uploads/images/__1589702376.png', 0),
(14, 28, 'Woodwards', 'Woodwards_28_1589703844.jpg', 'http://localhost:8000/uploads/images/Woodwards_28_1589703844.jpg', 0),
(15, 18, 'Dove', 'Dove_18_1589704686.png', 'http://localhost:8000/uploads/images/Dove_18_1589704686.png', 0),
(16, 18, 'Vaseline', 'Vaseline_18_1589704706.png', 'http://localhost:8000/uploads/images/Vaseline_18_1589704706.png', 0),
(17, 18, 'Ponds', '__1589705026.jpg', 'http://localhost:8000/uploads/images/__1589705026.jpg', 0),
(18, 18, 'Fair & Lovely', 'Fair & Lovely_18_1589704882.png', 'http://localhost:8000/uploads/images/Fair & Lovely_18_1589704882.png', 0),
(19, 18, 'Nivea', 'Nivea_18_1589705713.png', 'http://localhost:8000/uploads/images/Nivea_18_1589705713.png', 0),
(20, 19, 'Whisper', 'Whisper_19_1589705998.png', 'http://localhost:8000/uploads/images/Whisper_19_1589705998.png', 0),
(21, 20, 'Listerine', 'Listerine_20_1589706308.png', 'http://localhost:8000/uploads/images/Listerine_20_1589706308.png', 0),
(22, 20, 'Sensodyne', 'Sensodyne_20_1589706419.png', 'http://localhost:8000/uploads/images/Sensodyne_20_1589706419.png', 0),
(23, 21, 'Head & Shoulder', 'Head & Shoulder_21_1589708982.png', 'http://localhost:8000/uploads/images/Head & Shoulder_21_1589708982.png', 0),
(24, 36, 'None', NULL, NULL, 0),
(25, 37, 'Iodex', 'Iodex_25.jpg', 'http://localhost:8000/uploads/images/Iodex_25.jpg', 0),
(26, 38, 'Strepsils', 'Strepsils_38_1595687884.png', 'http://localhost:8000/uploads/images/Strepsils_38_1595687884.png', 0),
(27, 38, 'AMRUTANJAN', 'AMRUTANJAN_38_1595695138.jpg', 'http://localhost:8000/uploads/images/AMRUTANJAN_38_1595695138.jpg', 0),
(28, 39, 'Doqtar', 'Doqtar_39_1595695635.png', 'http://localhost:8000/uploads/images/Doqtar_39_1595695635.png', 0),
(29, 40, 'NIVEA', 'NIVEA_40_1595696822.png', 'http://localhost:8000/uploads/images/NIVEA_40_1595696822.png', 0),
(30, 40, 'Himalaya', 'Himalaya_40_1595697044.png', 'http://localhost:8000/uploads/images/Himalaya_40_1595697044.png', 0),
(31, 41, 'Eno', 'Eno_41_1595697269.jpg', 'http://localhost:8000/uploads/images/Eno_41_1595697269.jpg', 0),
(32, 42, 'MHS', 'MHS_42_1595697752.png', 'http://localhost:8000/uploads/images/MHS_42_1595697752.png', 0),
(33, 42, 'Accu Sure', 'Accu Sure_42_1595697979.jpg', 'http://localhost:8000/uploads/images/Accu Sure_42_1595697979.jpg', 0),
(34, 43, '2baconil', '2baconil_43_1595698291.jpg', 'http://localhost:8000/uploads/images/2baconil_43_1595698291.jpg', 0),
(35, 43, 'Nicotex', 'Nicotex_43_1595698657.jpg', 'http://localhost:8000/uploads/images/Nicotex_43_1595698657.jpg', 0),
(36, 30, 'Ensure', 'Ensure_30_1595700018.png', 'http://localhost:8000/uploads/images/Ensure_30_1595700018.png', 0),
(37, 30, 'Sugar Free Natura', 'Sugar Free Natura_30_1595700456.png', 'http://localhost:8000/uploads/images/Sugar Free Natura_30_1595700456.png', 0),
(38, 29, 'Accu-Chek', 'Accu-Chek_29_1595700902.jpeg', 'http://localhost:8000/uploads/images/Accu-Chek_29_1595700902.jpeg', 0),
(39, 29, 'Glucorite', 'Glucorite_29_1595701200.png', 'http://localhost:8000/uploads/images/Glucorite_29_1595701200.png', 0),
(40, 31, 'Smart Flamingo', 'Smart Flamingo_31_1595701587.png', 'http://localhost:8000/uploads/images/Smart Flamingo_31_1595701587.png', 0),
(41, 31, 'Sockoye', 'Sockoye_31_1595702053.png', 'http://localhost:8000/uploads/images/Sockoye_31_1595702053.png', 0),
(42, 32, 'Complan', 'Complan_32_1595849821.jpg', 'http://localhost:8000/uploads/images/Complan_32_1595849821.jpg', 0),
(43, 33, 'EatRite', 'EatRite_33_1595850485.jpg', 'http://localhost:8000/uploads/images/EatRite_33_1595850485.jpg', 0),
(44, 33, 'Horlicks', 'Horlicks_33_1595850654.png', 'http://localhost:8000/uploads/images/Horlicks_33_1595850654.png', 0),
(45, 34, 'GLUCON-D', 'GLUCON-D_34_1595851330.jpg', 'http://localhost:8000/uploads/images/GLUCON-D_34_1595851330.jpg', 0),
(46, 34, 'Abbott', 'Abbott_34_1595851482.png', 'http://localhost:8000/uploads/images/Abbott_34_1595851482.png', 0),
(47, 35, 'Muscletech', 'Muscletech_35_1595851902.jpg', 'http://localhost:8000/uploads/images/Muscletech_35_1595851902.jpg', 0),
(48, 35, 'Endura mass', 'Endura mass_35_1595852137.jpg', 'http://localhost:8000/uploads/images/Endura mass_35_1595852137.jpg', 0),
(49, 45, 'Labrada', 'Labrada_45_1595855322.gif', 'http://localhost:8000/uploads/images/Labrada_45_1595855322.gif', 0),
(50, 45, 'Nutrimax', 'Nutrimax_45_1595855638.jpg', 'http://localhost:8000/uploads/images/Nutrimax_45_1595855638.jpg', 0),
(51, 46, 'Autrin', 'Autrin_46_1595856062.jpg', 'http://localhost:8000/uploads/images/Autrin_46_1595856062.jpg', 0),
(52, 46, 'Himalaya', 'Himalaya_46_1595856285.png', 'http://localhost:8000/uploads/images/Himalaya_46_1595856285.png', 0),
(53, 47, 'Inlife', 'Inlife_47_1595857902.png', 'http://localhost:8000/uploads/images/Inlife_47_1595857902.png', 0),
(54, 47, 'Himalaya', 'Himalaya_47_1595858176.png', 'http://localhost:8000/uploads/images/Himalaya_47_1595858176.png', 0),
(55, 61, 'Biophar lifesciences', 'Biophar lifesciences_61_1596104058.jpg', 'http://localhost:8000/uploads/images/Biophar lifesciences_61_1596104058.jpg', 0),
(56, 61, 'Cipla', 'Cipla_61_1596107311.jpg', 'http://localhost:8000/uploads/images/Cipla_61_1596107311.jpg', 0),
(57, 61, 'Glaxo Smith Kline (GSK)', 'Glaxo Smith Kline (GSK)_61_1596108298.jpg', 'http://localhost:8000/uploads/images/Glaxo Smith Kline (GSK)_61_1596108298.jpg', 0),
(58, 61, 'Abbott', 'Abbott_61_1596109515.png', 'http://localhost:8000/uploads/images/Abbott_61_1596109515.png', 0),
(59, 61, 'Reckitt Benckiser', 'Reckitt Benckiser_61_1596124411.png', 'http://localhost:8000/uploads/images/Reckitt Benckiser_61_1596124411.png', 0),
(60, 61, 'Hilton Pharma', 'Hilton Pharma_61_1596125155.png', 'http://localhost:8000/uploads/images/Hilton Pharma_61_1596125155.png', 0),
(61, 61, 'Pfizer', 'Pfizer_61_1596125737.jpg', 'http://localhost:8000/uploads/images/Pfizer_61_1596125737.jpg', 0),
(62, 61, 'Schazoo SPL', 'Schazoo SPL_61_1596126402.png', 'http://localhost:8000/uploads/images/Schazoo SPL_61_1596126402.png', 0),
(63, 61, 'Seven Seas', 'Seven Seas_61_1596138947.png', 'http://localhost:8000/uploads/images/Seven Seas_61_1596138947.png', 0),
(64, 61, 'Helix Pharma', 'Helix Pharma_61_1596139835.png', 'http://localhost:8000/uploads/images/Helix Pharma_61_1596139835.png', 0),
(65, 61, 'Actavis', 'Actavis_61_1596142078.jpg', 'http://localhost:8000/uploads/images/Actavis_61_1596142078.jpg', 0),
(66, 61, 'REKO', 'REKO_61_1596142613.jpg', 'http://localhost:8000/uploads/images/REKO_61_1596142613.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `Id` int(11) NOT NULL,
  `Stock_Id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `user_Id` int(11) DEFAULT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  `totalPrice` float DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`Id`, `Stock_Id`, `qty`, `user_Id`, `deleted`, `totalPrice`, `type`) VALUES
(26, 1, 1, 1, 0, 500, 0);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Id` int(11) NOT NULL,
  `Full_Name` varchar(200) NOT NULL,
  `Email` varchar(200) CHARACTER SET utf8mb4 DEFAULT NULL,
  `Contact` varchar(20) DEFAULT NULL,
  `Address` mediumtext DEFAULT NULL,
  `deleted` int(11) DEFAULT 0,
  `Pharm_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Id`, `Full_Name`, `Email`, `Contact`, `Address`, `deleted`, `Pharm_Id`) VALUES
(1, 'Ali Khan', 'Ali010@gmail.com', '03249871232', 'C Block house#2 Street#3 Samnabad,Lahore', 0, 1),
(2, 'Muzammil', 'Muzammil@yahoo.com', '03211239875', '101 Chauburji Park, Lahore', 0, 1),
(3, 'Naveed Ahmad', NULL, '03314405171', 'A Block house#16 Street#6 Samnabad,Lahore', 0, 1),
(4, 'Zulfiqar Ahmad', 'Zulfiqar1997@gmail.com', '03341233217', NULL, 0, 2),
(5, 'Fareeha Ali', 'Fari@yahoo.com', '03216296783', NULL, 0, 2),
(6, 'Minal Akram', 'Minalakram@yahoo.com', '03324782956', 'A Block house#21 Street#1 Samnabad,Lahore', 0, 2),
(7, 'Atif Mughal', 'Atifmughal@gmail.com', '03229182756', 'G Block house#2 Street#12 Shamnagar,Lahore', 0, 3),
(8, 'Amir', 'Amirsaeed@gmail.com', '03239371638', NULL, 0, 3),
(9, 'Iftikhar', NULL, '03211249875', 'House#2 Street#4 Shadbagh,Lahore', 0, 4),
(10, 'Muneeb Ahmed', 'Muneebahmed111@gmail.com', '03271239875', NULL, 0, 4),
(11, 'Arsalan', 'Arsalanprince@gmail.com', '03311236875', '121 Chauburhi Park, Lahore', 0, 4),
(12, 'Saeed ghani', 'saeed@gmail.com', '03314406191', 'Phase 3 House#9 DHA,Lahore', 0, 5),
(13, 'Saima saeed', 'saimasaaed1991@gmail.com', '03334498127', 'C Block house#2 Street#11 Samnabad,Lahore', 0, 5),
(14, 'Arshad', NULL, '03231928375', NULL, 0, 5),
(15, 'Ahmad Khan', 'Ahmadkhan@gmail.com', '03331934256', NULL, 0, 6),
(16, 'Afan Butt', 'Affanay@gmail.com', '03316830145', 'B Block house#12 Street#5 Sabzazar,Lahore', 0, 6),
(17, 'Muhammad Shakeeb', 'shakeebUOL@gmail.com', '03241239145', NULL, 0, 6),
(18, 'Zeenia', NULL, '03316710462', NULL, 0, 7),
(19, 'Laiba khan', 'laibakhan121@gmail.com', '03339674562', NULL, 0, 7),
(20, 'Mahnoor', 'mahnooray@gmail.com', '03247845109', '11A Chauburji Park, Lahore', 0, 7),
(21, 'Umar', 'umarsaleem@yahoo.com', '03317562985', NULL, 0, 8),
(22, 'muqarrab', 'muqimughal@gmail.com', '03477539838', 'House#2 Street#5 ichra, Lahore', 0, 8),
(23, 'Asad', 'princeasad@gmail.com', '03331674256', 'House#7 Street#2 ichra, Lahore', 0, 8);

-- --------------------------------------------------------

--
-- Table structure for table `distributors`
--

CREATE TABLE `distributors` (
  `Id` int(11) NOT NULL,
  `Name` varchar(500) NOT NULL,
  `Email` varchar(500) NOT NULL,
  `Contact` varchar(50) NOT NULL,
  `Distributor_Address` mediumtext DEFAULT NULL,
  `Company_Id` int(11) DEFAULT NULL,
  `Pharmacy_Id` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `distributors`
--

INSERT INTO `distributors` (`Id`, `Name`, `Email`, `Contact`, `Distributor_Address`, `Company_Id`, `Pharmacy_Id`, `deleted`) VALUES
(1, 'Mark Schneider', 'nestle@gmail.com', '04231123987', '308 Road Upper Mall Scheme, Lahore, Punjab 54002', 62, 1, 0),
(3, 'Muhammad Ali', 'pfizer@gmail.com', '04231127387', '12- Dockyard Road, West Wharf\r\nKarachi- 74000  ', 67, 1, 0),
(4, 'Rashid Khan', 'abbott@gmail.com', '04231123123', 'Block N Gulberg III, Lahore, Punjab', 65, 1, 0),
(6, 'Muhammad Ahmad', 'seavenseas@gmail.com', '04235513987', 'PMA Trade Centre, Plot 66, GOR2, Samanabad Town, Ichhra Lahore, Punjab 54000', 74, 2, 0),
(7, 'Ali Rauf', 'pampers@gmail.com', '04231123777', '92 Temple Rd, Mozang Chungi, Lahore, Punjab 54000', 63, 2, 0),
(8, 'Rauf Ahmed', 'schazoospl@gmail.com', '04231127111', 'Hayat Kimya Pakistan Office No:7, Tufail Road, Mall of Lahore', 72, 2, 0),
(10, 'Mark Schneider', 'nestle@gmail.com', '04231123987', '308 Road Upper Mall Scheme, Lahore, Punjab 54002', 62, 3, 0),
(11, 'Ali Rauf', 'pampers@gmail.com', '04231123777', '92 Temple Rd, Mozang Chungi, Lahore, Punjab 54000', 63, 3, 0),
(12, 'Rashid Khan', 'abbott@gmail.com', '04231123123', 'Block N Gulberg III, Lahore, Punjab', 65, 3, 0),
(13, 'Muhammad Ahmad', 'seavenseas@gmail.com', '04235513987', 'PMA Trade Centre, Plot 66, GOR2, Samanabad Town, Ichhra Lahore, Punjab 54000', 74, 4, 0),
(14, 'Rauf Ahmed', 'schazoospl@gmail.com', '04231127111', 'Hayat Kimya Pakistan Office No:7, Tufail Road, Mall of Lahore', 72, 4, 0),
(15, 'Muhammad Ali', 'pfizer@gmail.com', '04231127387', '12- Dockyard Road, West Wharf\r\nKarachi- 74000  ', 67, 4, 0),
(16, 'Saad Mughal', 'headnshoulders@gmail.com', '04231127010', '6-A Jail Road, Jubilee Town, Lahore, Punjab 54600', 75, 5, 0),
(17, 'Suleman Akram', 'inlife@gmail.com', '04236713987', '6-A Jail Road, Jubilee Town, Lahore, Punjab 54600', 76, 5, 0),
(18, 'Mark Schneider', 'nestle@gmail.com', '04231123987', '308 Road Upper Mall Scheme, Lahore, Punjab 54002', 62, 5, 0),
(19, 'Rashid Khan', 'abbott@gmail.com', '04231123123', 'Block N Gulberg III, Lahore, Punjab', 65, 7, 0),
(20, 'Mark Schneider', 'nestle@gmail.com', '04231123987', '308 Road Upper Mall Scheme, Lahore, Punjab 54002', 62, 7, 0),
(21, 'Suleman Akram', 'inlife@gmail.com', '04236713987', '6-A Jail Road, Jubilee Town, Lahore, Punjab 54600', 76, 7, 0),
(22, 'Sajeel Naeem', 'sockoye@gmail.com', '04231123881', 'Hayat Kimya Pakistan Office No:15, Tufail Road, Mall of Lahore', 69, 6, 0),
(23, 'Saad Mughal', 'headnshoulders@gmail.com', '04231127010', '6-A Jail Road, Jubilee Town, Lahore, Punjab 54600', 75, 6, 0),
(24, 'Ali Rauf', 'pampers@gmail.com', '04231123777', '92 Temple Rd, Mozang Chungi, Lahore, Punjab 54000', 63, 6, 0),
(25, 'Sajjad Akram', 'Actavis@gmail.com', '04235599987', '8-C Jail Road, Jubilee Town, Lahore, Punjab 54600', 71, 8, 0),
(26, 'Arshad Saeed', 'himalaya@gmail.com', '', '10 Temple Rd, Mozang Chungi, Lahore, Punjab 54000', 66, 8, 0),
(27, 'Saad Ahmad', 'huggies@gmail.com', '04231789123', '8 Road Upper Mall Scheme, Lahore, Punjab 54002', 64, 8, 0);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Id` int(11) NOT NULL,
  `Pharm_Id` int(11) DEFAULT NULL,
  `First_Name` varchar(100) NOT NULL,
  `Last_Name` varchar(100) NOT NULL,
  `Gender` int(11) NOT NULL,
  `Designation` int(11) DEFAULT NULL,
  `Email` varchar(500) NOT NULL,
  `Contact` varchar(20) NOT NULL,
  `CNIC` varchar(20) DEFAULT NULL,
  `Address` longtext DEFAULT NULL,
  `Username` varchar(200) DEFAULT NULL,
  `Password` varchar(500) DEFAULT NULL,
  `deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Id`, `Pharm_Id`, `First_Name`, `Last_Name`, `Gender`, `Designation`, `Email`, `Contact`, `CNIC`, `Address`, `Username`, `Password`, `deleted`) VALUES
(1, 1, 'Asad ', 'Mumtaz', 0, 52, 'asadmumtaz@gmail.com', '03316701648', '3520227811989', 'House#2 Street#3 Shadbagh,Lahore', 'asad_101', 'asadmumtaz', 0),
(2, 1, 'Saad ', 'Haider', 0, 50, 'saad.haider@gmail.com', '03244128877', '3520226522959', '134 Rehmat garden,Lahore', 'saad_qwe', 'saad123', 0),
(3, 1, 'Ali', 'Haider', 0, 51, 'Aleee@gmail.com', '03244129493', '3520291278672', 'House#45 Street#12 Multan Road, Lahore', 'Aleeh', 'ali1997', 0),
(4, 1, 'Muhammad', 'ahmad', 0, 53, 'Mahmad@yahoo.com', '03261238567', '3510173829567', 'House#5 Street#2 Iqbal town, Lahore', 'M_Ahmad', 'qwerahmad', 0),
(5, 2, 'Zulfiqar', 'Aslam', 0, 52, 'zulfi@gmail.com', '03331934267', '3520229222959', 'House#4 Street#12 Multan Road, Lahore', 'zulfi_acc', 'zulfi123', 0),
(6, 2, 'Ali', 'Shah', 0, 51, 'alishah@gmail.com', '03214893027', '3521847820569', 'House#45 Street#2 Liton Road, Lahore', 'Ali_Shah', 'aliShah1', 0),
(7, 2, 'Nadir', 'saeed', 0, 50, 'nadeer@yahoo.com', '03241768395', '3520227844558', 'House#5 Street#12 Ravi Road, Lahore', 'Nadeer_sh', 'nadirnn', 0),
(8, 2, 'Yasir', 'Sheikh', 0, 53, '', '03334498126', '3520291288672', 'House#41 Street#5 Iqbal town, Lahore', 'yasirdelivery', 'yasirrgo', 0),
(9, 3, 'Arshad', 'uzair', 0, 52, 'arshee@gmail.com', '03316701627', '3520237844558', 'House#25 Street#12 Liton Road, Lahore', 'Arshee', 'arshadacc', 0),
(10, 3, 'Junaid', 'Khan', 0, 53, 'junaiday@gmail.com', '03316700148', '3510127844558', 'House#45 Street#12 Wapda Town, Lahore', 'Junaid_C', 'junaid1991', 0),
(11, 3, 'Ahmed', 'Amir', 0, 50, 'emmyamir@gmial.com', '03217710462', '3521840120569', 'House#121 Rawaaz Garden, Lahore', 'emmyamir', 'emmyamir1', 0),
(12, 3, 'Salman', 'khan', 0, 51, 'sallukhan@gmail.com', '03338561067', '3520267392845', 'House#11 Rawaaz Garden, Lahore', 'sallu_khan', 'salmanK', 0),
(13, 4, 'Tayyad', 'Adnan', 0, 52, 'tayyabadnan91@gmail.com', '03217828419', '3520284400117', 'House#12 Rehmat Garden, Lahore', 'tayyab_Acc', 'qwert123', 0),
(14, 4, 'Haseeb', 'Rafiq', 0, 51, 'rafiq.haseeb@gmail.com', '03339274018', '35202167222229', 'House#11 Marghuzar, Lahore', 'rafiq_haseeb', 'haseeb90', 0),
(15, 4, 'Laiba', 'Anjum', 1, 50, 'laiba.anjumm@gmail.com', '03326677392', '3520227833665', 'House#1A Gulshan ravi, Lahore', 'laiba_mang', 'laiba123', 0),
(16, 4, 'Rida', 'Naveed', 1, 51, 'rida.naveed@gmail.com', '03336756751', '3520227833775', 'House#12A Iqbal Town, Lahore', 'rida_naveed', 'rida123', 0),
(17, 5, 'Amir ', 'Aslam', 0, 52, 'amir.aslam@gmail.com', '03334881012', '3520227811226', 'House#21 Street#3 Iqbal town, Lahore', 'amir_acc', 'amir123', 0),
(18, 5, 'Saeed ', 'Mughal', 0, 51, 'saeedm@gmail.com', '03330099124', '3520227811559', 'House#41 Street#2 Iqbal town, Lahore', 'saeed_mang', 'saeed123', 0),
(19, 5, 'Saila', 'naveed', 1, 50, 'saila.n@gmail.com', '03331237654', '3520278433331', 'House#11 Street#4 Iqbal town, Lahore', 'saila_mag', 'saila123', 0),
(20, 5, 'Hamza', 'Saeed', 0, 51, 'hamza.saeed@gmail.com', '03338761237', '3520289100004', 'House#1 Street#2 Iqbal town, Lahore', 'hamza_cac', 'hamza123', 0),
(21, 6, 'Saqib', 'Saeed', 0, 50, 'saqib@gmail.com', '03339712312', '3510112384924', 'House#21 Street#1 Iqbal town, Lahore', 'saqib_mag', 'saqib123', 0),
(22, 6, 'Shariq', 'Iqbal', 0, 52, 'shariq@gmail.com', '03338899661', '3520293877113', 'House#21A Street#3 Wapda Town, Lahore', 'shariq_acc', 'shariq123', 0),
(23, 6, 'Hammad', 'Shuaib', 0, 51, 'hammad@gmail.com', '03331238769', '3520298712896', 'House#11 Street#8 Iqbal town, Lahore', 'hammad_acc', 'hammad123', 0),
(24, 6, 'Umair', 'Amir', 0, 51, 'umair@gmail.com', '03331236321', '3520298844126', 'House#21 Ravi Road, Lahore', 'umari_cas', 'umari123', 0),
(25, 7, 'Zulfiqar', 'Ahmad', 0, 50, 'zulfi@gmial.com', '03337843123', '3520277811442', 'House#12 Street#1 Iqbal town, Lahore', 'zulfi_qar', 'zulfi123', 0),
(26, 7, 'Muhammad', 'Aslam', 0, 51, 'aslam@gmail.com', '03241956732', '3520285639285', 'House#2A Street#4 Iqbal town, Lahore', 'Aslam_cac', 'aslma123', 0),
(27, 7, 'Asim', 'Azhar', 0, 52, 'asim@gmail.com', '03338673094', '3520298744993', 'House#2 block#C Street#2 Shadbagh, Lahore', 'asim_acc', 'asim123', 0),
(28, 7, 'Zainab', 'Ali', 1, 51, 'zainab@gmail.com', '032176849003', '3520227855558', 'House#3 block#A Street#2 Shadbagh, Lahore', 'zainab_cac', 'zainab123', 0),
(29, 8, 'Moin', 'Ali', 0, 50, 'moin@gmail.com', '03336749983', '3520288812326', 'House#5 block#A Street#2 Shadbagh, Lahore', 'Moin_mag', 'moin123', 0),
(30, 8, 'Minahil', 'Naveed', 1, 51, 'minahilnaveed@gmail.com', '03335743898', '3520227811117', 'House#7 block#B Street#2 Township, Lahore', 'minahil_cas', 'minahil123', 0),
(31, 8, 'Yasir', 'Uzair', 0, 51, 'yasir@gmail.com', '03218741245', '3520227869182', 'House#12 block#D Street#2 Township, Lahore', 'yasir_cas', 'yasir123', 0),
(32, 8, 'Uziar', 'Mughal', 0, 52, 'Uzair@gmail.com', '03338674567', '3510178622227', 'House#56A street#2 Township, Lahore', 'uziar_acc', 'uzair123', 0);

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `Id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `stockId` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`Id`, `userId`, `stockId`, `type`) VALUES
(11, 1, 5, 1),
(12, 1, 20, 1);

-- --------------------------------------------------------

--
-- Table structure for table `formulae`
--

CREATE TABLE `formulae` (
  `Id` int(11) NOT NULL,
  `Formula` varchar(500) CHARACTER SET utf8mb4 DEFAULT NULL,
  `deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `formulae`
--

INSERT INTO `formulae` (`Id`, `Formula`, `deleted`) VALUES
(1, 'None', 0),
(2, 'Cefixime 200 MG+Clavulanic acid 125 MG', 0),
(3, 'Cefpodoxime 200 MG+Clavulanic acid 125 MG', 0),
(4, 'Paracetamol (500mg)\r\n', 0),
(5, 'Ibuprofen\r\n', 0),
(6, 'Aspirin\r\n', 0),
(7, 'Pentoprazole\r\n', 0),
(8, 'Mefenamic Acid\r\n', 0),
(9, 'Clonazepam\r\n', 0),
(10, 'Alprazolam\r\n', 0),
(11, 'Tranexamic Acid\r\n', 0),
(12, 'Serratiopeptidase\r\n', 0),
(13, 'Doxycycline Hyclate\r\n', 0),
(14, 'Metformin Hydrochloride', 0);

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

CREATE TABLE `list` (
  `Id` int(11) NOT NULL,
  `ListName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `list`
--

INSERT INTO `list` (`Id`, `ListName`) VALUES
(1, 'Product Categories'),
(2, 'Product Sub-Categories'),
(4, 'Supplier Company'),
(5, 'Designation'),
(6, 'Promotion Images'),
(7, 'Baby Needs'),
(8, 'Diabetic Needs'),
(9, 'Health & Nutrition'),
(10, 'OTC & Health Needs'),
(11, 'Personal Care'),
(12, 'Vitamins & Supplements'),
(13, 'Medicine'),
(14, 'Company');

-- --------------------------------------------------------

--
-- Table structure for table `list_data`
--

CREATE TABLE `list_data` (
  `Id` int(11) NOT NULL,
  `List_Id` int(11) DEFAULT NULL,
  `DataName` varchar(1000) DEFAULT NULL,
  `image` mediumtext DEFAULT NULL,
  `imageUrl` mediumtext DEFAULT NULL,
  `deleted` int(11) DEFAULT 0,
  `description` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `list_data`
--

INSERT INTO `list_data` (`Id`, `List_Id`, `DataName`, `image`, `imageUrl`, `deleted`, `description`) VALUES
(1, 1, 'Baby Needs', 'Baby Needs_1_1583496205.png', 'http://localhost:8000/uploads/images/Baby Needs_1_1583496205.png', 0, NULL),
(2, 1, 'Personal Care', 'Personal Care_1_1583497570.png', 'http://localhost:8000/uploads/images/Personal Care_1_1583497570.png', 0, NULL),
(3, 6, 'Promotion 1', 'Promotion 1_6_1585616275.jpg', 'http://localhost:8000/uploads/images/Promotion 1_6_1585616275.jpg', 0, NULL),
(4, 6, 'Promotion 2', 'Promotion 2_6_1585616303.jpg', 'http://localhost:8000/uploads/images/Promotion 2_6_1585616303.jpg', 0, NULL),
(5, 6, 'Promotion 3', 'Promotion 3_6_1585616341.jpg', 'http://localhost:8000/uploads/images/Promotion 3_6_1585616341.jpg', 0, NULL),
(7, 2, 'None', NULL, NULL, 0, NULL),
(8, 1, 'OTC & Health Needs', 'OTC & Health Needs_1_1584777034.jpg', 'http://localhost:8000/uploads/images/OTC & Health Needs_1_1584777034.jpg', 0, NULL),
(9, 1, 'Vitamins & Supplements', 'Vitamins & Supplements_1_1584777088.jpg', 'http://localhost:8000/uploads/images/Vitamins & Supplements_1_1584777088.jpg', 0, NULL),
(10, 1, 'Diabetic Needs', 'Diabetic Needs_1_1584777119.png', 'http://localhost:8000/uploads/images/Diabetic Needs_1_1584777119.png', 0, NULL),
(11, 1, 'Health & Nutrition', 'Health & Nutrition_1_1584777433.png', 'http://localhost:8000/uploads/images/Health & Nutrition_1_1584777433.png', 0, NULL),
(13, NULL, 'None', NULL, NULL, 0, NULL),
(14, 4, 'None', NULL, NULL, 0, NULL),
(18, 11, 'Skin Care', NULL, NULL, 0, NULL),
(19, 11, 'Sanitary & Hygiene', NULL, NULL, 0, NULL),
(20, 11, 'Oral Care', NULL, NULL, 0, NULL),
(21, 11, 'Hair Care', NULL, NULL, 0, NULL),
(22, 11, 'Bath & Body Products', NULL, NULL, 0, NULL),
(23, 11, 'Sexual Wellness', NULL, NULL, 0, NULL),
(24, 11, 'Deodorants & Perfumes', NULL, NULL, 0, NULL),
(25, 11, 'Eyes, Ears & Lips', NULL, NULL, 0, NULL),
(26, 11, 'Shaving & Hair Removal', NULL, NULL, 0, NULL),
(27, 7, 'Baby Food', NULL, NULL, 0, NULL),
(28, 7, 'Baby Care', NULL, NULL, 0, NULL),
(29, 8, 'Diabetic Testing Needs', NULL, NULL, 0, NULL),
(30, 8, 'Diabetic Nutrition', NULL, NULL, 0, NULL),
(31, 8, 'Diabetic Aids', NULL, NULL, 0, NULL),
(32, 9, 'Health Drinks', NULL, NULL, 0, NULL),
(33, 9, 'Nutritional Foods', NULL, NULL, 0, NULL),
(34, 9, 'Breakfast Cereals', NULL, NULL, 0, NULL),
(35, 9, 'Weight Managment', NULL, NULL, 0, NULL),
(36, 10, 'First Aid', NULL, NULL, 0, NULL),
(37, 10, 'Pain Relief', NULL, NULL, 0, NULL),
(38, 10, 'Cold Relief', NULL, NULL, 0, NULL),
(39, 10, 'Joint Care & Support', NULL, NULL, 0, NULL),
(40, 10, 'Skin & Foot Care', NULL, NULL, 0, NULL),
(41, 10, 'Digestive & Laxatives', NULL, NULL, 0, NULL),
(42, 10, 'Healthcare Devices', NULL, NULL, 0, NULL),
(43, 10, 'Anti-Smoking Products', NULL, NULL, 0, NULL),
(44, 11, 'Hand, Foot & Nails', NULL, NULL, 0, NULL),
(45, 12, 'Sports Supplements', NULL, NULL, 0, NULL),
(46, 12, 'Vitamins & Minerals', NULL, NULL, 0, NULL),
(47, 12, 'Herbal Supplements', NULL, NULL, 0, NULL),
(48, 1, 'Medicine', 'Medicine_1_1585147375.jpg', 'http://localhost:8000/uploads/images/Medicine_1_1585147375.jpg', 0, NULL),
(49, 13, 'Medicine', NULL, NULL, 0, NULL),
(50, 5, 'Manager', NULL, NULL, 0, NULL),
(51, 5, 'Cashier', NULL, NULL, 0, NULL),
(52, 5, 'Accountant', NULL, NULL, 0, NULL),
(53, 5, 'Delivery Boy', NULL, NULL, 0, NULL),
(54, 6, 'Promotion 4', 'Promotion 4_6_1585616381.jpg', 'http://localhost:8000/uploads/images/Promotion 4_6_1585616381.jpg', 0, NULL),
(55, 6, 'Promotion 5', 'Promotion 5_6_1585616431.jpg', 'http://localhost:8000/uploads/images/Promotion 5_6_1585616431.jpg', 0, NULL),
(56, 6, 'Promotion 6', 'Promotion 6_6_1585616463.png', 'http://localhost:8000/uploads/images/Promotion 6_6_1585616463.png', 0, NULL),
(57, 6, 'Promotion 7', 'Promotion 7_6_1585616494.jpg', 'http://localhost:8000/uploads/images/Promotion 7_6_1585616494.jpg', 0, NULL),
(58, 6, 'Promotion 8', 'Promotion 8_6_1585616519.jpg', 'http://localhost:8000/uploads/images/Promotion 8_6_1585616519.jpg', 0, NULL),
(59, 1, 'Medical Equipments', 'Medical Equipments_1_1589619071.jpg', 'http://localhost:8000/uploads/images/Medical Equipments_1_1589619071.jpg', 0, NULL),
(60, 1, 'Others', 'Others_1_1589619255.png', 'http://localhost:8000/uploads/images/Others_1_1589619255.png', 0, NULL),
(61, 13, 'Medicine', NULL, NULL, 0, NULL),
(62, 14, 'Nestle', NULL, NULL, 0, NULL),
(63, 14, 'Pampers', NULL, NULL, 0, NULL),
(64, 14, 'Huggies', NULL, NULL, 0, NULL),
(65, 14, 'Abbott', NULL, NULL, 0, NULL),
(66, 14, 'Himalaya', NULL, NULL, 0, NULL),
(67, 14, 'Pfizer', NULL, NULL, 0, NULL),
(68, 14, 'Cipla', NULL, NULL, 0, NULL),
(69, 14, 'Sockoye', NULL, NULL, 0, NULL),
(70, 14, 'PediaSure', NULL, NULL, 0, NULL),
(71, 14, 'Actavis', NULL, NULL, 0, NULL),
(72, 14, 'Schazoo SPL', NULL, NULL, 0, NULL),
(73, 14, 'Biophar lifesciences', NULL, NULL, 0, NULL),
(74, 14, 'Seven Seas', NULL, NULL, 0, NULL),
(75, 14, 'Head & Shoulder', NULL, NULL, 0, NULL),
(76, 14, 'Inlife', NULL, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pharmacy`
--

CREATE TABLE `pharmacy` (
  `Id` int(11) NOT NULL,
  `Pharm_Name` varchar(150) NOT NULL,
  `Contact` varchar(20) NOT NULL,
  `Pharmacy_Address` longtext NOT NULL,
  `Latitude` float DEFAULT NULL,
  `Longitude` float DEFAULT NULL,
  `deleted` int(11) DEFAULT 0,
  `email` varchar(200) DEFAULT NULL,
  `pass` varchar(200) DEFAULT NULL,
  `image` longtext DEFAULT NULL,
  `imageUrl` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pharmacy`
--

INSERT INTO `pharmacy` (`Id`, `Pharm_Name`, `Contact`, `Pharmacy_Address`, `Latitude`, `Longitude`, `deleted`, `email`, `pass`, `image`, `imageUrl`) VALUES
(1, 'Servaid Pharmacy', '0423111626364', 'Main Market, Main Blvd, Main Market, Gulberg, Main Market, Lahore, Punjab 54030, Pakistan', 31.5239, 74.3466, 0, 'servaid123@gmail.com', 'servaid123', NULL, NULL),
(2, 'J.S PHARMACY', '03005500148', 'Tufail Rd, Cantt, Lahore, Punjab, Pakistan', 31.5228, 74.3794, 0, 'jspharmacy@gmail.com', 'jspharmacy123', NULL, NULL),
(3, 'Eleven Pharmacy', '04236651000', 'Abid majeed road  girja chowk lahore cantt Falcon Complex, Lahore,Pakistan', 31.5226, 74.3797, 0, 'elevenpharmacy@gmail.com', 'eleven123', NULL, NULL),
(4, 'Apple Pharmacy', '03004010889', 'Defence Road, Lahore, Punjab, Pakistan', 31.3977, 74.2345, 0, 'applepharmacy123@gmail.com', 'apple123', NULL, NULL),
(5, 'Green Life Pharmacy', '03302334232', 'Gul Afshan Society, Lahore, Punjab, Pakistan', 31.4021, 74.2333, 0, 'glp123@gmail.com', 'glp12345', NULL, NULL),
(6, 'Fazal Din Pharmacy', '03003938989', 'Block D Mohlan Wala Scheme, Lahore, Punjab, Pakistan', 31.4054, 74.17, 0, 'fazaldin123@gmail.com', 'fazaldin123', NULL, NULL),
(7, 'Ren Pharmacy Plus', '03015692694', 'Sector B, Shaheen Block Sector B Bahria Town, Lahore, Punjab, Pakistan', 31.3869, 74.1906, 0, 'ren456@gmail.com', 'renplus123', NULL, NULL),
(8, 'Servaid Pharmacy', '042111626364', 'Bahria Town Main Blvd, Sector C Commercial Area Sector C Bahria Town, Lahore, Punjab, Pakistan', 31.3752, 74.1864, 0, 'servaid456@gmail.com', 'servaid456', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pharmacysales`
--

CREATE TABLE `pharmacysales` (
  `Id` int(11) NOT NULL,
  `Pharm_Id` int(11) DEFAULT NULL,
  `Customer_Id` int(11) DEFAULT NULL,
  `Employee_Id` int(11) DEFAULT NULL,
  `Actual_Amount` float NOT NULL,
  `Discount` float DEFAULT NULL,
  `Total_Amount` float NOT NULL,
  `Payed` float NOT NULL,
  `Order_Date` datetime DEFAULT current_timestamp(),
  `deleted` int(11) DEFAULT 0,
  `due` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

CREATE TABLE `purchase` (
  `Id` int(11) NOT NULL,
  `Pharm_Id` int(11) DEFAULT NULL,
  `Employee_Id` int(11) DEFAULT NULL,
  `Actual_Amount` float NOT NULL,
  `Discount` float DEFAULT NULL,
  `Total_Amount` float NOT NULL,
  `Payed` float NOT NULL,
  `Due` float NOT NULL,
  `Purchase_Date` datetime DEFAULT current_timestamp(),
  `deleted` int(11) DEFAULT 0,
  `Distributor_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_details`
--

CREATE TABLE `purchase_details` (
  `Id` int(11) NOT NULL,
  `Stock_Id` int(11) DEFAULT NULL,
  `Purchase_Id` int(11) DEFAULT NULL,
  `unit_Qty` int(11) NOT NULL,
  `unit_BuyPrice` float NOT NULL,
  `deleted` int(11) DEFAULT 0,
  `Pharm_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_return`
--

CREATE TABLE `purchase_return` (
  `Id` int(11) NOT NULL,
  `Pharm_Id` int(11) DEFAULT NULL,
  `Purchase_Id` int(11) DEFAULT NULL,
  `Stock` int(11) DEFAULT NULL,
  `unit_Qty` int(11) NOT NULL,
  `TotalPrice` int(11) NOT NULL,
  `Return_Date` datetime DEFAULT current_timestamp(),
  `Employee_Id` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `Id` int(11) NOT NULL,
  `Pharm_Id` int(11) DEFAULT NULL,
  `User_Id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`Id`, `Pharm_Id`, `User_Id`, `rating`) VALUES
(1, 1, 1, 5),
(7, 1, 2, 4),
(8, 1, 3, 3),
(9, 1, 4, 2),
(10, 1, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sale_details`
--

CREATE TABLE `sale_details` (
  `Id` int(11) NOT NULL,
  `Stock_Id` int(11) DEFAULT NULL,
  `Sale_Id` int(11) DEFAULT NULL,
  `unit_Qty` int(11) NOT NULL,
  `deleted` int(11) DEFAULT 0,
  `Pharm_Id` int(11) DEFAULT NULL,
  `stock_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sale_return`
--

CREATE TABLE `sale_return` (
  `Id` int(11) NOT NULL,
  `Pharm_Id` int(11) DEFAULT NULL,
  `Sale_Id` int(11) DEFAULT NULL,
  `Stock` int(11) DEFAULT NULL,
  `unit_Qty` int(11) NOT NULL,
  `TotalPrice` float NOT NULL,
  `Return_Date` datetime DEFAULT current_timestamp(),
  `Employee_Id` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT 0,
  `stock_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `Id` int(11) NOT NULL,
  `Name` varchar(1000) CHARACTER SET utf8mb4 NOT NULL,
  `Item_Description` longtext DEFAULT NULL,
  `Item_Detailed_Description` longtext DEFAULT NULL,
  `Formula` int(11) DEFAULT NULL,
  `Pharm_Id` int(11) DEFAULT NULL,
  `Category_Id` int(11) DEFAULT NULL,
  `unit_Qty` int(11) DEFAULT 0,
  `qty_per_leaf` int(11) DEFAULT 0,
  `qty_per_box` int(11) DEFAULT 0,
  `unit_price` float DEFAULT 0,
  `leaf_price` float DEFAULT 0,
  `box_price` float DEFAULT 0,
  `Profit_Price` float DEFAULT 0,
  `Barcode` varchar(2000) CHARACTER SET utf8mb4 DEFAULT NULL,
  `DOE` date DEFAULT NULL,
  `expired` int(11) DEFAULT 0,
  `Available` int(11) DEFAULT 1,
  `unit_BuyPrice` float DEFAULT 0,
  `deleted` int(11) DEFAULT 0,
  `image` mediumtext DEFAULT NULL,
  `imageUrl` mediumtext DEFAULT NULL,
  `sub_category` int(11) DEFAULT NULL,
  `Brand` int(11) DEFAULT NULL,
  `delivery_charges` float DEFAULT NULL,
  `prescription_required` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`Id`, `Name`, `Item_Description`, `Item_Detailed_Description`, `Formula`, `Pharm_Id`, `Category_Id`, `unit_Qty`, `qty_per_leaf`, `qty_per_box`, `unit_price`, `leaf_price`, `box_price`, `Profit_Price`, `Barcode`, `DOE`, `expired`, `Available`, `unit_BuyPrice`, `deleted`, `image`, `imageUrl`, `sub_category`, `Brand`, `delivery_charges`, `prescription_required`) VALUES
(1, 'Nestle Nan Pro 1', 'Starter Instant Formula Powder 400g', '<p><strong>Nestl&eacute; NAN Pro 1</strong> is a spray dried Infant Formula with <strong><em>DHA ARA</em></strong> for infants from birth when they are not breastfed. NAN Pro 1 contains DHA that supports baby&rsquo;s normal brain development. It also contains <strong>Whey Protein, Vitamin A, C, D, Iron</strong> and <strong>Zinc</strong>. Nestl&eacute; develops infant nutrition products backed by evolving science and research. Innovation has been at the heart of Nestl&eacute; since its beginning. Optimal Preparation: Careful and hygienic preparation of Infant milk substitute is most essential for health. Do not use fewer scoops than directed, since diluted feeding will not provide adequate nutrients needed by your infant. Do not use more scoops than directed since concentrated feed will not provide the water needed by your infant. Storage: Ensure enclosed scoop is washed and thoroughly dried before use. After opening, use the contents within 3 weeks or the expiry date, whichever is earlier. Important Notice: Nestl&eacute; agrees with the World Health Organization and other leading medical and health associations that breast milk is the best and most natural food for babies. Safety Warnings: Unboiled water, unboiled utensils or incorrect dilution can make your baby ill. Incorrect storage, handling, preparation and feeding can potentially lead to adverse effects for the health of your baby. Infant milk substitute should be used only on the advice of a health worker as to the need for its use and the proper method of its use. Infant milk substitute is not the sole source of nourishment of an infant.</p>', 1, 1, 1, 50, 0, 0, 500, 0, 0, NULL, NULL, '2021-03-25', 0, 1, NULL, 0, 'Nestle Nan Pro 1__1_1_1585152859.jpg', 'http://localhost:8000/uploads/images/Nestle Nan Pro 1__1_1_1585152859.jpg', 27, 9, NULL, 0),
(2, 'Nestle NAN OPTI PRO 2', 'Starter Instant Formula Powder 400g', '<h3><strong>Key Features:</strong></h3>\r\n\r\n<ul>\r\n	<li>Package: Tin</li>\r\n	<li>Quantity: 400g&nbsp;</li>\r\n	<li>Age: 6-month-old +</li>\r\n	<li>Fulfills the nutrient requirement&nbsp;</li>\r\n	<li>Helps in the development of organs&nbsp;</li>\r\n	<li>Fights against harmful bacteria</li>\r\n	<li>No added sugar (sucrose) to build up a healthy eating habit</li>\r\n	<li>DHA/ARA</li>\r\n</ul>\r\n\r\n<h3><strong>Description:</strong></h3>\r\n\r\n<p>The premium Nestle NAN OPTI PRO 2 is formulated specifically for babies to provide them with all the right nutrients that are important for their development and growth. This premium formula also contains OPTIPRO, which is a protein blend that tends to provide quality proteins and helps in the gentle development of organs. It also has the nutrients DHA and ARA that help in the development of the brain and eyes. Moreover, it has BIFIDUS BL probiotics, which maintains a desirable balance of beneficial bacteria in your child&#39;s gut and keeps their digestive systems well and healthy. So give your baby this product to make them strong and healthy!&nbsp;</p>\r\n\r\n<p>To make the formula:</p>\r\n\r\n<ul>\r\n	<li>First, you need to wash all the baby-feeding utensils and sterilize them in boiling water.</li>\r\n	<li>Now, in another pan heat up water for 5 minutes or so.</li>\r\n	<li>Pour the water in the baby-feeder</li>\r\n	<li>Now, using the spoon that comes with the package add the baby powder (according to the nutrition chart) to the hot water.</li>\r\n	<li>Keep on shaking the baby-feeder till everything is mixed properly.</li>\r\n	<li>Make sure that the solution has cooled down before feeding your baby.</li>\r\n</ul>\r\n\r\n<h3><strong>Precautions:</strong></h3>\r\n\r\n<p>This product is not a substitute for breast milk, therefore, consult a health professional before using it.</p>\r\n\r\n<h3><strong>Storage:</strong></h3>\r\n\r\n<p>Keep product in a cool and dry place away from sunlight.</p>\r\n\r\n<p>How to get it?</p>\r\n\r\n<p>Offering the Nestle NANGROW2-400g with fast delivery Karachi, Lahore, Islamabad, Quetta, Peshawar, Rawalpindi and many other cities of Pakistan.</p>', 1, 1, 1, 50, 0, 0, 600, 0, 0, NULL, NULL, '2021-06-17', 0, 1, NULL, 0, 'Nestle NAN OPTI PRO 2__1_7_1585157682.jpg', 'http://localhost:8000/uploads/images/Nestle NAN OPTI PRO 2__1_7_1585157682.jpg', 27, 9, NULL, 0),
(3, 'Nestle Cerelac', 'Wheat 350gm', '<h3><strong>Key Features:</strong></h3>\r\n\r\n<ul>\r\n	<li>Package: Box</li>\r\n	<li>Quantity: 350ml</li>\r\n	<li>Flavor: Wheat</li>\r\n	<li>Age: 6 months+</li>\r\n	<li>Rich in iron and full of nutrition</li>\r\n	<li>Includes Bifidus B</li>\r\n	<li>Helps in the growth of the baby</li>\r\n</ul>\r\n\r\n<h3><strong>Description:</strong></h3>\r\n\r\n<p>When your baby reaches their 6-month-old mark then they are ready to try their first solid food and that is why Nestle Cerelac is best for them. It is packed and enriched with the necessary nutrition including Bifidus B to help in the growth of the baby. This wheat filled product is rich in iron and amazing in taste. Get this Cerelac and let your baby enjoy the delicious meal till the very last bite!&nbsp;</p>\r\n\r\n<p>To make the Cerelac:</p>\r\n\r\n<ul>\r\n	<li>Take a pan, boil water for 5 minutes and let it cool</li>\r\n	<li>Measure approximately 75ml of lukewarm water and pour it in a bowl.</li>\r\n	<li>Add up to 4 leveled tablespoons of Nestle Cerelac and mix well.</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3><strong>Storage:</strong></h3>\r\n\r\n<p>To keep the product fresh, store NESTLE CERELAC in an air-tight container and in a cool place. Try to use it within 3 weeks of opening.</p>\r\n\r\n<h3><strong>How to get it?</strong></h3>\r\n\r\n<p>Offering the Nestle Cerelac Wheat 350gm with fast shipping in Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta and many other cities of Pakistan.</p>', 1, 1, 1, 50, 0, 0, 365, 0, 0, NULL, NULL, '2021-11-09', 0, 1, NULL, 0, 'Nestle Cerelac__1_7_1585158315.jpg', 'http://localhost:8000/uploads/images/Nestle Cerelac__1_7_1585158315.jpg', 27, 9, NULL, 0),
(4, 'Pediasure Complete', 'Pediasure Strawberry 400gm', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>It is a complete and balanced nutrition for your everyday health. Every serving of this drink contains protein, vitamins, minerals, and other nutritious calories. As an everyday drink, it is quick, delicious and highly nutritious. The cherry on top, it is low in fat and contains only 2g of sugar. This drink provides targeted nutrition and lends a helping hand to you in staying active and strong. Also, you can easily trust this product as this is the number one choice of nutritionists and dietary consultants.</p>\r\n\r\n<h3><strong>How to get it?</strong></h3>\r\n\r\n<p>Offering the Pediasure Strawberry 400gm with fast shipping in Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta and many other cities of Pakistan.</p>', 1, 1, 1, 35, 0, 0, 1060, 0, 0, NULL, NULL, '2021-05-12', 0, 1, NULL, 0, 'Pediasure Complete__1_7_1585158602.jpg', 'http://localhost:8000/uploads/images/Pediasure Complete__1_7_1585158602.jpg', 27, 4, NULL, 0),
(5, 'Similac Isomil', 'Soy Infant Formula', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Soothe your baby&#39;s tummy!</p>\r\n\r\n<p>The Similac Soy is specially formulated to comfort your baby&#39;s tummy. Soy-based formulas have shown to help reduce feeding problems and it also consists of Opti-grow that helps in the thorough development of the baby&#39;s brain and eyes. If your baby&#39;s fussiness or gas seems excessive then consult a doctor about switching to Similac Soy.&nbsp;</p>', 1, 1, 1, 45, 0, 0, 1000, 0, 0, 0, NULL, '2021-08-25', 0, 1, 0, 0, 'Similac Isomil__1_7_1585208561.jpg', 'http://localhost:8000/uploads/images/Similac Isomil__1_7_1585208561.jpg', 27, 10, NULL, 0),
(6, 'Nestle Nido', 'Fortigrow 910g', '<h3><strong>Key Features:</strong></h3>\r\n\r\n<ul>\r\n	<li>\r\n	<p>Package: Packet</p>\r\n	</li>\r\n	<li>\r\n	<p>Quantity: 910g</p>\r\n	</li>\r\n	<li>\r\n	<p>Age: (School kids) 5+</p>\r\n	</li>\r\n	<li>\r\n	<p>Helps in the physical and mental health growth of children</p>\r\n	</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3><strong>Description:</strong></h3>\r\n\r\n<p>The Nestle Nido Fortigrow 910g is formulated for school going children and this helps the child grow physically and mentally. It is filled with 24 minerals and vitamins which help in the immunity and growth for a healthier body.</p>\r\n\r\n<p>Instructions:</p>\r\n\r\n<ul>\r\n	<li>\r\n	<p>To make milk, add 3 tablespoons of NIDO to 1 glass of warm or cold boiled water.</p>\r\n	</li>\r\n	<li>\r\n	<p>Mix it properly.</p>\r\n	</li>\r\n</ul>', 1, 1, 1, 60, 0, 0, 970, 0, 0, 0, NULL, '2021-09-28', 0, 1, 0, 0, 'Nestle Nido__1_7_1585208900.jpg', 'http://localhost:8000/uploads/images/Nestle Nido__1_7_1585208900.jpg', 27, 9, NULL, 0),
(7, 'Morinaga BF-2', '900gm', '<h3><strong>Key Features:</strong></h3>\r\n\r\n<ul>\r\n	<li>\r\n	<p>Follow-Up Formula</p>\r\n	</li>\r\n	<li>\r\n	<p>Age: Above 6 Months</p>\r\n	</li>\r\n	<li>\r\n	<p>Powder form Milk for Babies</p>\r\n	</li>\r\n	<li>\r\n	<p>Pack Size: 1 container</p>\r\n	</li>\r\n	<li>\r\n	<p>Content: 900 grams</p>\r\n	</li>\r\n</ul>\r\n\r\n<h3><strong>Description:</strong></h3>\r\n\r\n<p>Morinaga BF-2 Follow-up-Formula (From 6 Months) is specially formulated for newborn babies to help them grow faster and stronger. This formula milk contains essential nutrients for your baby that will help in their proper development and fulfill all of their nutritional requirements.</p>', 1, 1, 1, 70, 0, 0, 2300, 0, 0, 0, NULL, '2020-11-27', 0, 1, 0, 0, 'Morinaga BF-2__1_7_1585209314.jpg', 'http://localhost:8000/uploads/images/Morinaga BF-2__1_7_1585209314.jpg', 27, 11, NULL, 0),
(8, 'PAMPERS', 'PANTS NEW BABY 86S', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Pampers Baby Dry Pants &ndash; New Baby, in a pack of 86, comes with the softest top layer. It is ultra thin and contains absorbent gel material (ABM), otherwise known as Magic Gel, which instantly absorbs the liquid and locks it away, keeping the baby dry for the longest hours.</p>\r\n\r\n<p>Pampers Baby Dry Pants &ndash; New Baby comes with fastening tapes that can stick multiple times, ensuring that the diaper fits comfortably, avoiding rashes and discomfort.</p>\r\n\r\n<h3><strong>Benefits of Pampers Baby Dry Pants &ndash; New Baby</strong></h3>\r\n\r\n<ul>\r\n	<li>Ultra thin</li>\r\n	<li>Magic gel core instantly absorbs the liquid and locks it away</li>\r\n	<li>Incredibly soft top layer</li>\r\n	<li>Keeps the baby dry and comfortable for the longest time</li>\r\n	<li>Fastening tapes ensure that the diaper fits comfortably</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>Open the tapes of the Pampers Baby Dry Pants &ndash; New Baby, and gently slip the baby into the diapers and fasten the tapes, ensuring that the diaper is just right and not too tight on the baby. After use, dispose off the fecal matter into the toilet and roll the diaper in a waste paper and tape the open ends, and dispose it into a waste paper basket. Do not flush the diaper into the toilet.</p>', 1, 1, 1, 54, 0, 0, 1200, 0, 0, 0, NULL, '2020-12-31', 0, 1, 0, 0, 'PAMPERS_1_1_28_1589651794.jpg', 'http://localhost:8000/uploads/images/PAMPERS_1_1_28_1589651794.jpg', 28, 2, NULL, 0),
(9, 'HUGGIES', 'WONDER PANTS - S 76S', '<h2>Product Information</h2>\r\n\r\n<p>Choosing the right diaper is one of the most important factors for your baby&#39;s comfort. It gets crucial to ensure your baby products are safe to use. Huggies Wonder Pants - S, in a pack of 76, are small-sized, pant style disposable diapers that are easy to wear - ideal for babies with weight 4-8kgs. Huggies is often believed to be a best diaper brand. This particular baby diaper comes with a highly stretchable elastic that adapts to the baby&#39;s body size that keeps your baby comfortable and gentle. The product comes with a feather-soft, air fresh top cover that allows free flow of the air, keeping the baby&#39;s skin fresh, preventing any skin irritations. Its absorbent core instantly soaks up the liquid and keeps the baby dry for up to 12 hours.</p>\r\n\r\n<p><br />\r\n<strong>Benefits of the Huggies Wonder Pants Diapers- S:</strong></p>\r\n\r\n<ul>\r\n	<li>Easy to wear, pant style diapers</li>\r\n	<li>Double leak guard prevents leakage along the sides</li>\r\n	<li>Flexible waist</li>\r\n	<li>Feather soft, air-fresh top cover that keeps the skin fresh</li>\r\n	<li>Prevents redness, rashes and other skin irritations</li>\r\n	<li>Absorbent core that instantly soaks up the liquid - 12 hours dryness</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Usage:</strong>&nbsp;Ensure that the baby is in a comfortable position. Pull the diaper pant with Huggies logo at the back and then slip on the Huggies Wonder Pants - S. After use, to remove, simply tear off both sides and just pull the diaper down. Discard the fecal matter into the toilet. Then, wrap the diaper in a waste paper and tape the open ends. Then, dispose it in a waste paper basket. Do not flush the diaper into the toilet.</p>', 1, 1, 1, 85, 0, 0, 890, 0, 0, 0, NULL, '2020-12-23', 0, 1, 0, 0, 'HUGGIES_1_1_28_1589672364.jpg', 'http://localhost:8000/uploads/images/HUGGIES_1_1_28_1589672364.jpg', 28, 3, NULL, 0),
(10, 'PAMPERS', 'FRESH CLEAN BABY WIPES 64S', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Pampers Fresh Clean Baby Wipes, in the net quantity of 64 wipes, comes with gentle moisturizing and cleansing ingredients that soften the skin and cleanse the skin thoroughly, getting rid of all the dirt, germs and other impurities, leaving the skin completely clean.</p>\r\n\r\n<p>These baby wipes are gentle and mild on the baby&#39;s skin, therefore, they can be used anytime, anywhere, in order to keep the baby&#39;s skin always clean. They also come in an easy-to-use and travel-friendly packaging.</p>\r\n\r\n<h3><strong>Benefits of Pampers Fresh Clean Baby Wipe</strong></h3>\r\n\r\n<ul>\r\n	<li>Contains cleansing and moisturizing ingredients</li>\r\n	<li>&nbsp;</li>\r\n	<li>Leaves the skin soft</li>\r\n	<li>&nbsp;</li>\r\n	<li>Gets rid of all the dirt, germs and other impurities</li>\r\n	<li>&nbsp;</li>\r\n	<li>Gentle and mild on the baby?s skin</li>\r\n	<li>&nbsp;</li>\r\n	<li>Travel-friendly packaging</li>\r\n</ul>\r\n\r\n<h3><strong>Product Specifications</strong></h3>\r\n\r\n<ul>\r\n	<li>Net Quantity: 64 units</li>\r\n	<li>&nbsp;</li>\r\n	<li>Soft grip texture, fragranced</li>\r\n	<li>&nbsp;</li>\r\n	<li>Dermatologically tested</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>The Pampers Fresh Clean Baby Wipes can be used anytime for cleansing the baby&#39;s skin. They can also be used to clean the baby?s bottoms during a diaper change.</p>\r\n\r\n<h3><strong>Caution</strong></h3>\r\n\r\n<p>Store the wipes in their original packaging. Do not reuse a wipe.</p>', 1, 1, 1, 94, 0, 0, 300, 0, 0, 0, NULL, '2020-12-30', 0, 1, 0, 0, 'PAMPERS_1_1_28_1589674586.jpg', 'http://localhost:8000/uploads/images/PAMPERS_1_1_28_1589674586.jpg', 28, 2, NULL, 0),
(11, 'JOHNSON\'S', 'BABY SKINCARE WIPES 80S', '<h2>Product Information</h2>\r\n\r\n<p>Johnson&#39;s Baby Skincare Wipes, in a pack of 80, are enriched with moisturizing ingredients that help keep the baby&#39;s soft and moisturized at all times. They gently cleanse the baby&#39;s skin, removing away all the dirt and the germs. Therefore, you can keep the baby clean at all times and all places. These wipes are easy to use, and come in a travel-friendly packaging, therefore they can be carried around and used anytime, anywhere.</p>\r\n\r\n<h3><strong>Benefits of Johnson&rsquo;s Baby Skincare Wipes</strong></h3>\r\n\r\n<ul>\r\n	<li>Water-saturated</li>\r\n	<li>Enriched with moisturizing ingredients</li>\r\n	<li>Cleanses the skin, removing the dirt, germs</li>\r\n	<li>Gentle and mild on the baby&#39;s skin</li>\r\n	<li>Travel-friendly packaging</li>\r\n</ul>\r\n\r\n<h3><strong>Product Specifications</strong></h3>\r\n\r\n<ul>\r\n	<li>Net Quantity: 80 units</li>\r\n	<li>Safe for use on newborns</li>\r\n	<li>Clinically proven to be gentle, mild and safe</li>\r\n	<li>Dermatologist tested</li>\r\n</ul>\r\n\r\n<h3><strong>Usage and Storage</strong></h3>\r\n\r\n<p>The Johnson&#39;s Baby Skincare Wipes can be used anytime, anywhere to clean away dirt, germs, etc. They can also be used to clean the baby&#39;s bottoms<br />\r\nduring a diaper change.</p>\r\n\r\n<p>Always store the wipes in their original packaging. Do not reuse a wipe.</p>', 1, 1, 1, 100, 0, 0, 320, 0, 0, 0, NULL, '2020-12-31', 0, 1, 0, 0, 'JOHNSON\'S_1_1_28_1589674853.jpg', 'http://localhost:8000/uploads/images/JOHNSON\'S_1_1_28_1589674853.jpg', 28, 12, NULL, 0),
(12, 'JOHNSON\'S', 'BABY LOTION 100ML', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Johnson&#39;s Baby Lotion, in the net quantity of 100ml, is made from natural Plant oil, is pH balanced and hypoallergenic, making it the best for baby&#39;s skin as it moisturizes the skin thoroughly and also helps the skin retain the moisture. This is important because baby&#39;s skin tends to lose moisture quickly as it is thinner than adult skin.</p>\r\n\r\n<p>Johnson&#39;s Baby Lotion is lightweight and non-sticky in texture, therefore it does not feel heavy on application. It is also gentle and mild on the skin, making it safe for use on baby&#39;s skin.</p>\r\n\r\n<h3><strong>Benefits of Johnson&rsquo;s Baby Lotion</strong></h3>\r\n\r\n<ul>\r\n	<li>Moisturizes the skin</li>\r\n	<li>Helps the skin retain moisture, preventing moisture loss</li>\r\n	<li>Made from natural Plant Oil, and is pH balanced to suit the baby&#39;s skin</li>\r\n	<li>Gentle and mild on the skin</li>\r\n	<li>Lightweight and non-sticky</li>\r\n</ul>\r\n\r\n<p>Product Specifications</p>\r\n\r\n<ul>\r\n	<li>Net Quantity: 100ml</li>\r\n	<li>Mildly fragranced</li>\r\n	<li>Clinically proven to be mild</li>\r\n	<li>Hypoallergenic</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>After bathing the baby, take a required amount of the Johnson&#39;s Baby Lotion and apply it all over the baby&#39;s skin, concentrating on the dryer areas. For best results, use daily.</p>', 1, 1, 1, 80, 0, 0, 165, 0, 0, 0, NULL, '2020-12-31', 0, 1, 0, 0, 'JOHNSON\'S_1_1_28_1589675059.jpg', 'http://localhost:8000/uploads/images/JOHNSON\'S_1_1_28_1589675059.jpg', 28, 12, NULL, 0),
(13, 'JOHNSON\'S', 'BABY OIL 100ML', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Johnson&#39;s Baby Oil, in the net quantity of 100ml, is enriched with Vitamin E. It nourishes the skin and moisturizes it, leaving it soft, healthy and radiant. It helps the skin retain its moisture, thereby leaving keeping it hydrated always. It works well as a massage oil, soothing and nourishing the body. It also helps in nourishing the baby&#39;s hair as well. This baby oil is gentle and mild, thereby safe for regular use.</p>\r\n\r\n<h3><strong>Benefits of Johnson&rsquo;s Baby Oil</strong></h3>\r\n\r\n<ul>\r\n	<li>Enriched with Vitamin E</li>\r\n	<li>Works amazingly well as a massage oil</li>\r\n	<li>Nourishes and moisturizes the skin</li>\r\n	<li>Helps the skin retain its moisture</li>\r\n	<li>Soothing</li>\r\n	<li>Strengthens hair</li>\r\n	<li>Gentle and mild</li>\r\n</ul>\r\n\r\n<p>Product Specifications</p>\r\n\r\n<ul>\r\n	<li>Net Quantity: 100ml</li>\r\n	<li>Contains Vitamin E</li>\r\n	<li>Clinically proven to be mild</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>Take a generous amount of the Johnson&#39;s Baby Oil and apply it liberally all over the baby&#39;s skin and massage gently. It can be used to massage the<br />\r\nscalp of the baby as well.</p>', 1, 1, 1, 80, 0, 0, 200, 0, 0, 0, NULL, '2021-11-23', 0, 1, 0, 0, 'JOHNSON\'S_1_1_28_1589702288.jpg', 'http://localhost:8000/uploads/images/JOHNSON\'S_1_1_28_1589702288.jpg', 28, 12, NULL, 0),
(14, 'BABY DOVE', 'RICH MOISTURE BABY MASSAGE OIL 100ML', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Baby&#39;s skin is 30% thinner than the adult skin, which can make it lose moisture up to 5 times faster than the adult skin making it more prone to excessive dryness. Baby Dove Rich Moisture Baby Massage Oil, in the net quantity of 100 ml, helps replenish the moisture into the baby&#39;s skin, leaving it thoroughly moisturized, nourished and healthy. The gentle fragrance of this massage oil helps soothe and relax, keeping the baby feeling fresh all day. This massage oil is gentle and mild on the baby&#39;s skin, making it ideal for daily use.</p>\r\n\r\n<h3><strong>Benefits of Baby Dove Rich Moisture</strong></h3>\r\n\r\n<ul>\r\n	<li>Pediatrician and dermatologist-tested</li>\r\n	<li>Nourishes and moisturizes the baby&#39;s skin</li>\r\n	<li>Mild and non-irritating on the baby&#39;s skin</li>\r\n	<li>Light and non-greasy</li>\r\n	<li>Keeps the baby&#39;s skin soft and healthy</li>\r\n	<li>Ideal for every day use</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>After bathing the baby, it is advisable to take a required amount of the Baby Dove Rich Moisture Baby Massage Oil onto your clean hands, and gently massage it onto the baby&#39;s skin, making sure that it is completely absorbed, making sure to give extra attention to the dryer areas. For the best results, use this massage oil on a daily basis.</p>', 1, 1, 1, 60, 0, 0, 230, 0, 0, 0, NULL, '2021-12-25', 0, 1, 0, 0, 'BABY DOVE_1_1_28_1589702560.jpg', 'http://localhost:8000/uploads/images/BABY DOVE_1_1_28_1589702560.jpg', 28, 13, NULL, 0),
(15, 'JOHNSON\'S', 'BABY POWDER 100GM', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Johnson&#39;s Baby Powder, in the net quantity of 100gms, is specially formulated to suit baby&#39;s skin which is more sensitive than the adult skin, therefore more prone to irritation. This baby powder is mild and non-irritating. Its mild fragrance is soothing, and it helps regulate sweat and protects the body from prickly heat and other skin irritations. It keeps the baby dry and comfortable. This baby powder is extremely fine milled and soft in texture, making it easy for application.</p>\r\n\r\n<h3><strong>Benefits of Johnson&rsquo;s Baby Powder</strong></h3>\r\n\r\n<ul>\r\n	<li>Suits the sensitive skin of the babies</li>\r\n	<li>Mild and non-irritating</li>\r\n	<li>Mildly fragranced</li>\r\n	<li>Regulates sweat and absorbs dampness</li>\r\n	<li>Keeps the baby dry and comfortable</li>\r\n	<li>Finely milled and smooth in texture</li>\r\n</ul>\r\n\r\n<p>Product Specifications</p>\r\n\r\n<ul>\r\n	<li>Net Quantity: 100gms</li>\r\n	<li>Hypoallergenic</li>\r\n	<li>Clinically proven to be mild</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>After bathing the baby, take a generous amount of the Johnson&#39;s Baby Powder and apply it all over the baby&#39;s skin, concentrating more on the warmed regions of the body such as the underarms. For best results, use daily.</p>', 1, 1, 1, 70, 0, 0, 300, 0, 0, 0, NULL, '2020-12-24', 0, 1, 0, 0, 'JOHNSON\'S_1_1_28_1589702767.jpg', 'http://localhost:8000/uploads/images/JOHNSON\'S_1_1_28_1589702767.jpg', 28, 12, NULL, 0),
(16, 'JOHNSON\'S', 'BABY POWDER BLOSSOMS 50GM', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Johnson&#39;s Baby Powder Blossoms, in the net quantity of 50gms, has been specially formulated to suit the highly sensitive and delicate skin of the babies that is more prone to irritation than the adult skin. It has clinically proven to be mild and non-irritating. It helps regulate sweat, protecting the skin from prickly heat and other redness and irritations. This baby powder comes with a fragrance that is soothing. It keeps the baby dry and comfortable all day. It is also finely milled and smooth in texture, making for an easy application.</p>\r\n\r\n<h3><strong>Benefits of Johnson&rsquo;s Baby Powder Blossoms</strong></h3>\r\n\r\n<ul>\r\n	<li>Extremely mild and non-irritating</li>\r\n	<li>Regulates sweat and absorbs dampness</li>\r\n	<li>Keeps the baby dry and comfortable</li>\r\n	<li>Protects the skin from prickly heat, rashes, redness and other skin irritations</li>\r\n	<li>Mild, soothing fragrance</li>\r\n	<li>Finely milled and smooth in texture</li>\r\n</ul>\r\n\r\n<p>Product Specifications</p>\r\n\r\n<ul>\r\n	<li>Net Quantity: 50gms</li>\r\n	<li>Hypoallergenic</li>\r\n	<li>Clinically proven to be mild</li>\r\n</ul>\r\n\r\n<p><strong>Usage</strong></p>\r\n\r\n<p>After bathing the baby, take a required amount of the Johnson&#39;s Baby Powder Blossoms and apply it liberally all over the baby&#39;s face and body. For best results, use daily.</p>', 1, 1, 1, 80, 0, 0, 320, 0, 0, 0, NULL, '2020-12-25', 0, 1, 0, 0, 'JOHNSON\'S_1_1_28_1589702875.jpg', 'http://localhost:8000/uploads/images/JOHNSON\'S_1_1_28_1589702875.jpg', 28, 12, NULL, 0),
(17, 'BABY DOVE', 'RICH MOISTURE BAR 75GM', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Baby&#39;s skin is 30% thinner than the adult skin which makes it more vulnerable to damage, and their skin can lose moisture 5 times quicker than the adult skin, which can make it highly dry. Baby Dove Rich Moisture Bar, in the net quantity of 75gms, is the perfect solution to all these issues.</p>\r\n\r\n<p>Enriched with 1/4 mild moisturizing cream and being hypoallergenic and pH neutral, this bar is gentle and mild on the baby&#39;s skin. It nourishes, moisturizes and protects the baby&#39;s skin, leaving it soft, smooth and healthy. The gentle fragrance of the Baby Dove Rich Moisture Bar helps soothe the baby, making the bath-times a lot more special and easier.</p>\r\n\r\n<p><strong>Suitable for newborns as well</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3><strong>Benefits of Baby Dove Moisture Bar</strong></h3>\r\n\r\n<ul>\r\n	<li>Opthalmologist, pediatrician and dermatologist-tested</li>\r\n	<li>Gentle and mild on the baby&#39;s skin; ideal for daily use</li>\r\n	<li>Cleanses, moisturizes and hydrates baby&#39;s skin</li>\r\n	<li>Makes the baby&#39;s skin soft and healthy</li>\r\n	<li>Hypoallergenic and pH neutral</li>\r\n	<li>Non-irritating on the baby&#39;s delicate skin</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>It is advisable to moisten the baby&#39;s hair and body with water, and use your hands to work up a lather by rubbing the Baby Dove Rich Moisture Bar in between your palms. Gently massage the lather onto the baby&#39;s skin and hair, using your hands or a wash cloth. Wash off and pat dry.</p>\r\n\r\n<p>It is recommended to follow this up with Baby Dove Rich Moisture Nourishing Baby Lotion to help the baby&#39;s skin retain the moisture for up to 24 hours.</p>', 1, 1, 1, 75, 0, 0, 350, 0, 0, 0, NULL, '2021-03-03', 0, 1, 0, 0, 'BABY DOVE_1_1_28_1589703570.jpg', 'http://localhost:8000/uploads/images/BABY DOVE_1_1_28_1589703570.jpg', 28, 13, NULL, 0),
(18, 'JOHNSON\'S', 'BABY SOAP 150GM', '<h2>&nbsp;</h2>\r\n\r\n<h2><strong>Product Information</strong></h2>\r\n\r\n<p>The Johnson&#39;s Baby Soap, in the net quantity of 150gms, is enriched with 1/4th body lotion and Vitamin E. This helps nourish and moisturize the skin, leaving it soft and healthy. It also helps the skin retain its moisture, thus keeping it hydrated at all times.</p>\r\n\r\n<p>The Johnson&#39;s Baby Soap gently and thoroughly cleanses the skin, removing all the impurities and leaving it completely clean. It comes with a gentle fragrance. It is also gentle and mild on the skin, making it safe for daily use.</p>\r\n\r\n<h3><strong>Benefits of Johnson&rsquo;s Baby Soap</strong></h3>\r\n\r\n<ul>\r\n	<li>Contains 1/4th Body Lotion and Vitamin E</li>\r\n	<li>Moisturizes the skin and helps it retain the moisture</li>\r\n	<li>Vitamin E nourishes the skin, leaving it healthy and radiant</li>\r\n	<li>Cleanses the skin thoroughly</li>\r\n	<li>Gets rid of all the dirt, grime and other impurities</li>\r\n	<li>Gentle and mild on the skin</li>\r\n</ul>\r\n\r\n<h3><strong>Product Specifications</strong></h3>\r\n\r\n<ul>\r\n	<li>Net Quantity: 150gms</li>\r\n	<li>Dermatologist tested</li>\r\n	<li>Clinically proven to be mild</li>\r\n	<li>Free from Parabens and Phthalates</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>After moistening the baby&#39;s skin with water, apply the Johnson&#39;s Baby Soap liberally all over, working up a lather. Clean the skin thoroughly, and then, wash off with water. For best results, use daily.</p>\r\n\r\n<p>After moistening the baby&#39;s skin with water, apply the Johnson&#39;s Baby Soap liberally all over, working up a lather. Clean the skin thoroughly, and then, wash off with water. For best results, use daily.</p>', 1, 1, 1, 70, 0, 0, 350, 0, 0, 0, NULL, '2021-05-04', 0, 1, 0, 0, 'JOHNSON\'S_1_1_28_1589703740.jpg', 'http://localhost:8000/uploads/images/JOHNSON\'S_1_1_28_1589703740.jpg', 28, 12, NULL, 0),
(19, 'WOODWARD\'S', 'GRIPE WATER 200 ML', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Woodward&#39;s Gripe Water, in the net quantity of 200ml, contains the oils of Dill herb and Sarjikakshra. It offers instant relief from gripe and stomach pain that is caused by acidity and indigestion. It aids the process of digestion and promotes healthy growth of the baby. The product also comes in useful during the teething period. It helps relive the massive discomfort that the little ones go through during this period.</p>\r\n\r\n<h3><strong>Benefits of Woodward&#39;s Gripe Water</strong></h3>\r\n\r\n<ul>\r\n	<li>Instant relief from gripe and stomach pain that is a result of acidity or indigestio</li>\r\n	<li>Promotes digestion</li>\r\n	<li>Ensures the healthy growth of the baby</li>\r\n	<li>Relieves discomfort caused during the teething period</li>\r\n	<li>Comes in a travel-friendly packaging</li>\r\n</ul>\r\n\r\n<h3><strong>Product Specifications</strong></h3>\r\n\r\n<ul>\r\n	<li>Net Quantity: 200ml</li>\r\n	<li>Age: 3-18 months</li>\r\n	<li>Ayurvedic medicin</li>\r\n	<li>Alcohol-free</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>The dosage has been prescribed at the back of the pack as per the age of the baby. The dosage can also be followed as per the directions given by your physician.</p>', 1, 1, 1, 80, 0, 0, 150, 0, 0, 0, NULL, '2021-08-21', 0, 1, 0, 0, 'WOODWARD\'S_1_1_28_1589704501.jpg', 'http://localhost:8000/uploads/images/WOODWARD\'S_1_1_28_1589704501.jpg', 28, 14, NULL, 0),
(20, 'VASELINE', 'INTENSIVE CARE DEEP RESTORE LOTION 200ML', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Vaseline Intensive Care Deep Restore Lotion, in the net quantity of 200 ml, is specially designed using the micro-droplets of Vaseline Jelly, which triples the skin moisture levels and helps keep the skin moisturized all day long. It helps reduce dryness of the skin and also protects the skin from any further dryness. Intensely nourishing and moisturizing on the skin, this lotion is lightweight and non-greasy in texture, which makes for easy and quick absorption into the skin, providing the maximum benefits.</p>\r\n\r\n<h3><strong>Benefits of Vaseline Intensive Care Deep Restore Lotion</strong></h3>\r\n\r\n<ul>\r\n	<li>Micro-droplets of Vaseline Jelly triple the skin moisture levels, keeping the skin moisturized all day long</li>\r\n	<li>Reduces and prevents the dryness of the skin</li>\r\n	<li>Heals and repairs dull, rough ski</li>\r\n	<li>Regular use of this lotion helps impart a natural glow to the skin, making it look radiant</li>\r\n	<li>Lightweight and non-greasy; ideal for regular use</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>It is advisable to use the Vaseline Intensive Care Deep Restore Lotion by gently massaging it all over the body till the lotion gets completely absorbed. Pay extra attention to the more dryer areas. For the best results, use this lotion twice, daily.</p>', 1, 1, 2, 120, 0, 0, 480, 0, 0, 0, NULL, '2021-09-24', 0, 1, 0, 0, 'VASELINE_1_2_18_1589705287.jpg', 'http://localhost:8000/uploads/images/VASELINE_1_2_18_1589705287.jpg', 18, 16, NULL, 0),
(21, 'DOVE', 'ESSENTIAL NOURISHMENT BODY LOTION 250ML', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Dove Essential Nourishment Body Lotion, in the net quantity of 250ml, is uniquely designed using the DeepCare Complex &ndash; containing natural skin nutrients and rich essential oils, which deeply nourish and moisturize the skin, reducing dryness, roughness and dullness of the skin.</p>\r\n\r\n<p>The light and non-greasy formula makes for easy absorption into the skin, providing maximum results. An essential item to be included in regular skin care, it helps give long-lasting smooth, healthy and moisturized skin.</p>\r\n\r\n<h3><strong>Benefits of Dove Essential Nourishment Body Lotion</strong></h3>\r\n\r\n<ul>\r\n	<li>DeepCare Complex nourishes and moisturizes the skin</li>\r\n	<li>Reduces and prevents dryness, roughness and dullness of the skin</li>\r\n	<li>Light and non-greasy in texture</li>\r\n	<li>Improves the texture of the skin with regular use</li>\r\n	<li>Makes the skin healthy and soft</li>\r\n	<li>Suitable for every day use</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>It is advisable to take a required amount of the Dove Essential Nourishment Body Lotion and apply it all over the body, gentle massaging it in, paying more attention to the dry areas of the skin. For the best results, use this lotion on a daily basis.</p>', 1, 1, 2, 90, 0, 0, 520, 0, 0, 0, NULL, '2021-10-15', 0, 1, 0, 0, 'DOVE_1_2_18_1589705525.jpg', 'http://localhost:8000/uploads/images/DOVE_1_2_18_1589705525.jpg', 18, 15, NULL, 0),
(22, 'POND\'S', 'MOISTURISING COLD CREAM 100ML', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Get the perfectly soft and radiant skin that makes everyone go googly-woogly-whoosh with the Pond&#39;s Moisturising Cold Cream, in the net quantity of 100ml. This cream, which is carefully formulated using occlusives and humectants, reduces dryness and soothes the skin. It nourishes and moisturises the skin, leaving it healthy and silky smooth. The product is non-greasy in texture; does not feel heavy on the skin, which makes it ideal for daily use, especially during the winters when the skin gets dry, flaky and itchy.</p>\r\n\r\n<h3><strong>Benefits of Pond&rsquo;s Moisturizing Cold Cream</strong></h3>\r\n\r\n<ul>\r\n	<li>Occlusives do not let the skin lose its moisture</li>\r\n	<li>Humectants deeply hydrate the skin, keeping it moisturised for a long time</li>\r\n	<li>Smoothens the skin, reducing the dry rough patches</li>\r\n	<li>Nourishes the skin, leaving it healthy and radian</li>\r\n	<li>Non-greasy formula</li>\r\n	<li>Ideal for daily use, especially during the winters</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>After cleansing the face, take a required amount of the Pond&#39;s Moisturising Cold Cream and apply it evenly over the face and neck. Gently rub it into the skin using circular motions. Make sure that the cold cream is completely absorbed into the skin. For best results, use twice, daily.</p>', 1, 1, 2, 90, 0, 0, 320, 0, 0, 0, NULL, '2021-10-19', 0, 1, 0, 0, 'POND\'S_1_2_18_1589705842.jpg', 'http://localhost:8000/uploads/images/POND\'S_1_2_18_1589705842.jpg', 18, 17, NULL, 0),
(23, 'WHISPER ULTRA', 'CLEAN SANITARY PADS - XL WINGS (30 PADS)', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Whisper Ultra Clean Sanitary Pads &ndash; XL Wings, a pack of 30 pads, which offer 5x better protection than the ordinary pads which lasts all day long. Formulated especially for heavy periods, these pads are 20% longer, offering more coverage. Whisper Ultra Clean Sanitary Pads &ndash; XL Wings instantly absorbs the liquid. Specially designed with the Dri-Weave cover that offers soft and dry protection. It helps in alleviating the discomfort that is felt during menses.</p>\r\n\r\n<p><strong>Note: Please change the pad every 4-5 hours as long hours of use of a sanitary pad can lead to Toxic Shock Syndrome, which is a rare and a serious bacterial infection.</strong></p>\r\n\r\n<p>Benefits of Whisper Ultra Clean Sanitary Pads &ndash; XL Wings</p>\r\n\r\n<ul>\r\n	<li>Offers 5x better protection</li>\r\n	<li>20% longer</li>\r\n	<li>Absorbs the liquid in a few seconds</li>\r\n	<li>Dri-Weave cover provides soft and dry protection</li>\r\n	<li>Pads being scented, offer protection against odour</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>After removing the release paper from the back of the pad, place the pad on the underpants&#39; crotch area and press firmly. Take off the release paper from the wings of the pad. Fold the wings around the sides of the underpants&#39; crotch area and press firmly once again. After use, remove the pad using a waste paper, neatly wrapping it in and carefully disposing it off in a waste paper basket. Do not flush the pads into the toilet.</p>', 1, 1, 2, 120, 0, 0, 230, 0, 0, 0, NULL, '2020-09-18', 0, 1, 0, 0, 'WHISPER ULTRA_1_2_19_1589706132.jpg', 'http://localhost:8000/uploads/images/WHISPER ULTRA_1_2_19_1589706132.jpg', 19, 20, NULL, 0),
(24, 'LISTERINE', 'COOL MINT MOUTHWASH 250ML', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Listerine Cool Mint Mouthwash, in the net quantity of 250ml, promises 6x cleaner teeth than brushing and flossing alone. It is specifically designed to reach places that a toothbrush cannot. It helps remove all the food particles, impurities and other debris even from the narrowest of gaps in between the teeth, thus eliminating germs and protecting the teeth from cavities and decay.</p>\r\n\r\n<p>This mouthwash claims 21% greater reduction in gingivitis and 52% better removal of dental plaque than brushing &amp; flossing alone. Its cool mint flavour instantly revitalizes the breath, keeping the mouth feeling fresh all day and preventing bad mouth odour.</p>\r\n\r\n<h3><strong>Benefits of Listerine Cool Mint Mouthwash</strong></h3>\r\n\r\n<ul>\r\n	<li>Effectively removes 99.9% of the germs</li>\r\n	<li>Claims 21% greater reduction in gingivitis than brushing &amp; flossing</li>\r\n	<li>Claims 52% better removal of dental plaque than brushing &amp; flossing</li>\r\n	<li>Revitalizes the breath</li>\r\n	<li>Prevents bad mouth odour</li>\r\n	<li>Ideal for daily use</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>Rinse the mouth with water. Take 20ml of the Listerine Cool Mint Mouthwash and gargle thoroughly for 30 seconds, and expel the mouthwash. Do not swallow.</p>', 1, 1, 2, 100, 0, 0, 300, 0, 0, 0, NULL, '2021-03-28', 0, 1, 0, 0, 'LISTERINE_1_2_20_1589706579.jpg', 'http://localhost:8000/uploads/images/LISTERINE_1_2_20_1589706579.jpg', 20, 21, NULL, 0),
(25, 'SENSODYNE', 'REPAIR & PROTECT TOOTHPASTE 100GM', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Tiny holes in the dentine cause tooth sensitivity. Sensodyne Repair &amp; Protect Toothpaste, in the net quantity of 100gms, formulated using NovaMin, repairs these holes, thus relieving and protecting the teeth from sensitivity. It also cleans and the teeth thoroughly, removing all the food particles, impurities and other debris, thus removing the germs, protecting the teeth from cavities and decay. It helps remove dental plaque as well. It has a fresh taste that helps prevent mad mouth odour and keep the mouth feeling fresh all day.</p>\r\n\r\n<h3><strong>Benefits of Sensodyne Repair &amp; Protect Toothpaste</strong></h3>\r\n\r\n<ul>\r\n	<li>NovaMin relieves tooth sensitivity</li>\r\n	<li>Removes all the food particles, impurities and debris</li>\r\n	<li>Removes germs and protects teeth from cavities and decay</li>\r\n	<li>Removes dental plaque</li>\r\n	<li>Freshens the breath and prevents bad mouth odour for long</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>After rinsing the mouth with water, take a required amount of the Sensodyne Repair &amp; Protect Toothpaste onto a soft bristle toothbrush and brush the teeth vigorously with it, for 3 minutes; at least 2 minutes. Use small upward and downward circular motions while doing so. Rinse off the mouth thoroughly with water afterwards. For best results, use twice, daily.</p>', 1, 1, 2, 120, 0, 0, 490, 0, 0, 0, NULL, '2021-09-30', 0, 1, 0, 0, 'SENSODYNE_1_2_20_1589707182.jpg', 'http://localhost:8000/uploads/images/SENSODYNE_1_2_20_1589707182.jpg', 20, 22, NULL, 0),
(26, 'HEAD & SHOULDERS', 'COOL MENTHOL SHAMPOO 180ML', '<h2><strong>Product Information</strong></h2>\r\n\r\n<p>Head &amp; Shoulders Cool Menthol Shampoo, in the net quantity of 180ml, is enriched with dandruff fighting ingredients and menthol. It leaves the hair completely dandruff-free (visible flakes only), with regular use. This shampoo comes with the extra shot of cooling menthol, which has a cooling effect on the hair when applied that helps soothe and keeps you feeling fresh.</p>\r\n\r\n<p><strong>It is safe to use this shampoo on coloured or permed hair as well.</strong></p>\r\n\r\n<p>Benefits of Head &amp; Shoulders Cool Menthol Shampoo</p>\r\n\r\n<ul>\r\n	<li>Reduces dandruff as it is enriched with highly effective dandruff fighting ingredients</li>\r\n	<li>Menthol acts as a cooling agent, leaving you feeling refreshed</li>\r\n	<li>Nourishes the hair</li>\r\n	<li>Improves the texture of the hair with regular use</li>\r\n</ul>\r\n\r\n<h3><strong>Usage</strong></h3>\r\n\r\n<p>After moistening the hair with water, take a required amount of the Head &amp; Shoulders Cool Menthol Shampoo and apply it all over the hair, gently massaging it in into the roots of the hair and the scalp. Rinse off thoroughly with water, afterwards. For best results, use this shampoo at least once a week, on a regular basis.</p>', 1, 1, 2, 100, 0, 0, 340, 0, 0, 0, NULL, '2021-03-12', 0, 1, 0, 0, 'HEAD & SHOULDERS_1_2_21_1589709155.jpg', 'http://localhost:8000/uploads/images/HEAD & SHOULDERS_1_2_21_1589709155.jpg', 21, 23, NULL, 0),
(27, 'KN-95 Face Mask', 'CLOTH MASK MODEL-1', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>&nbsp;</p>', 1, 1, 8, 120, 0, 12, 300, 0, 3600, 0, NULL, NULL, 0, 1, 0, 0, 'KN-95 Face Mask_1_10_36_1595683343.jpg', 'http://localhost:8000/uploads/images/KN-95 Face Mask_1_10_36_1595683343.jpg', 36, 24, NULL, 0),
(28, 'First Aid Box', 'Factory Survival Medical Safety Emergency First Aid Kit Box', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Portable container of medicines, supplies, and information. It is kept for situations in which quick medical attention is needed for minor injuries.</p>', 1, 1, 8, 50, 0, 1, 500, 0, 500, 0, NULL, NULL, 0, 1, 0, 0, 'First Aid Box_1_8_36_1595685291.jpg', 'http://localhost:8000/uploads/images/First Aid Box_1_8_36_1595685291.jpg', 36, 24, NULL, 0),
(29, 'MOOV', 'MOOV SPRAY 35 GM', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>MOOV can be used for Relieving minor aches and pains of muscles and joints. It eases back pain, strains and sprains.</p>', 1, 1, 8, 100, 0, 0, 200, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'MOOV_1_8_37_1595686118.jpg', 'http://localhost:8000/uploads/images/MOOV_1_8_37_1595686118.jpg', 37, 25, NULL, 0),
(32, 'IODEX', 'IODEX JAR 40 GM', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Iodex Ultra Gel brings to you the power of internationally acclaimed diclofenac. From those persistent back aches to troublesome joint pains like neck aches, this new easy to use, clear gel from Iodex provides quick and easy relief.</p>', 1, 1, 8, 50, 0, 0, 100, 0, 100, 0, NULL, NULL, 0, 1, 0, 0, 'IODEX_1_8_37_1595686627.jpg', 'http://localhost:8000/uploads/images/IODEX_1_8_37_1595686627.jpg', 37, 25, NULL, 0),
(33, 'Strepsils', 'STREPSILS ORANGE', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>It is used to relieve the discomfort of sore throats in orange flavour. Dissolve one lozenge slowly in the mouth. No more than 12 lozenges per 24 hours. Do not exceed the stated dose.</p>', 1, 1, 8, 500, 10, 50, 2, 20, 100, 0, NULL, NULL, 0, 1, 0, 0, 'Strepsils_1_8_38_1595688088.jpg', 'http://localhost:8000/uploads/images/Strepsils_1_8_38_1595688088.jpg', 38, 26, NULL, 0),
(34, 'AMRUTANJAN', 'AMRUTANJAN RELIEF COLD RUB 30 GM', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>A natural remedy to fight against congestion. It is gentle on skin and absorbs faster. A small quantity provides best care for your child&#39;s cough and cold. Let your child choose his personal Wuhoo! Relief from the multiple designs available. So unblock and breathe easy.</p>', 1, 1, 8, 500, 0, 0, 150, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'AMRUTANJAN_1_8_38_1595695219.jpg', 'http://localhost:8000/uploads/images/AMRUTANJAN_1_8_38_1595695219.jpg', 38, 27, NULL, 0),
(35, 'Doqtar Surgical Tape', 'Doqtar Surgical Tape 1 Inch', '<h3><strong>Description</strong>:</h3>\r\n\r\n<p>Doqtar Surgical Tape 1 inch or 2.5cm is gentle to the skin. It adheres to the skin properly and when removed, it leaves minimal adhesive residue. It is an economical, general purpose, breathable surgical tape. It helps in securing dressings and devices to the skin. It is hypoallergenic and is not made with natural rubber latex.</p>', 1, 1, 8, 200, 0, 0, 30, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Doqtar Surgical Tape_1_8_39_1595695721.jpg', 'http://localhost:8000/uploads/images/Doqtar Surgical Tape_1_8_39_1595695721.jpg', 39, 28, NULL, 0),
(36, 'Doqtar', 'Doqtar Elastic Knee Support Size-XL', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Doqtar Elastic Knee Support gives support to your knee muscles and ligaments. It retains heat which increases the blood circulation to the knee and helps promote healing. Doqtar knee support is perfect for provide some relief from mild knee pain, sprains, arthritis, weakness, runner?s knee and knee swelling. It is made of soft fabric for comfort even during prolonged usage. Now available in three sizes: Medium, Large and XL.</p>', 1, 1, 8, 30, 0, 0, 300, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Doqtar_1_8_39_1595696212.jpg', 'http://localhost:8000/uploads/images/Doqtar_1_8_39_1595696212.jpg', 39, 28, NULL, 0),
(37, 'NIVEA', 'NVEA Natural Fairness Anti-Perspirant Deodorant For Women, Roll-On 50ml', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>NIVEA Natural Fairness deodorant is enriched with liquorice to visibly lighten underarms for a fairer look, as well as avocado extracts for smoother underarms you can feel. The effective 48h anti-perspirant protection ensures you stay dry and smelling nice all day.</p>', 1, 1, 8, 20, 0, 0, 350, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'NIVEA_1_8_40_1595696872.jpg', 'http://localhost:8000/uploads/images/NIVEA_1_8_40_1595696872.jpg', 40, 29, NULL, 0),
(38, 'Himalaya', 'Himalaya Foot Care Careem 50GM', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Himalaya Foot Care Cream in the net quantity 50gms is amongst the highly effective, specially formulated, herbal Himalaya products, which targets cracked heels and rough feet and makes them soft and smooth within a week. It is enriched with the goodness of Honey, Turmeric, Fenugreek Seeds and Sal Tree Extracts.</p>', 1, 1, 8, 20, 0, 0, 150, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Himalaya_1_8_40_1595697158.jpg', 'http://localhost:8000/uploads/images/Himalaya_1_8_40_1595697158.jpg', 40, 30, NULL, 0),
(39, 'Eno', 'ENO SACHET LEMON', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>An antacid taken for providing instant relief from acidity, gastric discomfort and heart burn, Eno gets you back on track instantly, as it begins to work in six seconds - faster than other tablet and liquid antacids.</p>', 1, 1, 8, 50, 0, 5, 20, 0, 100, 0, NULL, NULL, 0, 1, 0, 0, 'Eno_1_8_41_1595697338.jpg', 'http://localhost:8000/uploads/images/Eno_1_8_41_1595697338.jpg', 41, 31, NULL, 0),
(40, 'Eno Liquid', 'Eno Mint Flavour 170ml Liquid', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>This refreshing non-sticky, non-chalky&nbsp;<strong>liquid</strong>&nbsp;heartburn relief is made with unique ingredients like Khatika Churna, which help neutralize acid reflux and indigestion 3 times faster than leading&nbsp;<strong>liquid</strong>&nbsp;antacids</p>', 1, 1, 8, 30, 0, 0, 150, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Eno Liquid_1_8_41_1595697537.jpg', 'http://localhost:8000/uploads/images/Eno Liquid_1_8_41_1595697537.jpg', 41, 31, NULL, 0),
(41, 'NEBULIZER', 'MHS Breatheasy Nebulizer', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>MHS BreatheEasy Nebulizer enables you to nebulize the right amount of medication, from the comfort of your home. The product is a high quality product meant for self-treatment ideal for all age groups. It is designed to effectively treat asthma, allergies, COPD, cough, wheezing, bronchitis and other respiratory tract disorders.</p>', 1, 1, 8, 15, 0, 0, 3500, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'NEBULIZER_1_8_42_1595697872.jpg', 'http://localhost:8000/uploads/images/NEBULIZER_1_8_42_1595697872.jpg', 42, 32, NULL, 0),
(42, 'Thermometer', 'ACCUSURE NON CONTACT THERMOMETER', '<h3><strong>Description</strong></h3>\r\n\r\n<p>&nbsp;</p>', 1, 1, 8, 5, 0, 0, 5000, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Thermometer_1_8_42_1595698092.jpg', 'http://localhost:8000/uploads/images/Thermometer_1_8_42_1595698092.jpg', 42, 33, NULL, 0),
(43, '2baconil Gum', '2BACONIL 2MG GUMS', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>These gums are available in 2 strengths 2gms and 4gms &ndash; to help both light/intermittent/moderate smokers and active/heavy smokers.</p>', 1, 1, 8, 250, 5, 25, 5, 25, 125, 0, NULL, NULL, 0, 1, 0, 0, '2baconil Gum_1_8_43_1595698539.jpg', 'http://localhost:8000/uploads/images/2baconil Gum_1_8_43_1595698539.jpg', 43, 34, NULL, 0);
INSERT INTO `stock` (`Id`, `Name`, `Item_Description`, `Item_Detailed_Description`, `Formula`, `Pharm_Id`, `Category_Id`, `unit_Qty`, `qty_per_leaf`, `qty_per_box`, `unit_price`, `leaf_price`, `box_price`, `Profit_Price`, `Barcode`, `DOE`, `expired`, `Available`, `unit_BuyPrice`, `deleted`, `image`, `imageUrl`, `sub_category`, `Brand`, `delivery_charges`, `prescription_required`) VALUES
(44, 'Nicotex Chewing Gum', 'NICOTEX 4MG CHEWING GUM MINT PLUS FLAVOUR TAB', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Nicotine gum is a type of chewing gum that delivers nicotine to the body. It is used as an aid in nicotine replacement therapy (NRT), a process for smoking cessation and quitting smokeless tobacco</p>', 1, 1, 8, 50, 5, 10, 10, 50, 100, 0, NULL, NULL, 0, 1, 0, 0, 'Nicotex Chewing Gum_1_8_43_1595698850.jpg', 'http://localhost:8000/uploads/images/Nicotex Chewing Gum_1_8_43_1595698850.jpg', 43, 35, NULL, 0),
(45, 'Ensure', 'Ensure Diabetic Care Vanilla BIJ 400gm', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Ensure Diabetic Vanilla Care is a diabetes specific nutrition which optimizes glycemic response and minimize blood sugar spikes.</p>', 1, 1, 10, 50, 0, 0, 1000, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Ensure_1_10_30_1595700227.jpg', 'http://localhost:8000/uploads/images/Ensure_1_10_30_1595700227.jpg', 30, 36, NULL, 0),
(46, 'Sugar Free Natura', 'SUGAR FREE NATURA DIET SUGAR POWDER 80GM', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Sugar Free Natura Diet Sugar Powder is an Over-The-Counter (OTC) top quality sugar substitute.</p>', 1, 1, 10, 10, 0, 0, 250, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Sugar Free Natura_1_10_30_1595700622.jpg', 'http://localhost:8000/uploads/images/Sugar Free Natura_1_10_30_1595700622.jpg', 30, 37, NULL, 0),
(47, 'Accu-Chek Strips', 'Accu-Chek Active Strips 50S', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>The Accu-Check Test Strips are the ideal choice for type 1 and type 2 diabetics. Recommended by doctors, it is a component of the Accu-Chek active blood glucose test meter.</p>', 1, 1, 10, 30, 0, 0, 1200, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Accu-Chek Strips_1_10_29_1595701062.jpg', 'http://localhost:8000/uploads/images/Accu-Chek Strips_1_10_29_1595701062.jpg', 29, 38, NULL, 0),
(48, 'Blood Glucose Monitoring System', 'GLUCORITE BLOOD GLUCOSE MONITORING SYSTEM GM-260', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Glucorite GM260 Blood Glucose Monitoring System comes with auto coding and features noble metal electrode strip. This monitoring system is for in-vitro diagnostic use and is used for self testing.</p>', 1, 1, 10, 10, 0, 0, 1750, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Blood Glucose Monitoring System_1_10_29_1595701328.jpg', 'http://localhost:8000/uploads/images/Blood Glucose Monitoring System_1_10_29_1595701328.jpg', 29, 39, NULL, 0),
(49, 'Diabetic Socks', 'Smart Flamingo Diabetic Socks - 2200', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Give relief to your tired and achy feet with these diabetic socks. These socks are perfect for many different foot-care needs and keep your feet comfortable and at ease.</p>', 1, 1, 10, 10, 0, 0, 700, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Diabetic Socks_1_10_31_1595701692.jpg', 'http://localhost:8000/uploads/images/Diabetic Socks_1_10_31_1595701692.jpg', 31, 40, NULL, 0),
(50, 'Diabetic Socks Grey', 'Diabetic Socks Grey SKU: DSC-GRY', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Sockoye diabetic socks are designed using spiral knitting technology that improves blood circulation. The extra wide cuff of these socks is non-binding and non-elastic therefore letting the blood flow with ease. These socks have anti-fungal, anti-bacterial and moisture wicking properties to reduce the risk of foot infection.</p>', 1, 1, 10, 10, 0, 0, 750, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Diabetic Socks Grey_1_10_31_1595702083.jpg', 'http://localhost:8000/uploads/images/Diabetic Socks Grey_1_10_31_1595702083.jpg', 31, 41, NULL, 0),
(51, 'Complan', 'COMPLAN CHOCOLATE REFILL 500GM', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>This product is specifically designed for best benefits to children, it can also be consumed by other age groups. This product is a refill packaging of 500 grams with a shelf life of 12 months. Being a clinically proven formula, it can be consumed 2 times per day.</p>', 1, 1, 11, 30, 0, 0, 320, 0, 0, 0, NULL, NULL, 0, 1, 0, 0, 'Complan_1_9_32_1595849904.jpg', 'http://localhost:8000/uploads/images/Complan_1_9_32_1595849904.jpg', 32, 42, NULL, 0),
(52, 'Complan nutri gro', 'COMPLAN NUTRI GRO BADAMKHEER REFILL 400GM', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>The Complan Nutri Gro Badam Kheer is a complete planned milk drink manufactured with 11 immunity builders and meant for children between 2-6 years of age. Though this age group gains the most benefit of the product, people of any age above 6 can consume this delicious, creamy drink.</p>', 1, 1, 11, 15, 0, 0, 330, 0, 0, 0, NULL, '2021-03-26', 0, 1, 0, 0, 'Complan nutri gro_1_9_32_1595850074.jpg', 'http://localhost:8000/uploads/images/Complan nutri gro_1_9_32_1595850074.jpg', 32, 42, NULL, 0),
(53, 'EATRITE OATS', 'EATRITE OATS REFILL PACK 1KG', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Eatrite Oats is a healthy way to start your day . Made with 100% whole grain oats, it is a good source of dietary fibres and proteins and is loaded with nutrition. Take this completely natural &amp; healthy oats, mixed with milk &amp; topped with fresh fruits &amp; nuts to make a complete and wholesome breakfast.</p>', 1, 1, 11, 15, 0, 0, 220, 0, 0, 0, NULL, '2021-01-27', 0, 1, 0, 0, 'EATRITE OATS_1_9_33_1595850554.jpg', 'http://localhost:8000/uploads/images/EATRITE OATS_1_9_33_1595850554.jpg', 33, 43, NULL, 0),
(54, 'Horlics oats', 'HORLICKS OATS 1000GM', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Oats are one of nature&rsquo;s best and healthy sources of fiber. This 1kg pack of Horlicks Natural Oats are 100% natural oats that makes a perfect and healthy breakfast. It is a wholesome heart-healthy nutrition that is high in complex carbohydrates, high in fiber, high in protein and low in sodium particularly suitable for a low calorie diet.</p>', 1, 1, 11, 50, 0, 0, 250, 0, 0, 0, NULL, '2020-12-02', 0, 1, 0, 0, 'Horlics oats_1_9_33_1595850742.jpg', 'http://localhost:8000/uploads/images/Horlics oats_1_9_33_1595850742.jpg', 33, 44, NULL, 0),
(55, 'Glucon-D', 'GLUCON D REFILL 75GMS', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Glucon D is an energy drink enriched with essential nutrients, vitamins and minerals. . It provides non stop energy, especially of greater use during the summers or hot weathers. During summers, mix this powder in a glass of cold water or normal water and consume for best results. Glucon-D energizes you to fight tiredness and fatigue caused by summer heat. Glucon-D in a way helps in all-round development of kids.</p>', 1, 1, 11, 10, 0, 0, 30, 0, 0, 0, NULL, '2020-09-18', 0, 1, 0, 0, 'Glucon-D_1_9_34_1595851390.jpg', 'http://localhost:8000/uploads/images/Glucon-D_1_9_34_1595851390.jpg', 34, 45, NULL, 0),
(56, 'Nepro hp', 'Nepro Hp Vanilla Powder 400GM', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>The Nepro HP Vanilla Powder is a complete renal nutrition supplement which is designed specifically for people on dialysis. Kidney patients require special support and assistance in their treatments and the Nephro HP vanilla powder 400gm is one such product which provides a complete diet and nutrition to these people.</p>', 1, 1, 11, 20, 0, 0, 950, 0, 0, 0, NULL, '2020-12-16', 0, 1, 0, 0, 'Nepro hp_1_9_34_1595851612.jpg', 'http://localhost:8000/uploads/images/Nepro hp_1_9_34_1595851612.jpg', 34, 46, NULL, 0),
(57, 'Mass gainer', 'MUSCLETECH MASS TECH 7.05 LBS CHOCOLATE', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Muscletech Mass Tech has more protein, better calories &amp; bigger results.</p>', 1, 1, 11, 10, 0, 0, 6500, 0, 0, 0, NULL, '2021-01-20', 0, 1, 0, 0, 'Mass gainer_1_9_35_1595852053.jpg', 'http://localhost:8000/uploads/images/Mass gainer_1_9_35_1595852053.jpg', 35, 47, NULL, 1),
(58, 'Endura Mass', 'ENDURA MASS CHOCOLATE 1KG POWDER', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Endura Mass</strong>&nbsp;is an easy way to gain and maintain weight. It is 100% vegetarian therefore it can be taken without any hesitation. A balanced formulation of high quality soy proteins, carbohydrates, fats, minerals and vitamins, It provides up to 3480 extra calories per day other than the calories gained by regular diet.</p>', 1, 1, 11, 10, 0, 0, 1200, 0, 0, 0, NULL, '2020-12-23', 0, 1, 0, 0, 'Endura Mass_1_9_35_1595852239.jpg', 'http://localhost:8000/uploads/images/Endura Mass_1_9_35_1595852239.jpg', 35, 48, NULL, 0),
(59, 'Labrada Mass gainer', 'LABRADA 100% WHEY PROTEIN 4.13 LBS CHOCOLATE', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Labrada 100% Whey Protein 4.13 lb is perfect for athletes, fitness enthusiasts, bodybuilders, and dieters who want to supplement their diet with the purest, highest quality protein.Labrada 100% Whey Protein is manufactured using micro filtered whey protein concentrate, an excellent source of all the essential amino acids, including branched-chain amino acids and glutamine, which provide support for muscle tissue, and promote recovery from exercise.Labrada 100% Whey Protein dissolves easily with water, juice, or milk.</p>', 1, 1, 9, 8, 0, 0, 6200, 0, 0, 0, NULL, '2021-01-18', 0, 1, 0, 0, 'Labrada Mass gainer_1_9_45_1595855459.jpg', 'http://localhost:8000/uploads/images/Labrada Mass gainer_1_9_45_1595855459.jpg', 45, 49, NULL, 0),
(60, 'Nutrimax whey protein', 'NUTRIMAXX 100% WHEY PROTEIN 1 KG CHOCOLATE', '<p><strong>Description:</strong></p>\r\n\r\n<p>Whey protein is the translucent liquid part of milk which remains after cheese manufacturing process. Whey protein contains high branched and essential chain amino acids. In addition, whey protein is also rich in minerals and vitamins.Whey protein get digested very quickly. Hence it is extensively used in sports, athletics, body building etc.</p>', 1, 1, 9, 20, 0, 0, 4000, 0, 0, 0, NULL, '2020-12-16', 0, 1, 0, 0, 'Nutrimax whey protein_1_9_45_1595855746.jpg', 'http://localhost:8000/uploads/images/Nutrimax whey protein_1_9_45_1595855746.jpg', 45, 50, NULL, 0),
(61, 'Autrin Capsule', 'Autrin capsule (Ferrous fumarate (Iron), Folic acid, Vitamin B12)', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Autrin capsule is a combination of Ferrous fumarate (Iron), Folic acid, Vitamin B12. Folic acid is important to numerous bodily functions starting from nucleotide biosynthesis to the remethylation of homocysteine. It is especially essential during periods of rapid division and growth of the cell. Folic acid is required by both children and adults to synthesize new red blood cells and prevent anemia. Iron transports oxygen to all parts of the body and maintains healthy red blood cells, thus makes an individual feel energetic and prevent anemia. Vitamin B12 maintains healthy nerve cells and promotes maturation and initiation of Red Blood Cells (RBC).</p>', 1, 1, 9, 50, 5, 10, 5, 25, 50, 0, NULL, '2021-01-23', 0, 1, 0, 0, 'Autrin Capsule_1_9_46_1595856249.jpg', 'http://localhost:8000/uploads/images/Autrin Capsule_1_9_46_1595856249.jpg', 46, 51, NULL, 0),
(62, 'Himalaya Capsule', 'HIMALAYA ARJUNA CAP 60S', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Himalaya Arjuna Tablet is one among the uniquely designed herbal Himalaya Products, which helps in maintaining normal blood pressure and overall normal cardiac functioning. Each tablet in the pack contains Arjuna (Terminalia arjuna) bark extract &ndash; 250 mg</p>', 1, 1, 9, 50, 0, 10, 2, 0, 20, 0, NULL, '2021-04-22', 0, 1, 0, 0, 'Himalaya Capsule_1_9_46_1595856394.jpg', 'http://localhost:8000/uploads/images/Himalaya Capsule_1_9_46_1595856394.jpg', 46, 52, NULL, 0),
(63, 'Inlife seed oil capsules', 'INLIFE BLACK SEED OIL CAPSULES 500MG 60S', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>The Inlife Black Seed Oil Capsules are liquid-filled capsules with multiple health benefits. Made of anti-inflammatory, anti-fungal, and anti-bacterial properties, they are derived from the seeds of the plant Nigella Sativa which are commonly known as black cumin.</p>', 1, 1, 9, 100, 0, 10, 10, 0, 100, 0, NULL, '2021-03-30', 0, 1, 0, 0, 'Inlife seed oil capsules_1_9_47_1595858057.jpg', 'http://localhost:8000/uploads/images/Inlife seed oil capsules_1_9_47_1595858057.jpg', 47, 53, NULL, 0),
(64, 'Himalaya Karela Capsules', 'HIMALAYA KARELA CAPSULES 60S', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Karela (bitter guard in English) is a very important herb in Ayurveda and has multiple nutritional uses. It plays a crucial role in regulating blood sugar levels in the body. It possesses antioxidant properties which help in reducing the risk of diabetic complications by scavenging free radical.&nbsp;</p>', 1, 1, 9, 100, 0, 10, 10, 0, 100, 0, NULL, '2021-03-24', 0, 1, 0, 0, 'Himalaya Karela Capsules_1_9_47_1595858242.jpg', 'http://localhost:8000/uploads/images/Himalaya Karela Capsules_1_9_47_1595858242.jpg', 47, 54, NULL, 0),
(65, 'LAYCEF CV TAB', 'Laycef Cv Tablets', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Laycef</strong>-<strong>CV Tablet</strong>&nbsp;is a combination medicine. It is prescribed to treat various types of bacterial infections. It fights against the microorganisms to prevent their growth and further spread of the infection.</p>', 2, 1, 48, 200, 6, 30, 5, 30, 150, 0, NULL, '2020-12-03', 0, 1, 0, 0, 'LAYCEF CV TAB_1_48_61_1596104829.jpg', 'http://localhost:8000/uploads/images/LAYCEF CV TAB_1_48_61_1596104829.jpg', 61, 55, NULL, 1),
(66, 'LAYCEF CV TAB', 'Laycef Cv Tablets', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Laycef</strong>-<strong>CV Tablet</strong>&nbsp;is a combination medicine. It is prescribed to treat various types of bacterial infections. It fights against the microorganisms to prevent their growth and further spread of the infection.</p>', 2, 5, 48, 250, 6, 30, 5, 30, 150, 0, NULL, '2020-12-18', 0, 1, 0, 0, 'LAYCEF CV TAB_5_48_61_1596104875.jpg', 'http://localhost:8000/uploads/images/LAYCEF CV TAB_5_48_61_1596104875.jpg', 61, 55, NULL, 1),
(67, 'LAYCEF CV TAB', 'Laycef Cv Tablets', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Laycef</strong>-<strong>CV Tablet</strong>&nbsp;is a combination medicine. It is prescribed to treat various types of bacterial infections. It fights against the microorganisms to prevent their growth and further spread of the infection.</p>', 2, 8, 48, 300, 6, 30, 5, 30, 150, 0, NULL, '2020-12-08', 0, 1, 0, 0, 'LAYCEF CV TAB_8_48_61_1596104900.jpg', 'http://localhost:8000/uploads/images/LAYCEF CV TAB_8_48_61_1596104900.jpg', 61, 55, NULL, 1),
(68, 'Cefoprox CV', 'Cefoprox CV 325MG TAB', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Cefoprox&nbsp;CV 325MG TAB</strong>&nbsp;is a combination of two drugs: Cefpodoxime (cephalosporin antibiotic) and Clavulanic acid (beta-lactam antibiotic).&nbsp;<strong>CEFOPROX CV 325MG TAB</strong>&nbsp;is used to treat bacterial infections.</p>', 3, 1, 48, 200, 5, 10, 10, 50, 100, 0, NULL, '2020-12-24', 0, 1, 0, 0, 'Cefoprox CV_1_48_61_1596107543.jpg', 'http://localhost:8000/uploads/images/Cefoprox CV_1_48_61_1596107543.jpg', 61, 56, NULL, 1),
(69, 'Cefoprox CV', 'Cefoprox CV 325MG TAB', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Cefoprox&nbsp;CV 325MG TAB</strong>&nbsp;is a combination of two drugs: Cefpodoxime (cephalosporin antibiotic) and Clavulanic acid (beta-lactam antibiotic).&nbsp;<strong>CEFOPROX CV 325MG TAB</strong>&nbsp;is used to treat bacterial infections.</p>', 3, 4, 48, 150, 5, 10, 10, 50, 100, 0, NULL, '2021-05-07', 0, 1, 0, 0, 'Cefoprox CV_4_48_61_1596107568.jpg', 'http://localhost:8000/uploads/images/Cefoprox CV_4_48_61_1596107568.jpg', 61, 56, NULL, 1),
(70, 'Cefoprox CV', 'Cefoprox CV 325MG TAB', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Cefoprox&nbsp;CV 325MG TAB</strong>&nbsp;is a combination of two drugs: Cefpodoxime (cephalosporin antibiotic) and Clavulanic acid (beta-lactam antibiotic).&nbsp;<strong>CEFOPROX CV 325MG TAB</strong>&nbsp;is used to treat bacterial infections.</p>', 3, 7, 48, 150, 5, 10, 10, 50, 100, 0, NULL, '2021-05-05', 0, 1, 0, 0, 'Cefoprox CV_7_48_61_1596107582.jpg', 'http://localhost:8000/uploads/images/Cefoprox CV_7_48_61_1596107582.jpg', 61, 56, NULL, 1),
(71, 'Panadol', 'Panadol 500mg tablet', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Panadol</strong>&nbsp;contains&nbsp;<strong>paracetamol</strong>; recognised by the medical profession as effective medication for you and your family.&nbsp;<strong>Panadol</strong>&nbsp;is indicated for: Headache, Colds &amp; Influenza, Backache, Period Pain, Pain of Osteoarthritis, Muscle Pain, Toothache, Rheumatic Pain.</p>', 4, 1, 48, 500, 10, 50, 2, 20, 100, 0, NULL, '2020-10-13', 0, 1, 0, 0, 'Panadol_1_48_61_1596108572.jpg', 'http://localhost:8000/uploads/images/Panadol_1_48_61_1596108572.jpg', 61, 57, NULL, 0),
(72, 'Panadol', 'Panadol 500mg tablet', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Panadol</strong>&nbsp;contains&nbsp;<strong>paracetamol</strong>; recognised by the medical profession as effective medication for you and your family.&nbsp;<strong>Panadol</strong>&nbsp;is indicated for: Headache, Colds &amp; Influenza, Backache, Period Pain, Pain of Osteoarthritis, Muscle Pain, Toothache, Rheumatic Pain.</p>', 4, 2, 48, 400, 10, 50, 2, 20, 100, 0, NULL, '2020-10-31', 0, 1, 0, 0, 'Panadol_2_48_61_1596108592.jpg', 'http://localhost:8000/uploads/images/Panadol_2_48_61_1596108592.jpg', 61, 57, NULL, 0),
(73, 'Panadol', 'Panadol 500mg tablet', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Panadol</strong>&nbsp;contains&nbsp;<strong>paracetamol</strong>; recognised by the medical profession as effective medication for you and your family.&nbsp;<strong>Panadol</strong>&nbsp;is indicated for: Headache, Colds &amp; Influenza, Backache, Period Pain, Pain of Osteoarthritis, Muscle Pain, Toothache, Rheumatic Pain.</p>', 4, 3, 48, 600, 10, 50, 2, 20, 100, 0, NULL, '2020-10-28', 0, 1, 0, 0, 'Panadol_3_48_61_1596108611.jpg', 'http://localhost:8000/uploads/images/Panadol_3_48_61_1596108611.jpg', 61, 57, NULL, 0),
(74, 'Panadol', 'Panadol 500mg tablet', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Panadol</strong>&nbsp;contains&nbsp;<strong>paracetamol</strong>; recognised by the medical profession as effective medication for you and your family.&nbsp;<strong>Panadol</strong>&nbsp;is indicated for: Headache, Colds &amp; Influenza, Backache, Period Pain, Pain of Osteoarthritis, Muscle Pain, Toothache, Rheumatic Pain.</p>', 4, 6, 48, 550, 10, 50, 2, 20, 100, 0, NULL, '2020-10-16', 0, 1, 0, 0, 'Panadol_6_48_61_1596108641.jpg', 'http://localhost:8000/uploads/images/Panadol_6_48_61_1596108641.jpg', 61, 57, NULL, 0),
(75, 'Panadol', 'Panadol 500mg tablet', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Panadol</strong>&nbsp;contains&nbsp;<strong>paracetamol</strong>; recognised by the medical profession as effective medication for you and your family.&nbsp;<strong>Panadol</strong>&nbsp;is indicated for: Headache, Colds &amp; Influenza, Backache, Period Pain, Pain of Osteoarthritis, Muscle Pain, Toothache, Rheumatic Pain.</p>', 4, 7, 48, 520, 10, 50, 2, 20, 100, 0, NULL, '2020-10-28', 0, 1, 0, 0, 'Panadol_7_48_61_1596108663.jpg', 'http://localhost:8000/uploads/images/Panadol_7_48_61_1596108663.jpg', 61, 57, NULL, 0),
(76, 'Panadol', 'Panadol 500mg tablet', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Panadol</strong>&nbsp;contains&nbsp;<strong>paracetamol</strong>; recognised by the medical profession as effective medication for you and your family.&nbsp;<strong>Panadol</strong>&nbsp;is indicated for: Headache, Colds &amp; Influenza, Backache, Period Pain, Pain of Osteoarthritis, Muscle Pain, Toothache, Rheumatic Pain.</p>', 4, 4, 48, 520, 10, 50, 2, 20, 100, 0, NULL, '2020-10-28', 0, 1, 0, 0, 'Panadol_4_48_61_1596108694.jpg', 'http://localhost:8000/uploads/images/Panadol_4_48_61_1596108694.jpg', 61, 57, NULL, 0),
(77, 'Brufeen', 'Brufen 400 mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>A white, pillow-shaped, film-coated tablet.&nbsp;<strong>Brufen</strong>&nbsp;is indicated for its analgesic and anti-inflammatory effects in the treatment of rheumatoid arthritis (including juvenile rheumatoid arthritis or Still&#39;s disease), ankylosing spondylitis, osteoarthritis and other non-rheumatoid (seronegative) arthropathies.</p>', 5, 1, 48, 500, 15, 45, 3, 45, 135, 0, NULL, '2020-08-20', 0, 1, 0, 0, 'Brufeen_1_48_61_1596110033.jpg', 'http://localhost:8000/uploads/images/Brufeen_1_48_61_1596110033.jpg', 61, 58, NULL, 0),
(78, 'Brufeen', 'Brufen 400 mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>A white, pillow-shaped, film-coated tablet.&nbsp;<strong>Brufen</strong>&nbsp;is indicated for its analgesic and anti-inflammatory effects in the treatment of rheumatoid arthritis (including juvenile rheumatoid arthritis or Still&#39;s disease), ankylosing spondylitis, osteoarthritis and other non-rheumatoid (seronegative) arthropathies.</p>', 5, 8, 48, 400, 15, 45, 3, 45, 135, 0, NULL, '2020-08-29', 0, 1, 0, 0, 'Brufeen_8_48_61_1596110053.jpg', 'http://localhost:8000/uploads/images/Brufeen_8_48_61_1596110053.jpg', 61, 58, NULL, 0),
(79, 'Brufeen', 'Brufen 400 mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>A white, pillow-shaped, film-coated tablet.&nbsp;<strong>Brufen</strong>&nbsp;is indicated for its analgesic and anti-inflammatory effects in the treatment of rheumatoid arthritis (including juvenile rheumatoid arthritis or Still&#39;s disease), ankylosing spondylitis, osteoarthritis and other non-rheumatoid (seronegative) arthropathies.</p>', 5, 5, 48, 400, 15, 45, 3, 45, 135, 0, NULL, '2020-10-21', 0, 1, 0, 0, 'Brufeen_5_48_61_1596110067.jpg', 'http://localhost:8000/uploads/images/Brufeen_5_48_61_1596110067.jpg', 61, 58, NULL, 0),
(80, 'Brufeen', 'Brufen 400 mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>A white, pillow-shaped, film-coated tablet.&nbsp;<strong>Brufen</strong>&nbsp;is indicated for its analgesic and anti-inflammatory effects in the treatment of rheumatoid arthritis (including juvenile rheumatoid arthritis or Still&#39;s disease), ankylosing spondylitis, osteoarthritis and other non-rheumatoid (seronegative) arthropathies.</p>', 5, 3, 48, 400, 15, 45, 3, 45, 135, 0, NULL, '2021-04-19', 0, 1, 0, 0, 'Brufeen_3_48_61_1596110081.jpg', 'http://localhost:8000/uploads/images/Brufeen_3_48_61_1596110081.jpg', 61, 58, NULL, 0),
(81, 'Disprin', 'Disprin Tab 300mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Relieving mild to moderate pain including headache, migraine, nerve pain (neuralgia), toothache, sore throat, period pain.Relieving aches, pains and fever associated with colds and flu.</p>', 6, 1, 48, 800, 10, 100, 5, 50, 500, 0, NULL, '2020-12-16', 0, 1, 0, 0, 'Disprin_1_48_61_1596124882.png', 'http://localhost:8000/uploads/images/Disprin_1_48_61_1596124882.png', 61, 59, NULL, 0),
(82, 'Disprin', 'Disprin Tab 300mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Relieving mild to moderate pain including headache, migraine, nerve pain (neuralgia), toothache, sore throat, period pain.Relieving aches, pains and fever associated with colds and flu.</p>', 6, 3, 48, 900, 10, 100, 5, 50, 500, 0, NULL, '2020-12-18', 0, 1, 0, 0, 'Disprin_3_48_61_1596124911.png', 'http://localhost:8000/uploads/images/Disprin_3_48_61_1596124911.png', 61, 59, NULL, 0),
(83, 'Disprin', 'Disprin Tab 300mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Relieving mild to moderate pain including headache, migraine, nerve pain (neuralgia), toothache, sore throat, period pain.Relieving aches, pains and fever associated with colds and flu.</p>', 6, 5, 48, 700, 10, 100, 5, 50, 500, 0, NULL, '2020-12-18', 0, 1, 0, 0, 'Disprin_5_48_61_1596124923.png', 'http://localhost:8000/uploads/images/Disprin_5_48_61_1596124923.png', 61, 59, NULL, 0),
(84, 'Disprin', 'Disprin Tab 300mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Relieving mild to moderate pain including headache, migraine, nerve pain (neuralgia), toothache, sore throat, period pain.Relieving aches, pains and fever associated with colds and flu.</p>', 6, 6, 48, 950, 10, 100, 5, 50, 500, 0, NULL, '2021-02-04', 0, 1, 0, 0, 'Disprin_6_48_61_1596124946.png', 'http://localhost:8000/uploads/images/Disprin_6_48_61_1596124946.png', 61, 59, NULL, 0),
(85, 'Disprin', 'Disprin Tab 300mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Relieving mild to moderate pain including headache, migraine, nerve pain (neuralgia), toothache, sore throat, period pain.Relieving aches, pains and fever associated with colds and flu.</p>', 6, 8, 48, 500, 10, 100, 5, 50, 500, 0, NULL, '2021-03-02', 0, 1, 0, 0, 'Disprin_8_48_61_1596124965.png', 'http://localhost:8000/uploads/images/Disprin_8_48_61_1596124965.png', 61, 59, NULL, 0),
(86, 'Zopent', 'Zopent Tab 40mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>It is used to treat erosive esophagitis (damage to the esophagus from stomach acid caused by gastroesophageal reflux disease, or GERD) in adults and children who are at least 5 years old.</p>', 7, 1, 48, 300, 10, 20, 20, 200, 400, 0, NULL, '2020-09-04', 0, 1, 0, 0, 'Zopent_1_48_61_1596125459.jpg', 'http://localhost:8000/uploads/images/Zopent_1_48_61_1596125459.jpg', 61, 60, NULL, 0),
(87, 'Zopent', 'Zopent Tab 40mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>It is used to treat erosive esophagitis (damage to the esophagus from stomach acid caused by gastroesophageal reflux disease, or GERD) in adults and children who are at least 5 years old.</p>', 7, 8, 48, 400, 10, 20, 20, 200, 400, 0, NULL, '2020-10-03', 0, 1, 0, 0, 'Zopent_8_48_61_1596125483.jpg', 'http://localhost:8000/uploads/images/Zopent_8_48_61_1596125483.jpg', 61, 60, NULL, 0),
(88, 'Zopent', 'Zopent Tab 40mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>It is used to treat erosive esophagitis (damage to the esophagus from stomach acid caused by gastroesophageal reflux disease, or GERD) in adults and children who are at least 5 years old.</p>', 7, 6, 48, 450, 10, 20, 20, 200, 400, 0, NULL, '2020-10-21', 0, 1, 0, 0, 'Zopent_6_48_61_1596125502.jpg', 'http://localhost:8000/uploads/images/Zopent_6_48_61_1596125502.jpg', 61, 60, NULL, 0),
(89, 'Zopent', 'Zopent Tab 40mg', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>It is used to treat erosive esophagitis (damage to the esophagus from stomach acid caused by gastroesophageal reflux disease, or GERD) in adults and children who are at least 5 years old.</p>', 7, 3, 48, 200, 10, 20, 20, 200, 400, 0, NULL, '2020-10-23', 0, 1, 0, 0, 'Zopent_3_48_61_1596125532.jpg', 'http://localhost:8000/uploads/images/Zopent_3_48_61_1596125532.jpg', 61, 60, NULL, 0),
(90, 'Ponstan Fort', 'Ponstan Fort 500mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<h3>Ponstan 500 MG Tablet is a Non-steroidal anti-inflammatory (NSAID) medicine used to relieve pain associated with acute musculoskeletal disorders such as sprains, strains, injuries, osteoarthritis, rheumatoid arthritis, etc. It also relieves dental pain, post-operative, and post-partum pain. It helps to relieve pain and cramps during menstrual periods.</h3>', 8, 1, 48, 300, 10, 20, 12, 120, 240, 0, NULL, '2020-10-15', 0, 1, 0, 0, 'Ponstan Fort_1_48_61_1596125938.jpg', 'http://localhost:8000/uploads/images/Ponstan Fort_1_48_61_1596125938.jpg', 61, 61, NULL, 0),
(91, 'Ponstan Fort', 'Ponstan Fort 500mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<h3>Ponstan 500 MG Tablet is a Non-steroidal anti-inflammatory (NSAID) medicine used to relieve pain associated with acute musculoskeletal disorders such as sprains, strains, injuries, osteoarthritis, rheumatoid arthritis, etc. It also relieves dental pain, post-operative, and post-partum pain. It helps to relieve pain and cramps during menstrual periods.</h3>', 8, 2, 48, 200, 10, 20, 12, 120, 240, 0, NULL, '2020-10-24', 0, 1, 0, 0, 'Ponstan Fort_2_48_61_1596125954.jpg', 'http://localhost:8000/uploads/images/Ponstan Fort_2_48_61_1596125954.jpg', 61, 61, NULL, 0),
(92, 'Ponstan Fort', 'Ponstan Fort 500mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<h3>Ponstan 500 MG Tablet is a Non-steroidal anti-inflammatory (NSAID) medicine used to relieve pain associated with acute musculoskeletal disorders such as sprains, strains, injuries, osteoarthritis, rheumatoid arthritis, etc. It also relieves dental pain, post-operative, and post-partum pain. It helps to relieve pain and cramps during menstrual periods.</h3>', 8, 5, 48, 200, 10, 20, 12, 120, 240, 0, NULL, '2020-10-27', 0, 1, 0, 0, 'Ponstan Fort_5_48_61_1596125966.jpg', 'http://localhost:8000/uploads/images/Ponstan Fort_5_48_61_1596125966.jpg', 61, 61, NULL, 0),
(93, 'Ponstan Fort', 'Ponstan Fort 500mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<h3>Ponstan 500 MG Tablet is a Non-steroidal anti-inflammatory (NSAID) medicine used to relieve pain associated with acute musculoskeletal disorders such as sprains, strains, injuries, osteoarthritis, rheumatoid arthritis, etc. It also relieves dental pain, post-operative, and post-partum pain. It helps to relieve pain and cramps during menstrual periods.</h3>', 8, 7, 48, 100, 10, 20, 12, 120, 240, 0, NULL, '2020-10-27', 0, 1, 0, 0, 'Ponstan Fort_7_48_61_1596125983.jpg', 'http://localhost:8000/uploads/images/Ponstan Fort_7_48_61_1596125983.jpg', 61, 61, NULL, 0),
(94, 'Naze', 'Naze 2mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Naze</strong>&nbsp;0.5mg&nbsp;<strong>Tablet</strong>&nbsp;is a prescription&nbsp;<strong>medicine</strong>&nbsp;used to treat epilepsy (seizures), panic and anxiety disorder. It helps to decrease the abnormal and excessive activity of the nerve cells and calms the brain.</p>', 9, 1, 48, 200, 10, 20, 5, 50, 100, 0, NULL, '2020-10-18', 0, 1, 0, 0, 'Naze_1_48_61_1596126545.jpg', 'http://localhost:8000/uploads/images/Naze_1_48_61_1596126545.jpg', 61, 62, NULL, 1),
(95, 'Naze', 'Naze 2mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Naze</strong>&nbsp;0.5mg&nbsp;<strong>Tablet</strong>&nbsp;is a prescription&nbsp;<strong>medicine</strong>&nbsp;used to treat epilepsy (seizures), panic and anxiety disorder. It helps to decrease the abnormal and excessive activity of the nerve cells and calms the brain.</p>', 9, 2, 48, 300, 10, 20, 5, 50, 100, 0, NULL, '2020-10-30', 0, 1, 0, 0, 'Naze_2_48_61_1596126558.jpg', 'http://localhost:8000/uploads/images/Naze_2_48_61_1596126558.jpg', 61, 62, NULL, 1),
(96, 'Naze', 'Naze 2mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Naze</strong>&nbsp;0.5mg&nbsp;<strong>Tablet</strong>&nbsp;is a prescription&nbsp;<strong>medicine</strong>&nbsp;used to treat epilepsy (seizures), panic and anxiety disorder. It helps to decrease the abnormal and excessive activity of the nerve cells and calms the brain.</p>', 9, 4, 48, 100, 10, 20, 5, 50, 100, 0, NULL, '2020-10-21', 0, 1, 0, 0, 'Naze_4_48_61_1596126575.jpg', 'http://localhost:8000/uploads/images/Naze_4_48_61_1596126575.jpg', 61, 62, NULL, 1),
(97, 'Naze', 'Naze 2mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Naze</strong>&nbsp;0.5mg&nbsp;<strong>Tablet</strong>&nbsp;is a prescription&nbsp;<strong>medicine</strong>&nbsp;used to treat epilepsy (seizures), panic and anxiety disorder. It helps to decrease the abnormal and excessive activity of the nerve cells and calms the brain.</p>', 9, 6, 48, 150, 10, 20, 5, 50, 100, 0, NULL, '2020-12-02', 0, 1, 0, 0, 'Naze_6_48_61_1596126621.jpg', 'http://localhost:8000/uploads/images/Naze_6_48_61_1596126621.jpg', 61, 62, NULL, 1),
(98, 'Xanax', 'Xanan 1mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Xanan&nbsp;</strong>is used to treat anxiety and panic disorders. It belongs to a class of medications called benzodiazepines which act on the brain and nerves (central nervous system) to produce a calming effect. It works by enhancing the effects of a certain natural chemical in the body (GABA).</p>', 10, 2, 48, 150, 10, 30, 10, 100, 300, 0, NULL, '2020-09-23', 0, 1, 0, 0, 'Xanax_2_48_61_1596126965.jpg', 'http://localhost:8000/uploads/images/Xanax_2_48_61_1596126965.jpg', 61, 61, NULL, 1),
(99, 'Xanax', 'Xanan 1mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Xanan&nbsp;</strong>is used to treat anxiety and panic disorders. It belongs to a class of medications called benzodiazepines which act on the brain and nerves (central nervous system) to produce a calming effect. It works by enhancing the effects of a certain natural chemical in the body (GABA).</p>', 10, 3, 48, 150, 10, 30, 10, 100, 300, 0, NULL, '2020-09-23', 0, 1, 0, 0, 'Xanax_3_48_61_1596126972.jpg', 'http://localhost:8000/uploads/images/Xanax_3_48_61_1596126972.jpg', 61, 61, NULL, 1),
(100, 'Xanax', 'Xanan 1mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Xanan&nbsp;</strong>is used to treat anxiety and panic disorders. It belongs to a class of medications called benzodiazepines which act on the brain and nerves (central nervous system) to produce a calming effect. It works by enhancing the effects of a certain natural chemical in the body (GABA).</p>', 10, 4, 48, 180, 10, 30, 10, 100, 300, 0, NULL, '2020-09-26', 0, 1, 0, 0, 'Xanax_4_48_61_1596126988.jpg', 'http://localhost:8000/uploads/images/Xanax_4_48_61_1596126988.jpg', 61, 61, NULL, 1),
(101, 'Xanax', 'Xanan 1mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Xanan&nbsp;</strong>is used to treat anxiety and panic disorders. It belongs to a class of medications called benzodiazepines which act on the brain and nerves (central nervous system) to produce a calming effect. It works by enhancing the effects of a certain natural chemical in the body (GABA).</p>', 10, 7, 48, 210, 10, 30, 10, 100, 300, 0, NULL, '2020-09-29', 0, 1, 0, 0, 'Xanax_7_48_61_1596127006.jpg', 'http://localhost:8000/uploads/images/Xanax_7_48_61_1596127006.jpg', 61, 61, NULL, 1),
(102, 'Transamin', 'Transamin 250mg Cap', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>This&nbsp;<strong>medication</strong>&nbsp;is used to treat heavy bleeding during your menstrual period.&nbsp;<strong>Tranexamic acid</strong>&nbsp;works by slowing the breakdown of blood clots, which helps to prevent prolonged bleeding. It belongs to a class of&nbsp;<strong>drugs</strong>&nbsp;known as antifibrinolytics</p>', 11, 2, 48, 250, 10, 100, 20, 200, 20000, 0, NULL, '2020-11-22', 0, 1, 0, 0, 'Transamin_2_48_61_1596139156.jpg', 'http://localhost:8000/uploads/images/Transamin_2_48_61_1596139156.jpg', 61, 63, NULL, 1),
(103, 'Transamin', 'Transamin 250mg Cap', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>This&nbsp;<strong>medication</strong>&nbsp;is used to treat heavy bleeding during your menstrual period.&nbsp;<strong>Tranexamic acid</strong>&nbsp;works by slowing the breakdown of blood clots, which helps to prevent prolonged bleeding. It belongs to a class of&nbsp;<strong>drugs</strong>&nbsp;known as antifibrinolytics</p>', 11, 5, 48, 300, 10, 100, 20, 200, 20000, 0, NULL, '2020-11-19', 0, 1, 0, 0, 'Transamin_5_48_61_1596139173.jpg', 'http://localhost:8000/uploads/images/Transamin_5_48_61_1596139173.jpg', 61, 63, NULL, 1),
(104, 'Transamin', 'Transamin 250mg Cap', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>This&nbsp;<strong>medication</strong>&nbsp;is used to treat heavy bleeding during your menstrual period.&nbsp;<strong>Tranexamic acid</strong>&nbsp;works by slowing the breakdown of blood clots, which helps to prevent prolonged bleeding. It belongs to a class of&nbsp;<strong>drugs</strong>&nbsp;known as antifibrinolytics</p>', 11, 4, 48, 150, 10, 100, 20, 200, 20000, 0, NULL, '2020-12-10', 0, 1, 0, 0, 'Transamin_4_48_61_1596139200.jpg', 'http://localhost:8000/uploads/images/Transamin_4_48_61_1596139200.jpg', 61, 63, NULL, 1),
(105, 'Transamin', 'Transamin 250mg Cap', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>This&nbsp;<strong>medication</strong>&nbsp;is used to treat heavy bleeding during your menstrual period.&nbsp;<strong>Tranexamic acid</strong>&nbsp;works by slowing the breakdown of blood clots, which helps to prevent prolonged bleeding. It belongs to a class of&nbsp;<strong>drugs</strong>&nbsp;known as antifibrinolytics</p>', 11, 7, 48, 350, 10, 100, 20, 200, 20000, 0, NULL, '2021-01-09', 0, 1, 0, 0, 'Transamin_7_48_61_1596139249.jpg', 'http://localhost:8000/uploads/images/Transamin_7_48_61_1596139249.jpg', 61, 63, NULL, 1),
(106, 'Transamin', 'Transamin 250mg Cap', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>This&nbsp;<strong>medication</strong>&nbsp;is used to treat heavy bleeding during your menstrual period.&nbsp;<strong>Tranexamic acid</strong>&nbsp;works by slowing the breakdown of blood clots, which helps to prevent prolonged bleeding. It belongs to a class of&nbsp;<strong>drugs</strong>&nbsp;known as antifibrinolytics</p>', 11, 8, 48, 500, 10, 100, 20, 200, 20000, 0, NULL, '2021-01-06', 0, 1, 0, 0, 'Transamin_8_48_61_1596139538.jpg', 'http://localhost:8000/uploads/images/Transamin_8_48_61_1596139538.jpg', 61, 63, NULL, 1),
(107, 'Transamin', 'Transamin 250mg Cap', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>This&nbsp;<strong>medication</strong>&nbsp;is used to treat heavy bleeding during your menstrual period.&nbsp;<strong>Tranexamic acid</strong>&nbsp;works by slowing the breakdown of blood clots, which helps to prevent prolonged bleeding. It belongs to a class of&nbsp;<strong>drugs</strong>&nbsp;known as antifibrinolytics</p>', 11, 6, 48, 500, 10, 100, 20, 200, 20000, 0, NULL, '2021-01-03', 0, 1, 0, 0, 'Transamin_6_48_61_1596139554.jpg', 'http://localhost:8000/uploads/images/Transamin_6_48_61_1596139554.jpg', 61, 63, NULL, 1),
(108, 'Danzen', 'Danzen DS 10mg Tablet', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Danzen</strong>&nbsp;Forte 10mg Tablet is&nbsp;<strong>used in</strong>&nbsp;the treatment of pain and inflammation. It helps relieve pain and swelling in postoperative wounds and inflammatory diseases.</p>', 12, 8, 48, 100, 10, 20, 8, 80, 160, 0, NULL, '2020-09-17', 0, 1, 0, 0, 'Danzen_8_48_61_1596140066.jpg', 'http://localhost:8000/uploads/images/Danzen_8_48_61_1596140066.jpg', 61, 64, NULL, 0),
(109, 'Danzen', 'Danzen DS 10mg Tablet', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Danzen</strong>&nbsp;Forte 10mg Tablet is&nbsp;<strong>used in</strong>&nbsp;the treatment of pain and inflammation. It helps relieve pain and swelling in postoperative wounds and inflammatory diseases.</p>', 12, 2, 48, 200, 10, 20, 8, 80, 160, 0, NULL, '2020-10-10', 0, 1, 0, 0, 'Danzen_2_48_61_1596140084.jpg', 'http://localhost:8000/uploads/images/Danzen_2_48_61_1596140084.jpg', 61, 64, NULL, 0),
(110, 'Danzen', 'Danzen DS 10mg Tablet', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Danzen</strong>&nbsp;Forte 10mg Tablet is&nbsp;<strong>used in</strong>&nbsp;the treatment of pain and inflammation. It helps relieve pain and swelling in postoperative wounds and inflammatory diseases.</p>', 12, 6, 48, 300, 10, 20, 8, 80, 160, 0, NULL, '2020-10-26', 0, 1, 0, 0, 'Danzen_6_48_61_1596140104.jpg', 'http://localhost:8000/uploads/images/Danzen_6_48_61_1596140104.jpg', 61, 64, NULL, 0),
(111, 'Doxycycline', 'Doxycycline 100mg Tab.', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Doxycycline</strong>&nbsp;is used to treat bacterial infections in many different parts of the body. It is also used to treat pimples and abscesses (usually on the face) that are caused by rosacea, also known as acne rosacea or adult acne.</p>', 13, 2, 48, 50, 4, 8, 25, 100, 200, 0, NULL, '2020-10-12', 0, 1, 0, 0, 'Doxycycline_2_48_61_1596142295.jpg', 'http://localhost:8000/uploads/images/Doxycycline_2_48_61_1596142295.jpg', 61, 65, NULL, 1),
(112, 'Doxycycline', 'Doxycycline 100mg Tab.', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Doxycycline</strong>&nbsp;is used to treat bacterial infections in many different parts of the body. It is also used to treat pimples and abscesses (usually on the face) that are caused by rosacea, also known as acne rosacea or adult acne.</p>', 13, 4, 48, 100, 4, 8, 25, 100, 200, 0, NULL, '2020-10-30', 0, 1, 0, 0, 'Doxycycline_4_48_61_1596142313.jpg', 'http://localhost:8000/uploads/images/Doxycycline_4_48_61_1596142313.jpg', 61, 65, NULL, 1),
(113, 'Doxycycline', 'Doxycycline 100mg Tab.', '<h3><strong>Description:</strong></h3>\r\n\r\n<p><strong>Doxycycline</strong>&nbsp;is used to treat bacterial infections in many different parts of the body. It is also used to treat pimples and abscesses (usually on the face) that are caused by rosacea, also known as acne rosacea or adult acne.</p>', 13, 7, 48, 80, 4, 8, 25, 100, 200, 0, NULL, '2020-10-20', 0, 1, 0, 0, 'Doxycycline_7_48_61_1596142336.jpg', 'http://localhost:8000/uploads/images/Doxycycline_7_48_61_1596142336.jpg', 61, 65, NULL, 1),
(114, 'Comet', 'Comet 500mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Comet is used in the initial therapy for the management of diabetes.</p>', 14, 2, 48, 500, 10, 30, 5, 50, 150, 0, NULL, '2020-10-30', 0, 1, 0, 0, 'Comet_2_48_61_1596142909.jpg', 'http://localhost:8000/uploads/images/Comet_2_48_61_1596142909.jpg', 61, 66, NULL, 0),
(115, 'Comet', 'Comet 500mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Comet is used in the initial therapy for the management of diabetes.</p>', 14, 7, 48, 300, 10, 30, 5, 50, 150, 0, NULL, '2020-10-22', 0, 1, 0, 0, 'Comet_7_48_61_1596142929.jpg', 'http://localhost:8000/uploads/images/Comet_7_48_61_1596142929.jpg', 61, 66, NULL, 0),
(116, 'Comet', 'Comet 500mg Tab', '<h3><strong>Description:</strong></h3>\r\n\r\n<p>Comet is used in the initial therapy for the management of diabetes.</p>', 14, 8, 48, 150, 10, 30, 5, 50, 150, 0, NULL, '2020-10-19', 0, 1, 0, 0, 'Comet_8_48_61_1596142953.jpg', 'http://localhost:8000/uploads/images/Comet_8_48_61_1596142953.jpg', 61, 66, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `temporary_pharmacypurchase`
--

CREATE TABLE `temporary_pharmacypurchase` (
  `Id` int(11) NOT NULL,
  `Stock_Id` int(11) NOT NULL,
  `Emp_Id` int(11) NOT NULL,
  `Pharm_Id` int(11) NOT NULL,
  `unit_qty` int(11) NOT NULL,
  `buy_price` float NOT NULL,
  `total_price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `temporary_pharmacysales`
--

CREATE TABLE `temporary_pharmacysales` (
  `Id` int(11) NOT NULL,
  `Stock_Id` int(11) NOT NULL,
  `Emp_Id` int(11) NOT NULL,
  `Pharm_Id` int(11) NOT NULL,
  `unit_qty` int(11) NOT NULL,
  `total_price` float NOT NULL,
  `stock_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `temporary_userorder`
--

CREATE TABLE `temporary_userorder` (
  `Id` int(11) NOT NULL,
  `Stock_Id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `user_Id` int(11) DEFAULT NULL,
  `Pharm_Id` int(11) NOT NULL,
  `total_price` float DEFAULT NULL,
  `stock_type` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `Emp_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userorder_details`
--

CREATE TABLE `userorder_details` (
  `Id` int(11) NOT NULL,
  `userOrder_Id` int(11) DEFAULT NULL,
  `stock_Id` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `total_Price` float NOT NULL,
  `deleted` int(11) DEFAULT 0,
  `user_Id` int(11) DEFAULT NULL,
  `Pharm_Id` int(11) DEFAULT NULL,
  `stock_type` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userorder_details`
--

INSERT INTO `userorder_details` (`Id`, `userOrder_Id`, `stock_Id`, `qty`, `total_Price`, `deleted`, `user_Id`, `Pharm_Id`, `stock_type`, `status`, `price`) VALUES
(1, 2, 7, 2, 4600, 0, 1, 1, 0, 0, 2300),
(2, 2, 1, 3, 1500, 0, 1, 1, 0, 0, 500),
(3, 3, 4, 2, 2120, 0, 1, 1, 0, 0, 1060),
(4, 3, 6, 1, 970, 0, 1, 1, 0, 0, 970),
(5, 7, 1, 2, 1000, 0, 1, 1, 0, 0, 500),
(6, 7, 5, 1, 1000, 0, 1, 1, 0, 0, 1000),
(7, 8, 6, 4, 3880, 0, 1, 1, 0, 0, 970),
(8, 9, 1, 8, 4000, 0, 1, 1, 0, 0, 500),
(9, 10, 20, 2, 960, 0, 1, 1, 0, 0, 480);

-- --------------------------------------------------------

--
-- Table structure for table `user_orders`
--

CREATE TABLE `user_orders` (
  `Id` int(11) NOT NULL,
  `user_Id` int(11) DEFAULT NULL,
  `total_amount` float NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `deleted` int(11) DEFAULT 0,
  `item_count` int(11) DEFAULT NULL,
  `prescription_image` longtext DEFAULT NULL,
  `prescription_image_url` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_orders`
--

INSERT INTO `user_orders` (`Id`, `user_Id`, `total_amount`, `order_date`, `deleted`, `item_count`, `prescription_image`, `prescription_image_url`) VALUES
(2, 1, 6100, '2020-04-19 05:44:32', 0, 2, '1_6100_1587257072.jpg', 'http://localhost:8000/uploads/images/1_6100_1587257072.jpg'),
(3, 1, 3090, '2020-04-20 07:34:17', 0, 2, '1_3090_1587350057.jpg', 'http://localhost:8000/uploads/images/1_3090_1587350057.jpg'),
(7, 1, 2000, '2020-04-23 07:25:24', 0, 2, 'no_image_available.png', 'http://localhost:8000/uploads/images/no-image-available.png'),
(8, 1, 3880, '2020-04-23 07:29:31', 0, 1, 'no_image_available.png', 'http://localhost:8000/uploads/images/no-image-available.png'),
(9, 1, 4000, '2020-04-30 15:39:18', 0, 1, 'no_image_available.png', 'http://localhost:8000/uploads/images/no-image-available.png'),
(10, 1, 960, '2020-05-19 13:23:36', 0, 1, 'no_image_available.png', 'http://localhost:8000/uploads/images/no-image-available.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alternatives`
--
ALTER TABLE `alternatives`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `medicine` (`medicine`),
  ADD KEY `altenative_med` (`altenative_med`);

--
-- Indexes for table `appusers`
--
ALTER TABLE `appusers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `contact` (`contact`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CategoryId` (`SubCategoryId`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Stock_Id` (`Stock_Id`),
  ADD KEY `user_Id` (`user_Id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Contact` (`Contact`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Pharm_Id` (`Pharm_Id`);

--
-- Indexes for table `distributors`
--
ALTER TABLE `distributors`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Company_Id` (`Company_Id`),
  ADD KEY `Pharmacy_Id` (`Pharmacy_Id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Contact` (`Contact`),
  ADD UNIQUE KEY `CNIC` (`CNIC`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD KEY `Pharm_Id` (`Pharm_Id`),
  ADD KEY `Designation` (`Designation`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `stockId` (`stockId`);

--
-- Indexes for table `formulae`
--
ALTER TABLE `formulae`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Formula` (`Formula`);

--
-- Indexes for table `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `list_data`
--
ALTER TABLE `list_data`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `List_Id` (`List_Id`);

--
-- Indexes for table `pharmacy`
--
ALTER TABLE `pharmacy`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Contact` (`Contact`);

--
-- Indexes for table `pharmacysales`
--
ALTER TABLE `pharmacysales`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`),
  ADD KEY `Customer_Id` (`Customer_Id`),
  ADD KEY `Employee_Id` (`Employee_Id`);

--
-- Indexes for table `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`),
  ADD KEY `Employee_Id` (`Employee_Id`),
  ADD KEY `Distributor_Id` (`Distributor_Id`);

--
-- Indexes for table `purchase_details`
--
ALTER TABLE `purchase_details`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Stock_Id` (`Stock_Id`),
  ADD KEY `Purchase_Id` (`Purchase_Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`);

--
-- Indexes for table `purchase_return`
--
ALTER TABLE `purchase_return`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`),
  ADD KEY `Purchase_Id` (`Purchase_Id`),
  ADD KEY `Stock` (`Stock`),
  ADD KEY `Employee_Id` (`Employee_Id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Indexes for table `sale_details`
--
ALTER TABLE `sale_details`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Stock_Id` (`Stock_Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`),
  ADD KEY `Sale_Id` (`Sale_Id`);

--
-- Indexes for table `sale_return`
--
ALTER TABLE `sale_return`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`),
  ADD KEY `Stock` (`Stock`),
  ADD KEY `Employee_Id` (`Employee_Id`),
  ADD KEY `Sale_Id` (`Sale_Id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Formula` (`Formula`),
  ADD KEY `Pharm_Id` (`Pharm_Id`),
  ADD KEY `Category_Id` (`Category_Id`),
  ADD KEY `sub_category` (`sub_category`),
  ADD KEY `Brand` (`Brand`);

--
-- Indexes for table `temporary_pharmacypurchase`
--
ALTER TABLE `temporary_pharmacypurchase`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Stock_Id` (`Stock_Id`),
  ADD KEY `Emp_Id` (`Emp_Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`);

--
-- Indexes for table `temporary_pharmacysales`
--
ALTER TABLE `temporary_pharmacysales`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Stock_Id` (`Stock_Id`),
  ADD KEY `Emp_Id` (`Emp_Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`);

--
-- Indexes for table `temporary_userorder`
--
ALTER TABLE `temporary_userorder`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Stock_Id` (`Stock_Id`),
  ADD KEY `user_Id` (`user_Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`),
  ADD KEY `Emp_Id` (`Emp_Id`);

--
-- Indexes for table `userorder_details`
--
ALTER TABLE `userorder_details`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `userOrder_Id` (`userOrder_Id`),
  ADD KEY `stock_Id` (`stock_Id`),
  ADD KEY `user_Id` (`user_Id`),
  ADD KEY `Pharm_Id` (`Pharm_Id`);

--
-- Indexes for table `user_orders`
--
ALTER TABLE `user_orders`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `user_Id` (`user_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alternatives`
--
ALTER TABLE `alternatives`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appusers`
--
ALTER TABLE `appusers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `distributors`
--
ALTER TABLE `distributors`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `formulae`
--
ALTER TABLE `formulae`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `list`
--
ALTER TABLE `list`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `list_data`
--
ALTER TABLE `list_data`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `pharmacy`
--
ALTER TABLE `pharmacy`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pharmacysales`
--
ALTER TABLE `pharmacysales`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase`
--
ALTER TABLE `purchase`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_details`
--
ALTER TABLE `purchase_details`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_return`
--
ALTER TABLE `purchase_return`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `sale_details`
--
ALTER TABLE `sale_details`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sale_return`
--
ALTER TABLE `sale_return`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `temporary_pharmacypurchase`
--
ALTER TABLE `temporary_pharmacypurchase`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `temporary_pharmacysales`
--
ALTER TABLE `temporary_pharmacysales`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `temporary_userorder`
--
ALTER TABLE `temporary_userorder`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `userorder_details`
--
ALTER TABLE `userorder_details`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_orders`
--
ALTER TABLE `user_orders`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alternatives`
--
ALTER TABLE `alternatives`
  ADD CONSTRAINT `alternatives_ibfk_1` FOREIGN KEY (`medicine`) REFERENCES `stock` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `alternatives_ibfk_2` FOREIGN KEY (`altenative_med`) REFERENCES `stock` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `brands`
--
ALTER TABLE `brands`
  ADD CONSTRAINT `brands_ibfk_1` FOREIGN KEY (`SubCategoryId`) REFERENCES `list_data` (`Id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`Stock_Id`) REFERENCES `stock` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`user_Id`) REFERENCES `appusers` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`);

--
-- Constraints for table `distributors`
--
ALTER TABLE `distributors`
  ADD CONSTRAINT `distributors_ibfk_1` FOREIGN KEY (`Company_Id`) REFERENCES `list_data` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `distributors_ibfk_2` FOREIGN KEY (`Pharmacy_Id`) REFERENCES `pharmacy` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Designation`) REFERENCES `list_data` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `appusers` (`Id`),
  ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`stockId`) REFERENCES `stock` (`Id`);

--
-- Constraints for table `list_data`
--
ALTER TABLE `list_data`
  ADD CONSTRAINT `list_data_ibfk_1` FOREIGN KEY (`List_Id`) REFERENCES `list` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pharmacysales`
--
ALTER TABLE `pharmacysales`
  ADD CONSTRAINT `pharmacysales_ibfk_1` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pharmacysales_ibfk_2` FOREIGN KEY (`Customer_Id`) REFERENCES `customer` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pharmacysales_ibfk_3` FOREIGN KEY (`Employee_Id`) REFERENCES `employee` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `purchase`
--
ALTER TABLE `purchase`
  ADD CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`Employee_Id`) REFERENCES `employee` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_ibfk_3` FOREIGN KEY (`Distributor_Id`) REFERENCES `distributors` (`Id`);

--
-- Constraints for table `purchase_details`
--
ALTER TABLE `purchase_details`
  ADD CONSTRAINT `purchase_details_ibfk_1` FOREIGN KEY (`Stock_Id`) REFERENCES `stock` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_details_ibfk_2` FOREIGN KEY (`Purchase_Id`) REFERENCES `purchase` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_details_ibfk_3` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`);

--
-- Constraints for table `purchase_return`
--
ALTER TABLE `purchase_return`
  ADD CONSTRAINT `purchase_return_ibfk_1` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_return_ibfk_2` FOREIGN KEY (`Purchase_Id`) REFERENCES `purchase` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_return_ibfk_3` FOREIGN KEY (`Stock`) REFERENCES `stock` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `purchase_return_ibfk_4` FOREIGN KEY (`Employee_Id`) REFERENCES `employee` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`User_Id`) REFERENCES `appusers` (`Id`);

--
-- Constraints for table `sale_details`
--
ALTER TABLE `sale_details`
  ADD CONSTRAINT `sale_details_ibfk_1` FOREIGN KEY (`Stock_Id`) REFERENCES `stock` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sale_details_ibfk_3` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`),
  ADD CONSTRAINT `sale_details_ibfk_4` FOREIGN KEY (`Sale_Id`) REFERENCES `pharmacysales` (`Id`);

--
-- Constraints for table `sale_return`
--
ALTER TABLE `sale_return`
  ADD CONSTRAINT `sale_return_ibfk_1` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sale_return_ibfk_3` FOREIGN KEY (`Stock`) REFERENCES `stock` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sale_return_ibfk_4` FOREIGN KEY (`Employee_Id`) REFERENCES `employee` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sale_return_ibfk_5` FOREIGN KEY (`Sale_Id`) REFERENCES `pharmacysales` (`Id`);

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`Formula`) REFERENCES `formulae` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `stock_ibfk_3` FOREIGN KEY (`Category_Id`) REFERENCES `list_data` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `stock_ibfk_6` FOREIGN KEY (`sub_category`) REFERENCES `list_data` (`Id`),
  ADD CONSTRAINT `stock_ibfk_7` FOREIGN KEY (`Brand`) REFERENCES `brands` (`Id`);

--
-- Constraints for table `temporary_pharmacypurchase`
--
ALTER TABLE `temporary_pharmacypurchase`
  ADD CONSTRAINT `temporary_pharmacypurchase_ibfk_1` FOREIGN KEY (`Stock_Id`) REFERENCES `stock` (`Id`),
  ADD CONSTRAINT `temporary_pharmacypurchase_ibfk_2` FOREIGN KEY (`Emp_Id`) REFERENCES `employee` (`Id`),
  ADD CONSTRAINT `temporary_pharmacypurchase_ibfk_3` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`);

--
-- Constraints for table `temporary_pharmacysales`
--
ALTER TABLE `temporary_pharmacysales`
  ADD CONSTRAINT `temporary_pharmacysales_ibfk_1` FOREIGN KEY (`Stock_Id`) REFERENCES `stock` (`Id`),
  ADD CONSTRAINT `temporary_pharmacysales_ibfk_2` FOREIGN KEY (`Emp_Id`) REFERENCES `employee` (`Id`),
  ADD CONSTRAINT `temporary_pharmacysales_ibfk_3` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`);

--
-- Constraints for table `temporary_userorder`
--
ALTER TABLE `temporary_userorder`
  ADD CONSTRAINT `temporary_userorder_ibfk_1` FOREIGN KEY (`Stock_Id`) REFERENCES `stock` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `temporary_userorder_ibfk_2` FOREIGN KEY (`user_Id`) REFERENCES `appusers` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `temporary_userorder_ibfk_3` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`),
  ADD CONSTRAINT `temporary_userorder_ibfk_4` FOREIGN KEY (`Emp_Id`) REFERENCES `employee` (`Id`);

--
-- Constraints for table `userorder_details`
--
ALTER TABLE `userorder_details`
  ADD CONSTRAINT `userorder_details_ibfk_1` FOREIGN KEY (`userOrder_Id`) REFERENCES `user_orders` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userorder_details_ibfk_2` FOREIGN KEY (`stock_Id`) REFERENCES `stock` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userorder_details_ibfk_3` FOREIGN KEY (`user_Id`) REFERENCES `appusers` (`Id`),
  ADD CONSTRAINT `userorder_details_ibfk_4` FOREIGN KEY (`Pharm_Id`) REFERENCES `pharmacy` (`Id`);

--
-- Constraints for table `user_orders`
--
ALTER TABLE `user_orders`
  ADD CONSTRAINT `user_orders_ibfk_1` FOREIGN KEY (`user_Id`) REFERENCES `appusers` (`Id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
