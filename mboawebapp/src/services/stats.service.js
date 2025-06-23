import axios from 'axios';
import AuthService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:2103';

class StatsService {
    static async getDashboardStats() {
        const token = AuthService.getToken();
        if (!token) return null;

        try {
            const response = await axios.get(`${API_URL}/api/stats/dashboard`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('------> response.data', response.data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques:', error);
            return null;
        }
    }

    static async getReferralStats() {
        const token = AuthService.getToken();
        if (!token) return null;
        try {
            const response = await axios.get(`${API_URL}/api/referral/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des stats de parrainage:', error);
            return null;
        }
    }

    static async getAdminStats(adminId, startDate, endDate) {
        const token = AuthService.getToken();
        if (!token) return null;
        try {
            const response = await axios.get(`${API_URL}/api/admin-logs/admin/${adminId}/stats`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { startDate, endDate }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des stats admin:', error);
            return null;
        }
    }

    static async getFailedLoginStats(startDate, endDate) {
        const token = AuthService.getToken();
        if (!token) return null;
        try {
            const response = await axios.get(`${API_URL}/api/admin-security/stats/failed-logins`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { startDate, endDate }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des stats de connexions échouées:', error);
            return null;
        }
    }

    static async getLoginAttemptsByTime(startDate, endDate) {
        const token = AuthService.getToken();
        if (!token) return null;
        try {
            const response = await axios.get(`${API_URL}/api/admin-security/stats/by-time`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { startDate, endDate }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des stats horaires:', error);
            return null;
        }
    }

    static async getEventPageStats(pageId) {
        const token = AuthService.getToken();
        if (!token) return null;
        try {
            const response = await axios.get(`${API_URL}/api/business-event-page/${pageId}/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des stats de la page événement:', error);
            return null;
        }
    }
}

export default StatsService; 