import { db } from "../../models";
import * as SequelizeInterface from "../../models/objectRelationalMapping/model.interfaces";
import { UserInfo } from "../dto/userInfo";

const InsertSupplyData = (
  name: string,
  price: number,
  status: number,
  count: number,
  link: string,
  user_id: number,
  club_id: number)
  : Promise<SequelizeInterface.SupplyInterface> => {
  return db.Supply.create({ name, price, status, count, link, user_id, club_id, });
}

const InsertOptionData = (option: string, supply_id: number): 
Promise<SequelizeInterface.OptionInterface> => {
  return db.Option.create({
    script: option,
    supply_id: supply_id
  });
}

const FindSupplyById = (supply_id: number): 
Promise<SequelizeInterface.SupplyInterface> => {
  return db.Supply.findOne({
    where: { id: supply_id },
  });
}

const FindClubById = (club_id: number): 
Promise<SequelizeInterface.ClubInterface> => {
  return db.Club.findOne({
    where: { id: club_id },
  });
}

const DeleteFromSupply = (supply_id: number):
Promise<number> => {
  return db.Supply.destroy({
    where: { id: supply_id }
  });
}

const FindOrCreateUser = (whereOption: UserInfo):
Promise<[SequelizeInterface.UserInterface, boolean]> => {
  return db.User.findOrCreate({
    where: whereOption,
  });
}
 
export {
  InsertSupplyData,
  InsertOptionData,
  FindSupplyById,
  FindClubById,
  DeleteFromSupply,
  FindOrCreateUser,
}