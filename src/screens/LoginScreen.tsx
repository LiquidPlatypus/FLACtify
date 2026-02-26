import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

import { useLingui } from "@lingui/react/macro";

export default function LoginScreen() {
	const { t } = useLingui();

	const [isLogin, setIsLogin] = useState(true);

	// Login
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	// Register
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");

	return (
		<View style={styles.container}>
			<Text style={styles.title}>FLACtify</Text>

			<View style={styles.LoginRegisterBtn}>
				<Button
					title={t`Login`}
					onPress={() => {
						setIsLogin(true);
					}}
				/>
				<Button
					title={t`Register`}
					onPress={() => {
						setIsLogin(false);
					}}
				/>
			</View>

			{isLogin ? (
				<View>
					<TextInput
						style={styles.input}
						placeholder={t`Username`}
						onChangeText={setLoginUsername}
						value={loginUsername}
					/>
					<TextInput
						style={styles.input}
						placeholder={t`Password`}
						onChangeText={setLoginPassword}
						value={loginPassword}
					/>

					<Button title={t`Login`}/>
				</View>
			) : (
				<View>
					<TextInput
						style={styles.input}
						placeholder={t`Username`}
						onChangeText={setRegisterUsername}
						value={registerUsername}
					/>
					<TextInput
						style={styles.input}
						placeholder={t`Email`}
						onChangeText={setRegisterEmail}
						value={registerEmail}
					/>
					<TextInput
						style={styles.input}
						placeholder={t`Password`}
						onChangeText={setRegisterPassword}
						value={registerPassword}
					/>
					<TextInput
						style={styles.input}
						placeholder={t`Confirm Password`}
						onChangeText={setRegisterPasswordConfirm}
						value={registerPasswordConfirm}
					/>

					<Button title={t`Register`}/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 600,
		color: "#FFF"
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		color: "#FFF",
	},
	LoginRegisterBtn: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	}
})