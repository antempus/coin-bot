import { WebClient } from '@slack/web-api'
import { Agent } from 'https'

const agent = new Agent({
    keepAlive: true,
    maxSockets: 30
})
export class SlackWebClient {
    client: WebClient;
    constructor(token: string){
        this.client = new WebClient(token, { agent })
    }
}

