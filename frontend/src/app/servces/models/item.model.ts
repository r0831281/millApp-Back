import { Location } from "./location";

export interface Item {
    id: number;
    name: string;
    description?: string;
    code: string;
    date_inservice?: Date;
    date_outservice?: Date;
    date_scanned?: Date;
    ItemTypes: number; // Assuming ItemTypes is a foreign key ID
    ItemLocation: Location;
    ItemBestelling: number; // Assuming ItemBestelling is a foreign key ID
  }
