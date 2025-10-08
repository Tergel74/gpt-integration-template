import axios from "axios";

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL:
        process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
    timeout: 30000, // 30 seconds timeout for chat requests
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor for logging and adding auth tokens if needed
apiClient.interceptors.request.use(
    (config) => {
        // Log requests in development
        if (process.env.NODE_ENV === "development") {
            console.log(
                `[API Request] ${config.method?.toUpperCase()} ${config.url}`
            );
        }
        return config;
    },
    (error) => {
        console.error("[API Request Error]", error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        // Log successful responses in development
        if (process.env.NODE_ENV === "development") {
            console.log(
                `[API Response] ${response.status} ${response.config.url}`
            );
        }
        return response;
    },
    (error) => {
        // Enhanced error handling
        if (error.response) {
            // Server responded with error status
            console.error("[API Error]", {
                status: error.response.status,
                data: error.response.data,
                url: error.config?.url,
            });

            // Handle specific error cases
            switch (error.response.status) {
                case 401:
                    console.error("Unauthorized request");
                    break;
                case 403:
                    console.error("Forbidden request");
                    break;
                case 429:
                    console.error("Rate limit exceeded");
                    break;
                case 500:
                    console.error("Internal server error");
                    break;
                default:
                    console.error(
                        `Request failed with status ${error.response.status}`
                    );
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error("[API Network Error]", error.message);
        } else {
            // Something else happened
            console.error("[API Setup Error]", error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
