import {
  DRAFT_STATUS,
  READY_STATUS,
  SENT_STATUS,
  COMPLETE_STATUS,
} from "../db/createProductStatuses";
import { IInvitation } from "../schemas/invitation";
import { IProduct } from "../schemas/product";

const MIN_FEATURES = 5;
const MIN_RESPONSES = 10;

export const getProductCategory = (product: IProduct): string => {
  if (product?.features?.length >= MIN_FEATURES) {
    return READY_STATUS;
  } else if (
    product?.invitations?.filter(
      (invitation) => (invitation as unknown as IInvitation)?.sent_date
    ).length >= 0
  ) {
    return SENT_STATUS;
  } else if (product?.questionaries?.length >= MIN_RESPONSES) {
    return COMPLETE_STATUS;
  } else {
    return DRAFT_STATUS;
  }
};
