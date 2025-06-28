export const documentTypes = {
  HOME_PAGE: "homePage",
  EVENT: "event",
  ASSOCIATION: "association",
} as const

export type DocumentType = (typeof documentTypes)[keyof typeof documentTypes];