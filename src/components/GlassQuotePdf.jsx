import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    color: "#1f2a24",
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    borderBottom: "2px solid #2f6f4e",
    paddingBottom: 12,
    marginBottom: 20,
  },
  title: {
    color: "#2f6f4e",
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
  },
  date: {
    color: "#68736c",
    fontSize: 9,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#9ab8a4",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#c8d7cd",
    minHeight: 24,
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#e4efe8",
    fontWeight: 700,
  },
  cell: {
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#c8d7cd",
  },
  index: { width: "7%" },
  color: { width: "18%" },
  thickness: { width: "14%" },
  size: { width: "22%" },
  quantity: { width: "10%" },
  area: { width: "12%" },
  amount: { width: "17%", borderRightWidth: 0 },
  summary: {
    marginLeft: "auto",
    width: "45%",
    borderTopWidth: 1,
    borderTopColor: "#9ab8a4",
    paddingTop: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  total: {
    color: "#2f6f4e",
    fontSize: 14,
    fontWeight: 700,
    borderTopWidth: 1,
    borderTopColor: "#2f6f4e",
    marginTop: 5,
    paddingTop: 8,
  },
  footer: {
    marginTop: 28,
    color: "#68736c",
    fontSize: 9,
  },
});

function money(value) {
  return `NGN ${Number(value || 0).toLocaleString()}`;
}

export default function GlassQuotePdf({ entries, discount, subtotal, total }) {
  return (
    <Document title="Glass Price Quote">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Glass Price Quote</Text>
          <Text style={styles.date}>Generated {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.index]}>S/N</Text>
            <Text style={[styles.cell, styles.color]}>Glass Color</Text>
            <Text style={[styles.cell, styles.thickness]}>Thickness</Text>
            <Text style={[styles.cell, styles.size]}>Size</Text>
            <Text style={[styles.cell, styles.quantity]}>Qty</Text>
            <Text style={[styles.cell, styles.area]}>Area</Text>
            <Text style={[styles.cell, styles.amount]}>Total</Text>
          </View>
          {entries.map((entry, index) => (
            <View style={styles.row} key={`${entry.sizeLabel}-${index}`}>
              <Text style={[styles.cell, styles.index]}>{index + 1}</Text>
              <Text style={[styles.cell, styles.color]}>{entry.color || "-"}</Text>
              <Text style={[styles.cell, styles.thickness]}>{entry.thickness || "-"}</Text>
              <Text style={[styles.cell, styles.size]}>{entry.sizeLabel || "-"}</Text>
              <Text style={[styles.cell, styles.quantity]}>{entry.quantity || 0}</Text>
              <Text style={[styles.cell, styles.area]}>{entry.area || "0.00"}</Text>
              <Text style={[styles.cell, styles.amount]}>{money(entry.price)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text>Items</Text>
            <Text>{entries.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>{money(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Discount</Text>
            <Text>{money(discount)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.total]}>
            <Text>Total</Text>
            <Text>{money(total)}</Text>
          </View>
        </View>

        <Text style={styles.footer}>Prices are based on unit price per square meter.</Text>
      </Page>
    </Document>
  );
}
