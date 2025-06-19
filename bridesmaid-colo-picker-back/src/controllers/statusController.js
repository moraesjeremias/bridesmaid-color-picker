class StatusController {
    async getStatus(request, response) {
        return response.status(200).json({ status: "ok" });
    }
}

export const statusController = new StatusController();
