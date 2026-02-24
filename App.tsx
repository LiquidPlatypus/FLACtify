import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Text } from "react-native";

import { I18nProvider, TransRenderProps } from "@lingui/react";
import { i18n } from "@lingui/core";
import { messages as enMessages } from "./src/locales/en/message";
import { messages as frMessages } from "./src/locales/fr/message";

import HomeScreen from "./src/screens/HomeScreen.tsx";
import LoginScreen from "./src/screens/LoginScreen.tsx";

const DefaultComponent = (props: TransRenderProps) => {
	return <Text>{props.children}</Text>
}

i18n.load({
	en: enMessages,
	fr: frMessages,
});
i18n.activate("fr");

function App() {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<I18nProvider i18n={i18n} defaultComponent={DefaultComponent}>
			<SafeAreaProvider>
				<StatusBar
					barStyle={isDarkMode ? "light-content" : "dark-content"}
				/>
				<AppContent />
			</SafeAreaProvider>
		</I18nProvider>
	);
}

function AppContent() {

	return (
		<View style={styles.container}>
			<LoginScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
