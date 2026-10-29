import React from "react";
import { Text } from "react-native";
import { Card, H1, P, Screen } from "../src/components/Screen";

export default function About() {
  return (
    <Screen>
      <H1>Empowering salons with genuine wholesale excellence</H1>
      <P>BeuPROS is the dedicated trade platform designed exclusively for licensed hair salons, beauty parlors, aesthetic clinics, and professional cosmetologists across India.</P>
      <H1>Eliminating middlemen for Indian beauty pros</H1>
      <P>For decades, salon entrepreneurs and independent stylists struggled with fragmented distributor networks, volatile pricing, counterfeit consumables, and opaque trade terms.</P>
      <P>BeuPROS unifies 4,200+ professional salon products from world-leading hair, beauty, and tool manufacturers under one single, verified wholesale portal. We ensure complete price transparency, verified trade discounts, and reliable door-step fulfillment so salon artists can focus on their craft.</P>
      <Card>
        <Text style={{ fontWeight: "800", fontSize: 16 }}>Verified trade pricing</Text>
        <P>Wholesale trade prices are strictly safeguarded and unlocked only for verified salons with valid GST or trade licenses.</P>
      </Card>
      <Card>
        <Text style={{ fontWeight: "800", fontSize: 16 }}>Commercial-size supplies</Text>
        <P>Access salon-sized commercial cans (4500ml, 5000ml), backbar shampoo stations, bulk waxing wax heaters, and professional kits.</P>
      </Card>
      <Card>
        <Text style={{ fontWeight: "800", fontSize: 16 }}>Reliable logistics</Text>
        <P>Fast air &amp; surface logistics partnering with premier carriers to keep your salon stations fully stocked before weekend peaks.</P>
      </Card>
    </Screen>
  );
}
