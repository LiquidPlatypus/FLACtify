import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import Keychain from "react-native-keychain";

import { useLingui } from "@lingui/react/macro";

type AuthOk = {
	ok: true;
	access_token: string;
	user: { id: string; email: string; name?: string };
};

type AuthKo = { ok: false; error: string };

type LoginResponse = AuthOk | AuthKo;
type RegisterResponse = AuthOk | AuthKo;

export default function LoginScreen() {
	const { t } = useLingui();

	const [isLogin, setIsLogin] = useState(true);

	// Login
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	// Register
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");

	const handleLogin = async () => {
		try {
			const response = await fetch(
				"http://localhost:3000/api/users/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: loginEmail,
						password: loginPassword,
					}),
				},
			);

			const data = (await response.json()) as LoginResponse;

			if (!response.ok || !data.ok) {
				const message = !data.ok ? data.error : "LOGIN_FAILED";
				throw new Error(message);
			}

			await Keychain.setGenericPassword(data.user.id, data.access_token);
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : String(err);
			console.log(message);
		}
	};

	const handleRegister = async () => {
		try {
			if (registerPassword !== registerPasswordConfirm)
				throw new Error("PASSWORD_DO_NOT_MATCH");

			const response = await fetch(
				"http://localhost:3000/api/users/register",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: registerUsername,
						email: registerEmail,
						password: registerPassword,
					}),
				},
			);

			const data = (await response.json()) as RegisterResponse;

			if (!response.ok || !data.ok) {
				const message = !data.ok ? data.error : "REGISTER_FAILED";
				throw new Error(message);
			}

			await Keychain.setGenericPassword(data.user.id, data.access_token);

			setIsLogin(true);
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : String(err);
			console.log(message);
		}
	};

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
						placeholder={t`Email`}
						onChangeText={setLoginEmail}
						value={loginEmail}
					/>
					<TextInput
						style={styles.input}
						placeholder={t`Password`}
						onChangeText={setLoginPassword}
						value={loginPassword}
					/>

					<Button title={t`Login`} onPress={handleLogin} />
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

					<Button title={t`Register`} onPress={handleRegister} />
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: 600,
		color: "#FFF",
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
	},
});
