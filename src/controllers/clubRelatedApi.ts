import { BusinessLogic } from "../@types/BusinessLogic";
import { HttpError } from "../@types/httpError";
import { ClubInterface, SupplyInterface } from "../models/objectRelationalMapping/model.interfaces";
import * as Query from "./functions/sequelizeQuery";

const supplyClubItems: BusinessLogic = async (req, res, next) => {
  const { price, name, count, option, url } = req.body as { price: number, name: string, count: number, option: string, url: string };
  const club_id: number = +(req.params.club_id);
  const majorClub: ClubInterface = await Query.FindClubById(club_id);
  if(majorClub.current_budget - price < 0) {
    throw new HttpError(400, "예산 초과");
  }
  const supply: SupplyInterface = await Query.InsertSupplyData(
    name, price, 2, count, url, req.decoded.user_id, club_id,
  );
  Query.InsertOptionData(option, supply.id);
  res.status(200).json({
    msg: "success",
  });
}

const putClubItems: BusinessLogic = async (req, res, next) => {
  const club_id: number = +(req.params.club_id);
  const supply_id: number = +(req.params.supply_id);
  const { count, price } = req.body as { count: number, price: number };
  const supply: SupplyInterface = await Query.FindSupplyById(supply_id);
  if(!supply || supply.club_id !== club_id || supply.user_id !== req.decoded.user_id) {
    throw new HttpError(403, "접근 권한이 없습니다");
  }
  const majorClub = await Query.FindClubById(club_id);
  if(majorClub.current_budget - price < 0) {
    throw new HttpError(400, "예산 초과");
  }
  supply.count = count;
  supply.price = price;
  res.status(200).json({
    msg: "success",
  });
  supply.save();
}

const deleteClubItems: BusinessLogic = async (req, res, next) => {
  const club_id: number = +(req.params.club_id);
  const supply_id: number = +(req.params.supply_id); 
  const supply: SupplyInterface = await Query.FindSupplyById(supply_id);
  if(!supply || supply.club_id !== club_id || supply.user_id !== req.decoded.user_id) { 
    throw new HttpError(403, "접근 권한이 없습니다");
  }
  Query.DeleteFromSupply(supply_id);
  res.status(200).json({
    msg: "success",
  });
}

const showClubStatus: BusinessLogic = async (req, res, next) => {
  const club_id = +(req.params.club_id);
  const club: ClubInterface = await Query.FindClubById(club_id);
  res.status(200).json({
    total_budget: club.total_budget,
    current_budget: club.current_budget, 
  });
}

export { 
  supplyClubItems,
  putClubItems,
  deleteClubItems,
  showClubStatus,
}