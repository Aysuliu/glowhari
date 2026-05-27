import axios from "axios";
import { LoginInput, MemberInput } from "../../lib/types/member";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

const MemberService = {
    getAdmin: async () => {
        const response = await axios.get(`${API_URL}/member/admin`, {
            withCredentials: true,
        });
        return response.data;
    },

    signup: async (input: MemberInput) => {
        const response = await axios.post(`${API_URL}/member/signup`, input, {
            withCredentials: true,
        });
        return response.data;
    },

    login: async (input: LoginInput) => {
        const response = await axios.post(`${API_URL}/member/login`, input, {
            withCredentials: true,
        });
        return response.data;
    },

    logout: async () => {
        const response = await axios.post(`${API_URL}/member/logout`, {}, {
            withCredentials: true,
        });
        return response.data;
    },

    getMemberDetail: async () => {
        const response = await axios.get(`${API_URL}/member/detail`, {
            withCredentials: true,
        });
        return response.data;
    },

    updateMember: async (data: FormData) => {
        const response = await axios.post(`${API_URL}/member/update`, data, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    },

    getTopUsers: async () => {
        const response = await axios.get(`${API_URL}/member/top-users`, {
            withCredentials: true,
        });
        return response.data;
    },
};

export default MemberService;
