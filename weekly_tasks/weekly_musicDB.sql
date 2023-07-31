-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`music`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`music` (
  `idmusic` INT NOT NULL AUTO_INCREMENT,
  `music_name` LONGTEXT NOT NULL,
  `music_singer` LONGTEXT NOT NULL,
  `play_time` INT NOT NULL,
  `release_date` DATE NOT NULL,
  PRIMARY KEY (`idmusic`),
  UNIQUE INDEX `idmusic_UNIQUE` (`idmusic` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `userid` VARCHAR(20) NOT NULL,
  `userpw` VARCHAR(15) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `tel` VARCHAR(15) NOT NULL,
  UNIQUE INDEX `username_UNIQUE` (`userid` ASC) VISIBLE,
  PRIMARY KEY (`userid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`playlist` (
  `user_userid` VARCHAR(20) NOT NULL,
  `music_idmusic` INT NOT NULL,
  PRIMARY KEY (`user_userid`, `music_idmusic`),
  INDEX `fk_user_has_music_music1_idx` (`music_idmusic` ASC) VISIBLE,
  INDEX `fk_user_has_music_user_idx` (`user_userid` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_music_user`
    FOREIGN KEY (`user_userid`)
    REFERENCES `mydb`.`user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_music_music1`
    FOREIGN KEY (`music_idmusic`)
    REFERENCES `mydb`.`music` (`idmusic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`like_playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`like_playlist` (
  `user_userid` VARCHAR(20) NOT NULL,
  `music_idmusic` INT NOT NULL,
  PRIMARY KEY (`user_userid`, `music_idmusic`),
  INDEX `fk_user_has_music_music2_idx` (`music_idmusic` ASC) VISIBLE,
  INDEX `fk_user_has_music_user1_idx` (`user_userid` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_music_user1`
    FOREIGN KEY (`user_userid`)
    REFERENCES `mydb`.`user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_music_music2`
    FOREIGN KEY (`music_idmusic`)
    REFERENCES `mydb`.`music` (`idmusic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
