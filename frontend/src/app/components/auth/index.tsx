import React, { useState } from "react";
import {
    Modal,
    Backdrop,
    Fade,
    Stack,
    TextField,
    Button,
    Typography,
    Box,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import MemberService from "../../services/MemberService";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { useGlobals } from "../../hooks/useGlobals";

interface AuthenticationModalProps {
    signupOpen: boolean;
    loginOpen: boolean;
    handleSignupClose: () => void;
    handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
    const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
    const { setAuthMember } = useGlobals();
    const [memberNick, setMemberNick] = useState<string>("");
    const [memberPhone, setMemberPhone] = useState<string>("");
    const [memberPassword, setMemberPassword] = useState<string>("");

    const handlePasswordKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && signupOpen) {
            handleSignupRequest();
        } else if (e.key === "Enter" && loginOpen) {
            handleLoginRequest();
        }
    };

    const handleSignupRequest = async () => {
        try {
            const isFulfill = memberNick !== "" && memberPhone !== "" && memberPassword !== "";
            if (!isFulfill) throw new Error(Messages.error3);

            const signupInput: MemberInput = {
                memberNick,
                memberPhone,
                memberPassword,
            };
            const result = await MemberService.signup(signupInput);
            const member = result.member ?? result;
            setAuthMember(member);
            localStorage.setItem("memberData", JSON.stringify(member));
            handleSignupClose();
        } catch (err) {
            console.log(err);
            handleSignupClose();
            sweetErrorHandling(err);
        }
    };

    const handleLoginRequest = async () => {
        try {
            const isFulfill = memberNick !== "" && memberPassword !== "";
            if (!isFulfill) throw new Error(Messages.error3);

            const loginInput: LoginInput = {
                memberNick,
                memberPassword,
            };
            const result = await MemberService.login(loginInput);
            const member = result.member ?? result;
            setAuthMember(member);
            localStorage.setItem("memberData", JSON.stringify(member));
            handleLoginClose();
        } catch (err) {
            console.log(err);
            handleLoginClose();
            sweetErrorHandling(err);
        }
    };

    const modalStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const paperStyle = {
        bgcolor: "background.paper",
        border: "2px solid",
        borderColor: "divider",
        boxShadow: 24,
        p: 2,
        borderRadius: 2,
    };

    return (
        <div>
            {/* Signup Modal */}
            <Modal
                open={signupOpen}
                onClose={handleSignupClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
                sx={modalStyle}
            >
                <Fade in={signupOpen}>
                    <Stack direction="row" sx={{ ...paperStyle, width: "800px" }}>
                        <Box
                            component="img"
                            src="/img/auth.webp"
                            alt="auth"
                            sx={{
                                width: "62%",
                                height: "100%",
                                borderRadius: "10px",
                                objectFit: "cover",
                                mt: "9px",
                                ml: "10px",
                            }}
                        />
                        <Stack sx={{ ml: "69px", alignItems: "center" }}>
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                Signup Form
                            </Typography>
                            <TextField
                                sx={{ mt: "7px" }}
                                label="Username"
                                variant="outlined"
                                onChange={(e) => setMemberNick(e.target.value)}
                            />
                            <TextField
                                sx={{ my: "17px" }}
                                label="Phone Number"
                                variant="outlined"
                                onChange={(e) => setMemberPhone(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                onChange={(e) => setMemberPassword(e.target.value)}
                                onKeyDown={handlePasswordKeyDown}
                            />
                            <Button
                                sx={{ mt: "30px", width: "120px" }}
                                variant="contained"
                                color="secondary"
                                startIcon={<LoginIcon />}
                                onClick={handleSignupRequest}
                            >
                                Signup
                            </Button>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>

            {/* Login Modal */}
            <Modal
                open={loginOpen}
                onClose={handleLoginClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
                sx={modalStyle}
            >
                <Fade in={loginOpen}>
                    <Stack direction="row" sx={{ ...paperStyle, width: "700px" }}>
                        <Box
                            component="img"
                            src="/img/auth.webp"
                            alt="auth"
                            sx={{
                                width: "62%",
                                height: "100%",
                                borderRadius: "10px",
                                objectFit: "cover",
                                mt: "9px",
                                ml: "10px",
                            }}
                        />
                        <Stack sx={{ ml: "65px", mt: "25px", alignItems: "center" }}>
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                Login Form
                            </Typography>
                            <TextField
                                label="Username"
                                variant="outlined"
                                sx={{ my: "10px" }}
                                onChange={(e) => setMemberNick(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                onChange={(e) => setMemberPassword(e.target.value)}
                                onKeyDown={handlePasswordKeyDown}
                            />
                            <Button
                                sx={{ mt: "27px", width: "120px" }}
                                variant="contained"
                                color="secondary"
                                startIcon={<LoginIcon />}
                                onClick={handleLoginRequest}
                            >
                                Login
                            </Button>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>
        </div>
    );
}
