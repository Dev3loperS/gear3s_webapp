import { User } from "./user.type";
import { SuccessResponse, ErrorResponse } from "./utils.type";

export type AuthResponse = SuccessResponse<{
    access_token: string 
    expires: string
    user: User
}>
