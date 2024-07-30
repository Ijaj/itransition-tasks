
const keys = {
    k_user: "user",
    k_token: "token",
    k_id: "id"
}

export const axios_config = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }
}

export default keys;