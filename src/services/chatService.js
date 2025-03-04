class ChatService {
    constructor(apiKey, assistantId) {
        this.apiKey = apiKey;
        this.assistantId = assistantId;
        this.baseUrl = 'https://api.openai.com/v1';
    }

    async fetchResponse(prompt) {
        try {
            // Create a thread
            const threadResponse = await fetch(`${this.baseUrl}/threads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'OpenAI-Beta': 'assistants=v2'  // Updated to v2
                },
                body: JSON.stringify({}) 
            });

            if (!threadResponse.ok) {
                const errorData = await threadResponse.json().catch(() => ({}));
                console.error('Thread creation failed:', {
                    status: threadResponse.status,
                    statusText: threadResponse.statusText,
                    error: errorData
                });
                throw new Error(`Thread creation failed: ${threadResponse.status} - ${JSON.stringify(errorData)}`);
            }

            const thread = await threadResponse.json();

            // Add message to thread
            await fetch(`${this.baseUrl}/threads/${thread.id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'OpenAI-Beta': 'assistants=v2'  // Updated to v2
                },
                body: JSON.stringify({
                    role: 'user',
                    content: prompt
                })
            });

            // Run the assistant
            const runResponse = await fetch(`${this.baseUrl}/threads/${thread.id}/runs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'OpenAI-Beta': 'assistants=v2'  // Updated to v2
                },
                body: JSON.stringify({
                    assistant_id: this.assistantId
                })
            });

            if (!runResponse.ok) {
                throw new Error(`Run creation failed: ${runResponse.status}`);
            }

            const run = await runResponse.json();

            // Poll for completion
            while (true) {
                const runStatusResponse = await fetch(`${this.baseUrl}/threads/${thread.id}/runs/${run.id}`, {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'OpenAI-Beta': 'assistants=v2'  // Updated to v2
                    }
                });

                const runStatus = await runStatusResponse.json();
                if (runStatus.status === 'completed') {
                    // Get messages
                    const messagesResponse = await fetch(`${this.baseUrl}/threads/${thread.id}/messages`, {
                        headers: {
                            'Authorization': `Bearer ${this.apiKey}`,
                            'OpenAI-Beta': 'assistants=v2'  // Updated to v2
                        }
                    });

                    const messages = await messagesResponse.json();
                    return messages.data[0].content[0].text.value;
                }

                if (runStatus.status === 'failed') {
                    throw new Error('Assistant run failed');
                }

                // Wait before polling again
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {
            console.error('Error in fetchResponse:', error);
            throw error;
        }
    }
}

module.exports = ChatService;