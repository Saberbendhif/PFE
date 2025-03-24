import React, { useState } from "react";
import * as Style from './Style';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const navigate = useNavigate();
    const [signIn, toggle] = useState(true);

    // State pour stocker les données de formulaire
    const [signUpData, setSignUpData] = useState({ name: "", email: "",role:"user", password: "" });
    const [signInData, setSignInData] = useState({ email: "", password: "" });

    // Fonction pour gérer le changement dans les inputs SignUp
    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignUpData((prev) => ({ ...prev, [name]: value }));
    };

    // Fonction pour gérer le changement dans les inputs SignIn
    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignInData((prev) => ({ ...prev, [name]: value }));
    };

    // Fonction pour faire le signup
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signUpData)
            });

            const data = await response.json();
            console.log("Signup success:", data);
            if (response.ok) {
                alert("Account created successfully!");
                toggle(true); // Revenir à SignIn après succès
            } else {
                alert(data.message || "Signup failed!");
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    // Fonction pour faire le signin
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signInData)
            });

            const data = await response.json();
            console.log("Signin success:", data);
            if (response.ok) {
                alert("Login successful!");
                navigate(`/dashbord`);
                // Redirection ou stockage du token ici
            } else {
                alert(data.message || "Login failed!");
            }
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };

    return (
        <Style.Container>
            {/* Sign Up */}
            <Style.SignUpContainer signinIn={signIn}>
                <Style.Form onSubmit={handleSignUp}>
                    <Style.Title>Create Account</Style.Title>
                    <Style.Input type='text' placeholder='Name' name="name" value={signUpData.name} onChange={handleSignUpChange} />
                    <Style.Input type='email' placeholder='Email' name="email" value={signUpData.email} onChange={handleSignUpChange} />
                    <Style.Input type='password' placeholder='Password' name="password" value={signUpData.password} onChange={handleSignUpChange} />
                    <Style.Button type="submit">Sign Up</Style.Button>
                </Style.Form>
            </Style.SignUpContainer>

            {/* Sign In */}
            <Style.SignInContainer signinIn={signIn}>
                <Style.Form onSubmit={handleSignIn}>
                    <Style.Title>Sign In</Style.Title>
                    <Style.Input type='email' placeholder='Email' name="email" value={signInData.email} onChange={handleSignInChange} />
                    <Style.Input type='password' placeholder='Password' name="password" value={signInData.password} onChange={handleSignInChange} />
                    <Style.Anchor href='#'>Forgot your password?</Style.Anchor>
                    <Style.Button type="submit">Sign In</Style.Button>
                </Style.Form>
            </Style.SignInContainer>

            {/* Overlay */}
            <Style.OverlayContainer signinIn={signIn}>
                <Style.Overlay signinIn={signIn}>
                    <Style.LeftOverlayPanel signinIn={signIn}>
                        <Style.Title>Welcome Back!</Style.Title>
                        <Style.Paragraph>
                            To keep connected with us please login with your personal info
                        </Style.Paragraph>
                        <Style.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Style.GhostButton>
                    </Style.LeftOverlayPanel>

                    <Style.RightOverlayPanel signinIn={signIn}>
                        <Style.Title>Hello, Friend!</Style.Title>
                        <Style.Paragraph>
                            Enter your personal details and start your journey with us
                        </Style.Paragraph>
                        <Style.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Style.GhostButton> 
                    </Style.RightOverlayPanel>
                </Style.Overlay>
            </Style.OverlayContainer>
        </Style.Container>
    );
}

export default Auth;
