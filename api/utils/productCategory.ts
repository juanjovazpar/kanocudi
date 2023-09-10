import {
  DRAFT_STATUS,
  READY_STATUS,
  SENT_STATUS,
  COMPLETE_STATUS,
} from "../db/createProductStatuses";
import { IProduct } from "../schemas/product";

export const getProductCategory = (product: IProduct): string => {
  //if() {return DRAFT_STATUS} else if() {return READY_STATUS} else if() {return SENT_STATUS} else{return COMPLETE_STATUS}
  return DRAFT_STATUS;
};
