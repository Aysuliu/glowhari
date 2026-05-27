import React, { useState } from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Avatar,
    Stack,
    Link,
    MenuItem,
    Grid,
    Chip,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { SkinType } from "../../../lib/enums/member.enum";

/** Login Page */
export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthMember } = useGlobals();
    const [input, setInput] = useState<LoginInput>({ memberNick: "", memberPassword: "" });

    const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await MemberService.login(input);
            const member = result.member ?? result;
            setAuthMember(member);
            localStorage.setItem("memberData", JSON.stringify(member));
            navigate(redirectTo, { replace: true });
        } catch (err: any) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 70px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #faf6f3 0%, #f0e6df 100%)",
                px: 3,
                py: 5,
            }}
        >
            <Card sx={{ width: "100%", maxWidth: 460, p: 2 }}>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Typography variant="h3" sx={{ fontSize: 28, mb: 0.5, textAlign: "center" }}>
                            Welcome Back
                        </Typography>
                        <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 3, textAlign: "center" }}>
                            Log in to your Glowhari account
                        </Typography>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Username"
                                fullWidth
                                value={input.memberNick}
                                onChange={(e) => setInput({ ...input, memberNick: e.target.value })}
                                required
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={input.memberPassword}
                                onChange={(e) => setInput({ ...input, memberPassword: e.target.value })}
                                required
                            />
                            <Button type="submit" variant="contained" color="secondary" fullWidth size="large">
                                Login
                            </Button>
                        </Stack>
                        <Typography sx={{ textAlign: "center", mt: 2, fontSize: 14, color: "text.secondary" }}>
                            Don't have an account?{" "}
                            <Link component={RouterLink} to="/signup" sx={{ color: "secondary.main", fontWeight: 600 }}>
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

/** Signup Page */
export const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthMember } = useGlobals();
    const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/";
    const [input, setInput] = useState<MemberInput>({
        memberNick: "",
        memberPhone: "",
        memberPassword: "",
        skinType: SkinType.NORMAL,
    });
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.memberPassword !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        try {
            const result = await MemberService.signup(input);
            const member = result.member ?? result;
            setAuthMember(member);
            localStorage.setItem("memberData", JSON.stringify(member));
            navigate(redirectTo, { replace: true });
        } catch (err: any) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 70px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #faf6f3 0%, #f0e6df 100%)",
                px: 3,
                py: 5,
            }}
        >
            <Card sx={{ width: "100%", maxWidth: 520, p: 2 }}>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Typography variant="h3" sx={{ fontSize: 28, mb: 0.5, textAlign: "center" }}>
                            Join Glowhari
                        </Typography>
                        <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 3, textAlign: "center" }}>
                            Start your skincare journey today
                        </Typography>
                        <Stack spacing={2.5}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Username"
                                        fullWidth
                                        value={input.memberNick}
                                        onChange={(e) => setInput({ ...input, memberNick: e.target.value })}
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Phone"
                                        fullWidth
                                        value={input.memberPhone}
                                        onChange={(e) => setInput({ ...input, memberPhone: e.target.value })}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        value={input.memberPassword}
                                        onChange={(e) => setInput({ ...input, memberPassword: e.target.value })}
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Confirm Password"
                                        type="password"
                                        fullWidth
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                label="Skin Type"
                                select
                                fullWidth
                                value={input.skinType}
                                onChange={(e) => setInput({ ...input, skinType: e.target.value as SkinType })}
                            >
                                {Object.values(SkinType).map((type) => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </TextField>
                            <Button type="submit" variant="contained" color="secondary" fullWidth size="large">
                                Create Account
                            </Button>
                        </Stack>
                        <Typography sx={{ textAlign: "center", mt: 2, fontSize: 14, color: "text.secondary" }}>
                            Already have an account?{" "}
                            <Link component={RouterLink} to="/login" sx={{ color: "secondary.main", fontWeight: 600 }}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

/** Profile Page */
export const ProfilePage: React.FC = () => {
    const { authMember } = useGlobals();

    if (!authMember) {
        return (
            <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography color="text.secondary" fontSize={18}>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Card sx={{ textAlign: "center", p: 3 }}>
                <CardContent>
                    <Avatar
                        src={authMember.memberImage ? `${serverApi}/${authMember.memberImage}` : undefined}
                        sx={{
                            width: 80,
                            height: 80,
                            mx: "auto",
                            mb: 2,
                            background: "linear-gradient(135deg, #d4a088, #e8c4a8)",
                            fontSize: 32,
                            fontWeight: 700,
                        }}
                    >
                        {authMember.memberNick?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                        {authMember.memberNick}
                    </Typography>

                    <Button
                        component={RouterLink}
                        to="/member/settings"
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<SettingsOutlinedIcon />}
                        sx={{ mb: 3 }}
                    >
                        Edit Profile
                    </Button>

                    <Stack spacing={0} sx={{ textAlign: "left" }}>
                        <ProfileRow label="Phone" value={authMember.memberPhone} />
                        {authMember.memberEmail && <ProfileRow label="Email" value={authMember.memberEmail} />}
                        {authMember.skinType && <ProfileRow label="Skin Type" value={authMember.skinType} />}
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
                            <Typography variant="body2" fontWeight={500}>Points</Typography>
                            <Chip
                                icon={<StarOutlineIcon />}
                                label={`${authMember.memberPoints} pts`}
                                color="secondary"
                                size="small"
                            />
                        </Stack>
                        {authMember.memberAddress && <ProfileRow label="Address" value={authMember.memberAddress} />}
                        {authMember.memberDesc && <ProfileRow label="About" value={authMember.memberDesc} />}
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};

const ProfileRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="body2" fontWeight={500}>{label}</Typography>
        <Typography variant="body2">{value}</Typography>
    </Stack>
);
