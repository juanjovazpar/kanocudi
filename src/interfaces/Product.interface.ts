import { IFeature } from "./Feature.interface";
import { IInvitation } from "./Invitation.interface";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  features: IFeature[];
  invitations: IInvitation[];
}
