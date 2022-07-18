export default class APIError extends Error {
    constructor(response, body) {
       super();
       this.name = 'APIError';
       this.response = response;
       this.body = body;
       this.message = body?.error || `${response.status} - ${response.statusText}`;
    }

    // Opctional para ver o tipo de resposta do header do backend JSON ou HTML
    getContentType() {
        return this.response.headers.get('Content-type');
    }
}
