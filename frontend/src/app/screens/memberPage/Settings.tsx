import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Stack,
    Avatar,
    MenuItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useGlobals } from "../../hooks/useGlobals";
import { MemberUpdateInput } from "../../../lib/types/member";
import { SkinType } from "../../../lib/enums/member.enum";
import { serverApi, Messages } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import MemberService from "../../services/MemberService";

export const Settings: React.FC = () => {
    const navigate = useNavigate();
    const { authMember, setAuthMember } = useGlobals();

    const [memberImage, setMemberImage] = useState<string>(
        authMember?.memberImage
            ? `${serverApi}/${authMember.memberImage}`
            : "/icons/default-user.svg"
    );

    const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
        memberNick: authMember?.memberNick ?? "",
        memberPhone: authMember?.memberPhone ?? "",
        memberAddress: authMember?.memberAddress ?? "",
        memberDesc: authMember?.memberDesc ?? "",
        memberEmail: authMember?.memberEmail ?? "",
        skinType: authMember?.skinType ?? SkinType.NORMAL,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleChange = (field: keyof MemberUpdateInput) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setMemberUpdateInput({ ...memberUpdateInput, [field]: e.target.value });
    };

    const handleImageViewer = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["image/jpg", "image/png", "image/jpeg"];
        if (!validTypes.includes(file.type)) {
            sweetErrorHandling({ message: Messages.error5 });
            return;
        }

        setImageFile(file);
        setMemberImage(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        try {
            if (!authMember) throw new Error(Messages.error2);
            if (!memberUpdateInput.memberNick || !memberUpdateInput.memberPhone) {
                throw new Error(Messages.error3);
            }

            const formData = new FormData();
            formData.append("memberNick", memberUpdateInput.memberNick ?? "");
            formData.append("memberPhone", memberUpdateInput.memberPhone ?? "");
            formData.append("memberAddress", memberUpdateInput.memberAddress ?? "");
            formData.append("memberDesc", memberUpdateInput.memberDesc ?? "");
            formData.append("memberEmail", memberUpdateInput.memberEmail ?? "");
            formData.append("skinType", memberUpdateInput.skinType ?? "");
            if (imageFile) {
                formData.append("memberImage", imageFile);
            }

            const result = await MemberService.updateMember(formData);
            setAuthMember(result);
            localStorage.setItem("memberData", JSON.stringify(result));

            // Update the displayed image to the new server path
            if (result.memberImage) {
                setMemberImage(`${serverApi}/${result.memberImage}`);
            }
            setImageFile(null);

            await sweetTopSmallSuccessAlert("Profile updated!", 700);
            
    
            navigate("/member");
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err);
        }
    };

    if (!authMember) {
        return (
            <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography color="text.secondary" fontSize={18}>
                    Please login to access settings.
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Typography variant="h3" sx={{ fontSize: 28, mb: 3, textAlign: "center" }}>
                Account Settings
            </Typography>

            <Card>
                <CardContent sx={{ p: 3 }}>
                    <Stack spacing={3}>
                        {/* Avatar & Upload */}
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Avatar
                                src={memberImage}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: "secondary.main",
                                    fontSize: 32,
                                    fontWeight: 700,
                                }}
                            >
                                {authMember.memberNick?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography fontWeight={600} sx={{ mb: 0.5 }}>
                                    Profile Photo
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    JPG, JPEG, PNG only
                                </Typography>
                                <Button
                                    component="label"
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/jpg,image/jpeg,image/png"
                                        onChange={handleImageViewer}
                                    />
                                </Button>
                            </Box>
                        </Stack>

                        <TextField
                            label="Username"
                            fullWidth
                            value={memberUpdateInput.memberNick}
                            onChange={handleChange("memberNick")}
                            required
                        />
                        <TextField
                            label="Phone"
                            fullWidth
                            value={memberUpdateInput.memberPhone}
                            onChange={handleChange("memberPhone")}
                            required
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            type="email"
                            value={memberUpdateInput.memberEmail}
                            onChange={handleChange("memberEmail")}
                        />
                        <TextField
                            label="Address"
                            fullWidth
                            value={memberUpdateInput.memberAddress}
                            onChange={handleChange("memberAddress")}
                        />
                        <TextField
                            label="Skin Type"
                            select
                            fullWidth
                            value={memberUpdateInput.skinType}
                            onChange={handleChange("skinType")}
                        >
                            {Object.values(SkinType).map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="About Me"
                            fullWidth
                            multiline
                            rows={3}
                            value={memberUpdateInput.memberDesc}
                            onChange={handleChange("memberDesc")}
                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            size="large"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};
