import { StyleSheet } from "@react-pdf/renderer";

export const COLORS = {
  primary: "#0088CC",
  primaryDark: "#006699",
  text: "#111111",
  muted: "#666666",
  border: "#CCCCCC",
  success: "#16A34A",
  destructive: "#DC2626",
  warning: "#CA8A04",
  background: "#FFFFFF",
  backgroundMuted: "#F8F9FA",
  naBg: "#F3F4F6",
  recusaBg: "#FEF2F2",
  recusaBorder: "#DC2626",
};

export const FONTS = {
  bold: "Helvetica-Bold",
  regular: "Helvetica",
};

export const SIZES = {
  pagePadding: 40,
  title: 20,
  subtitle: 11,
  section: 13,
  body: 10,
  small: 8,
  tiny: 7,
};

export const styles = StyleSheet.create({
  page: {
    padding: SIZES.pagePadding,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body,
    color: COLORS.text,
    lineHeight: 1.4,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingBottom: 10,
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.title,
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.muted,
    marginTop: 2,
  },
  headerMeta: {
    alignItems: "flex-end",
    fontSize: SIZES.small,
    color: COLORS.muted,
  },
  headerMetaLine: {
    marginBottom: 2,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.section,
    color: COLORS.primary,
    marginTop: 16,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  fieldRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  fieldLabel: {
    width: 100,
    color: COLORS.muted,
    fontSize: SIZES.small,
  },
  fieldValue: {
    flex: 1,
    fontSize: SIZES.body,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    color: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontFamily: FONTS.bold,
    fontSize: SIZES.small,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    fontSize: SIZES.body,
    alignItems: "center",
  },
  tableRowAlt: {
    backgroundColor: COLORS.backgroundMuted,
  },
  tableCellText: {
    flex: 1,
    paddingRight: 8,
  },
  tableCellResp: {
    width: 60,
    textAlign: "center",
    fontFamily: FONTS.bold,
    fontSize: SIZES.small,
  },
  tableCellRespSim: {
    color: COLORS.success,
  },
  tableCellRespNao: {
    color: COLORS.destructive,
  },
  tableCellRespNA: {
    color: COLORS.muted,
  },
  naBlock: {
    backgroundColor: COLORS.naBg,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.muted,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  naBlockTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.body,
    marginBottom: 2,
  },
  naBlockSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.muted,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: SIZES.pagePadding,
    right: SIZES.pagePadding,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 6,
    fontSize: SIZES.tiny,
    color: COLORS.muted,
    textAlign: "center",
  },
  recusaContainer: {
    marginTop: 20,
    padding: 12,
    borderWidth: 2,
    borderColor: COLORS.recusaBorder,
    backgroundColor: COLORS.recusaBg,
  },
  recusaTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.section,
    color: COLORS.destructive,
    marginBottom: 8,
  },
  recusaField: {
    marginBottom: 6,
    fontSize: SIZES.body,
  },
  recusaMotivo: {
    fontStyle: "italic",
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.destructive,
    marginVertical: 4,
  },
});
