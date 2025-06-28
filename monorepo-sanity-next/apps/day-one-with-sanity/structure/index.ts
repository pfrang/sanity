import { CalendarIcon, PinIcon } from "@sanity/icons";
import { StructureResolver } from "sanity/structure";
import { documentTypes } from "../schemaTypes/constants";

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title("Content")
    .items([
      S.listItem()
        .title("Upcoming events")
        .schemaType(documentTypes.EVENT)
        .icon(CalendarIcon)
        .child(S.documentList().title("Upcoming Events").filter('date > now()')),
      S.listItem()
        .title("Prior events")
        .schemaType(documentTypes.EVENT)
        .icon(CalendarIcon)
        .child(S.documentList().title("Prior Events").filter('date < now()')),
      S.divider(),
      S.listItem()
        .title("Associations")
        .schemaType(documentTypes.ASSOCIATION)
        .icon(PinIcon)
        .child(S.documentList().title("All Associations").filter('_type == "association"'))
    ])