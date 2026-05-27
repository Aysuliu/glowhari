export const serverApi: string =
    import.meta.env.VITE_API_URL || "http://localhost:3003";

export const Messages = {
    error1: "Something went wrong!",
    error2: "Please login first!",
    error3: "Please fill all required fields!",
    error4: "Message is empty!",
    error5: "Only JPG, JPEG, PNG formats allowed!",
};
