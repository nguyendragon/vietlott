-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 06, 2023 lúc 08:24 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `viettlot`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bankcards`
--

CREATE TABLE `bankcards` (
  `id_bankcard` int(11) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `name_bank` varchar(100) DEFAULT NULL,
  `name_user` varchar(100) DEFAULT NULL,
  `account_number` varchar(50) DEFAULT NULL,
  `phone_card` varchar(30) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `bankcards`
--

INSERT INTO `bankcards` (`id_bankcard`, `phone`, `name_bank`, `name_user`, `account_number`, `phone_card`, `time`) VALUES
(2, '0387636509', 'MB BANK', 'NGUYEN VAN LINH', '0800100237233', '0387626399', '2023-02-03 16:53:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `game_records`
--

CREATE TABLE `game_records` (
  `id_game` int(11) NOT NULL,
  `period` int(11) DEFAULT NULL,
  `result` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `create_at` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `game_records`
--

INSERT INTO `game_records` (`id_game`, `period`, `result`, `status`, `create_at`, `time`) VALUES
(1, 23122152, 466, 1, '2023-02-01 06:26:27', '1655689155500'),
(2, 23122153, 452, 1, '2023-02-01 06:26:27', '1655689155500'),
(3, 23122154, 123, 1, '2023-02-01 06:26:27', '1655689155500'),
(4, 23122155, 313, 1, '2023-02-01 06:26:27', '1655689155500'),
(5, 23122156, 126, 1, '2023-02-01 06:26:27', '1655689155500'),
(6, 23122157, 553, 1, '2023-02-01 06:26:27', '1655689155500'),
(7, 23122158, 425, 1, '2023-02-01 06:26:27', '1655689155500'),
(8, 23122159, 453, 1, '2023-02-01 06:26:27', '1655689155500'),
(9, 23122160, 126, 1, '2023-02-03 23:17:30', '1675441050455'),
(10, 23122161, 432, 1, '2023-02-03 23:17:35', '1675441055481'),
(11, 23122162, 435, 1, '2023-02-03 23:17:40', '1675441060525'),
(12, 23122163, 621, 1, '2023-02-03 23:17:45', '1675441065583'),
(13, 23122164, 422, 1, '2023-02-03 23:17:50', '1675441070641'),
(14, 23122165, 222, 1, '2023-02-03 23:17:55', '1675441075705'),
(15, 23122166, 111, 1, '2023-02-03 23:18:00', '1675441080759'),
(16, 23122167, 135, 1, '2023-02-03 23:18:05', '1675441085784'),
(17, 23122168, 321, 1, '2023-02-03 23:18:10', '1675441090840'),
(18, 23122169, 314, 1, '2023-02-03 23:18:15', '1675441095884'),
(19, 23122170, 542, 1, '2023-02-03 23:18:20', '1675441100932'),
(20, 23122171, 125, 1, '2023-02-03 23:18:25', '1675441105972'),
(21, 23122172, 564, 1, '2023-02-03 23:18:30', '1675441110007'),
(39, 23122190, 252, 1, '2023-02-03 23:20:05', '1675441205963'),
(40, 23122191, 545, 1, '2023-02-03 23:25:10', '1675441510946'),
(41, 23122192, 223, 1, '2023-02-03 23:25:15', '1675441515993'),
(42, 23122193, 614, 1, '2023-02-03 23:25:20', '1675441520049'),
(43, 23122194, 326, 1, '2023-02-03 23:25:25', '1675441525098'),
(44, 23122195, 343, 1, '2023-02-03 23:25:30', '1675441530147'),
(45, 23122196, 516, 1, '2023-02-03 23:25:35', '1675441535199'),
(46, 23122197, 162, 1, '2023-02-03 23:25:40', '1675441540255'),
(47, 23122198, 462, 1, '2023-02-03 23:25:45', '1675441545319'),
(48, 23122199, 356, 1, '2023-02-03 23:25:50', '1675441550375'),
(49, 23122200, 243, 1, '2023-02-03 23:25:55', '1675441555428'),
(50, 23122201, 115, 1, '2023-02-03 23:26:00', '1675441560476'),
(51, 23122202, 556, 1, '2023-02-03 23:26:05', '1675441565528'),
(52, 23122203, 324, 1, '2023-02-03 23:26:10', '1675441570574'),
(53, 23122204, 416, 1, '2023-02-03 23:27:00', '1675441620799'),
(54, 23122205, 642, 1, '2023-02-03 23:30:00', '1675441800758'),
(55, 23122206, NULL, 0, '2023-02-03 23:33:00', '1675441980639');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `recharges`
--

CREATE TABLE `recharges` (
  `id_recharge` int(11) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `order_code` varchar(50) DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '1. bank, 2. momo',
  `status` int(11) NOT NULL DEFAULT 0,
  `time_end` varchar(100) DEFAULT NULL,
  `add_time` varchar(50) DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `recharges`
--

INSERT INTO `recharges` (`id_recharge`, `phone`, `order_code`, `money`, `type`, `status`, `time_end`, `add_time`, `time`) VALUES
(11, '0387636509', '20230201S8AJWFJVUBF', 500000, 1, 1, '1675209388061', '01/02/2023', '2023-02-01 06:26:27'),
(24, '0387636509', '20230202BJUIJCMQYC9', 1000000000, 1, 2, '1675320021846', '02/02/2023', '2023-02-02 13:10:21'),
(25, '0387636509', '202302020ARAGMEQHMJ', 50000, 1, 2, '1675320053547', '02/02/2023', '2023-02-02 13:10:53'),
(26, '0387636509', '20230202UBJMLJQSSSA', 500000, 1, 2, '1675320154638', '02/02/2023', '2023-02-02 13:12:34'),
(27, '0387636509', '20230202QKXJEFLBZFR', 50000, 1, 2, '1675321067187', '02/02/2023', '2023-02-02 13:27:46'),
(28, '0387636509', '20230202JUKTAQ9UBKQ', 50000, 1, 2, '1675322326471', '02/02/2023', '2023-02-02 13:48:45'),
(29, '0387636509', '20230202T4I4CK202H9', 50000, 1, 1, '1675327566766', '02/02/2023', '2023-02-02 15:16:06'),
(30, '0387636509', '20230203DYBZIWUUGGD', 50000, 2, 2, '1675414929538', '03/02/2023', '2023-02-03 15:32:09'),
(31, '0387636509', '20230203CCONGHFHPJO', 50000, 1, 2, '1675421521092', '03/02/2023', '2023-02-03 17:22:00'),
(32, '0387636509', '20230203DV9KIJQ6IOX', 50000, 1, 1, '1675421529946', '03/02/2023', '2023-02-03 17:22:09'),
(33, '0387636509', '20230203CLNTK1WKJNP', 50000, 1, 2, '1675421537659', '03/02/2023', '2023-02-03 17:22:17'),
(34, '0387636509', '202302036XFP5OQO47Q', 50000, 1, 2, '1675421556834', '03/02/2023', '2023-02-03 17:22:36'),
(35, '0387636509', '20230203PFR7LPZTINM', 100000000, 2, 2, '1675424635966', '03/02/2023', '2023-02-03 18:13:55');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `recharge_info`
--

CREATE TABLE `recharge_info` (
  `id_info` int(11) NOT NULL,
  `name_info` varchar(100) DEFAULT NULL,
  `detail_info` varchar(100) DEFAULT NULL,
  `name_account` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `type` int(11) DEFAULT NULL COMMENT '1. bank, 2. momo',
  `time` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `recharge_info`
--

INSERT INTO `recharge_info` (`id_info`, `name_info`, `detail_info`, `name_account`, `status`, `type`, `time`) VALUES
(1, 'MB BANK', '08001008688', 'NGUYEN VAN LINH', 1, 1, NULL),
(2, 'Momo', '03876318385', 'NGUYEN VAN LINH', 1, 2, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `money` double NOT NULL DEFAULT 0,
  `name_user` varchar(50) DEFAULT NULL,
  `invite` varchar(20) DEFAULT NULL,
  `refferer` varchar(10) DEFAULT NULL,
  `role` int(11) NOT NULL DEFAULT 0,
  `ip_address` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `time` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id_user`, `phone`, `password`, `money`, `name_user`, `invite`, `refferer`, `role`, `ip_address`, `status`, `time`) VALUES
(1, '0387636500', '', 0, 'Member6500', '6fGGw42409', NULL, 1, NULL, 1, '1655689155500'),
(10663, '0387636509', '$2b$10$lj3W6H4wJD2Rljsj50ol0O3qltTNiDn4qQ6wOYy0MX0XeaTP01tNK', 10000, 'Member6509', 'onZ99m7133', '6fGGw42409', 0, '::1', 1, '1675190383679'),
(10665, '0387636501', '$2b$10$0EGGDPmz9pEJnjD2wg8Zweb6EJ3T0niNsCLaeDSmwY8J7xqvJ9fIS', 0, 'Member6501', 'XYLqrN6414', 'onZ99m7133', 0, '::1', 1, '1675419090989'),
(10666, '0387636502', '$2b$10$jMUPLoy/P/pK.sKT2YOpgujJ2Q74ZPpUF40L9NMDkFELPpJHDgd2C', 0, 'Member6502', 'yqTLeD52915', 'onZ99m7133', 0, '::1', 1, '1675490885885');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `withdrawals`
--

CREATE TABLE `withdrawals` (
  `id_withdrawal` int(11) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `order_code` varchar(50) DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  `id_bankcard` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `add_time` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `withdrawals`
--

INSERT INTO `withdrawals` (`id_withdrawal`, `phone`, `order_code`, `money`, `id_bankcard`, `status`, `add_time`, `time`) VALUES
(1, '0387636509', '20230204SF9IG2YWHOJ', 10000, 2, 2, '04/02/2023', '2023-02-04 15:14:35'),
(3, '0387636509', '20230204BLRN1B4UOAQ', 50000, 2, 1, '04/02/2023', '2023-02-04 15:48:12'),
(4, '0387636509', '20230204NL5FZIPECWZ', 10000, 2, 1, '04/02/2023', '2023-02-04 15:58:18');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bankcards`
--
ALTER TABLE `bankcards`
  ADD PRIMARY KEY (`id_bankcard`);

--
-- Chỉ mục cho bảng `game_records`
--
ALTER TABLE `game_records`
  ADD PRIMARY KEY (`id_game`);

--
-- Chỉ mục cho bảng `recharges`
--
ALTER TABLE `recharges`
  ADD PRIMARY KEY (`id_recharge`),
  ADD KEY `phone` (`phone`);

--
-- Chỉ mục cho bảng `recharge_info`
--
ALTER TABLE `recharge_info`
  ADD PRIMARY KEY (`id_info`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `phone` (`phone`);

--
-- Chỉ mục cho bảng `withdrawals`
--
ALTER TABLE `withdrawals`
  ADD PRIMARY KEY (`id_withdrawal`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bankcards`
--
ALTER TABLE `bankcards`
  MODIFY `id_bankcard` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `game_records`
--
ALTER TABLE `game_records`
  MODIFY `id_game` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `recharges`
--
ALTER TABLE `recharges`
  MODIFY `id_recharge` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `recharge_info`
--
ALTER TABLE `recharge_info`
  MODIFY `id_info` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10667;

--
-- AUTO_INCREMENT cho bảng `withdrawals`
--
ALTER TABLE `withdrawals`
  MODIFY `id_withdrawal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `recharges`
--
ALTER TABLE `recharges`
  ADD CONSTRAINT `recharges_ibfk_1` FOREIGN KEY (`phone`) REFERENCES `users` (`phone`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
