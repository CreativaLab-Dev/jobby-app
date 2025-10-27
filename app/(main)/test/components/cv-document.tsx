"use client"; // if used in client components (PDFViewer). Not needed if only server-generated.

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import path from "path";
import type { CVData } from "@/types/cv";

// OPTIONAL: register a custom font if you host one in /public/fonts
Font.register({
  family: "Inter",
  fonts: [
    { src: path.resolve("./fonts/Inter_18pt-Regular.ttf"), fontWeight: "normal", fontStyle: "normal" },
    { src: path.resolve("./fonts/Inter_18pt-Italic.ttf"), fontWeight: "normal", fontStyle: "italic" },
    { src: path.resolve("./fonts/Inter_18pt-Bold.ttf"), fontWeight: "bold", fontStyle: "normal" },
    { src: path.resolve("./public/fonts/Inter_18pt-BoldItalic.ttf"), fontWeight: "bold", fontStyle: "italic" },
    // { src: path.resolve("./public/fonts/Inter_18pt-Light.ttf"), fontWeight: "300", fontStyle: "normal" },
    // { src: path.resolve("./public/fonts/Inter_18pt-LightItalic.ttf"), fontWeight: "300", fontStyle: "italic" },
    // { src: path.resolve("./public/fonts/Inter_18pt-SemiBold.ttf"), fontWeight: "600", fontStyle: "normal" },
    // { src: path.resolve("./public/fonts/Inter_18pt-SemiBoldItalic.ttf"), fontWeight: "600", fontStyle: "italic" },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 36,
    fontSize: 11,
    fontFamily: "Inter",
    color: "#111",
    lineHeight: 1.35,
  },

  /* Header */
  header: { textAlign: "center", marginBottom: 0 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  contactLine: {
    fontSize: 10.5,
    color: "#111",
    marginBottom: 0,
  },
  contactLink: {
    color: "#0b66c3", // linkedin blueish
    textDecoration: "underline",
  },

  thinRule: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
    marginVertical: 8,
  },

  /* Summary */
  summaryText: {
    fontStyle: "italic",
    fontSize: 11,
    marginBottom: 10,
  },

  /* Section title with separator */
  sectionHeader: {
    marginTop: 0,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    marginBottom: 8,
  },

  /* Experience entry layout */
  entryRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  entryLeft: { width: "66%" },
  entryRight: { width: "32%", textAlign: "right" },

  companyName: { fontSize: 11.5, fontWeight: "bold" },
  roleName: { fontSize: 11, marginBottom: 4 },
  locationText: { fontSize: 11, fontStyle: "italic" },
  dateText: { fontSize: 10.5, fontStyle: "italic" },

  /* Bulleted list */
  bulletItem: {
    fontSize: 10.5,
    marginBottom: 4,
    paddingLeft: 4,
  },

  /* Education entry */
  eduRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  eduLeft: { width: "66%" },
  eduRight: { width: "32%", textAlign: "right" },
  eduInstitution: { fontWeight: "bold", fontSize: 11 },

  /* Certifications and skills */
  simpleList: { marginBottom: 8, fontSize: 10.5 },
  skillsLineLabel: { fontWeight: "bold", marginRight: 6 },
  skillsLine: { fontSize: 10.5, marginBottom: 4 },

  /* Footer spacing helper */
  sectionSpace: { marginBottom: 0 },
});

export function CvDocument({ data }: { data: CVData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header: Name + Contact */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal?.fullName ?? ""}</Text>

          <Text style={styles.contactLine}>
            {data.personal?.address ? `${data.personal.address} • ` : ""}
            {data.personal?.linkedin ? (
              <Text>
                <Text style={styles.contactLink}>{data.personal.linkedin}</Text>
                {" • "}
              </Text>
            ) : null}
            {data.personal?.phone ? `${data.personal.phone} • ` : ""}
            {data.personal?.email ?? ""}
          </Text>
        </View>

        <View style={styles.thinRule} />

        {/* Summary */}
        {data.personal?.summary ? (
          <View style={styles.sectionSpace}>
            <Text style={styles.summaryText}>{data.personal.summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {data.experience?.items?.length ? (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Experiencia laboral</Text>
            <View style={styles.sectionDivider} />

            {data.experience.items.map((exp, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <View style={styles.entryRow}>
                  <View style={styles.entryLeft}>
                    <Text style={styles.companyName}>{exp.company ?? ""}</Text>
                    <Text style={styles.roleName}>{exp.position ?? ""}</Text>
                  </View>

                  <View style={styles.entryRight}>
                    <Text style={styles.locationText}>{exp.location ?? ""}</Text>
                    {exp.duration ? (
                      <Text style={styles.dateText}>{exp.duration}</Text>
                    ) : null}
                  </View>
                </View>

                {/* responsibilities as bullets */}
                {exp.responsibilities ? (
                  <View style={{ marginLeft: 6 }}>
                    {exp.responsibilities
                      .split("\n")
                      .filter(Boolean)
                      .map((line, i) => (
                        <Text key={i} style={styles.bulletItem}>
                          {`\u2022 ${line}`}
                        </Text>
                      ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {data.education?.items?.length ? (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Educación</Text>
            <View style={styles.sectionDivider} />

            {data.education.items.map((edu, index) => (
              <View key={index} style={styles.eduRow}>
                <View style={styles.eduLeft}>
                  <Text style={styles.eduInstitution}>{edu.title ?? ""}</Text>
                  {edu.institution ? <Text>{edu.institution}</Text> : null}
                  {edu.honors ? <Text>Honores: {edu.honors}</Text> : null}
                </View>

                <View style={styles.eduRight}>
                  {edu.location ? <Text style={styles.locationText}>{edu.location}</Text> : null}
                  {edu.year ? <Text style={styles.dateText}>{edu.year}</Text> : null}
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* Certifications */}
        {data.certifications?.items?.length ? (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Licencias y certificaciones</Text>
            <View style={styles.sectionDivider} />

            <View>
              {data.certifications.items.map((c, index) => (
                <Text key={index} style={styles.simpleList}>
                  {c.name ?? c.name ?? ""} {c.issuer ? `by ${c.issuer}` : ""}{" "}
                  {c.date ? `(${c.date})` : ""}
                </Text>
              ))}
            </View>
          </View>
        ) : null}

        {/* Skills */}
        {data.skills && (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Habilidades profesionales y personales</Text>
            <View style={styles.sectionDivider} />

            <View>
              <Text style={styles.skillsLine}>
                <Text style={styles.skillsLineLabel}>Idiomas:</Text>
                {(data.skills.languages ?? []).join(", ")}
              </Text>

              <Text style={styles.skillsLine}>
                <Text style={styles.skillsLineLabel}>Habilidades Técnicas:</Text>
                {(data.skills.technical ?? []).join(", ")}
              </Text>

              <Text style={styles.skillsLine}>
                <Text style={styles.skillsLineLabel}>Habilidades Blandas:</Text>
                {(data.skills.soft ?? []).join(", ")}
              </Text>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
