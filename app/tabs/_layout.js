import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { Icon } from "@rneui/themed";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // hide the header
        tabBarShowLabel: false, // hide the label
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="antdesign" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="barschart" type="antdesign" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="setting" type="antdesign" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
